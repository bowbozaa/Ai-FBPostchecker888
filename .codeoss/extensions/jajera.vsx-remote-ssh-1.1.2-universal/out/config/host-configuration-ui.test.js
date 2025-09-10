"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
// Mock the VS Code API
vitest_1.vi.mock('vscode', () => ({
    window: {
        showInformationMessage: vitest_1.vi.fn(),
        showErrorMessage: vitest_1.vi.fn(),
        showQuickPick: vitest_1.vi.fn(),
        showInputBox: vitest_1.vi.fn(),
        showOpenDialog: vitest_1.vi.fn().mockResolvedValue(undefined)
    },
    ConfigurationTarget: {
        Global: 1
    }
}));
// Import after mocking
const vscode = __importStar(require("vscode"));
const host_configuration_ui_1 = require("./host-configuration-ui");
(0, vitest_1.describe)('HostConfigurationUI', () => {
    let configManager;
    let hostConfigUI;
    let mockHosts;
    (0, vitest_1.beforeEach)(() => {
        // Reset mocks
        vitest_1.vi.resetAllMocks();
        // Create mock hosts
        mockHosts = [
            {
                id: 'host1',
                name: 'Test Server 1',
                host: 'test1.example.com',
                port: 22,
                username: 'user1',
                authMethod: 'password'
            },
            {
                id: 'host2',
                name: 'Test Server 2',
                host: 'test2.example.com',
                port: 2222,
                username: 'user2',
                authMethod: 'key',
                privateKeyPath: '/path/to/key',
                remoteWorkspace: '/home/user2/projects'
            }
        ];
        // Mock configuration manager
        configManager = {
            getHosts: vitest_1.vi.fn().mockResolvedValue(mockHosts),
            getHost: vitest_1.vi.fn().mockImplementation(async (id) => mockHosts.find(h => h.id === id)),
            saveHost: vitest_1.vi.fn().mockImplementation(async (host) => {
                const index = mockHosts.findIndex(h => h.id === host.id);
                if (index >= 0) {
                    mockHosts[index] = host;
                }
                else {
                    mockHosts.push(host);
                }
            }),
            updateHost: vitest_1.vi.fn().mockImplementation(async (id, updates) => {
                const index = mockHosts.findIndex(h => h.id === id);
                if (index >= 0) {
                    mockHosts[index] = { ...mockHosts[index], ...updates };
                }
            }),
            deleteHost: vitest_1.vi.fn().mockImplementation(async (id) => {
                const index = mockHosts.findIndex(h => h.id === id);
                if (index >= 0) {
                    mockHosts.splice(index, 1);
                }
            }),
            setDefaultHost: vitest_1.vi.fn(),
            validateHostConfig: vitest_1.vi.fn().mockReturnValue(true),
            getWorkspaceSettings: vitest_1.vi.fn().mockReturnValue({
                defaultHostId: 'host1'
            })
        };
        // Create host configuration UI
        hostConfigUI = new host_configuration_ui_1.HostConfigurationUI(configManager);
    });
    (0, vitest_1.afterEach)(() => {
        vitest_1.vi.clearAllMocks();
    });
    (0, vitest_1.describe)('showHostSelectionMenu', () => {
        (0, vitest_1.it)('should show a quick pick with all hosts', async () => {
            // Mock the quick pick to return the first host
            vscode.window.showQuickPick.mockResolvedValueOnce({
                label: '$(star) Test Server 1',
                description: 'user1@test1.example.com:22',
                host: mockHosts[0]
            });
            const result = await hostConfigUI.showHostSelectionMenu();
            (0, vitest_1.expect)(vscode.window.showQuickPick).toHaveBeenCalled();
            (0, vitest_1.expect)(result).toEqual(mockHosts[0]);
        });
        (0, vitest_1.it)('should handle no hosts configured', async () => {
            // Mock empty hosts list
            configManager.getHosts.mockResolvedValueOnce([]);
            // Mock user choosing to add a new host
            vscode.window.showQuickPick.mockResolvedValueOnce('Yes');
            // Mock user inputs for adding a new host
            vscode.window.showInputBox
                .mockResolvedValueOnce('New Server') // name
                .mockResolvedValueOnce('new.example.com') // host
                .mockResolvedValueOnce('newuser') // username
                .mockResolvedValueOnce('22'); // port
            vscode.window.showQuickPick
                .mockResolvedValueOnce({ label: 'Password' }); // auth method
            await hostConfigUI.showHostSelectionMenu();
            (0, vitest_1.expect)(vscode.window.showQuickPick).toHaveBeenCalledTimes(2);
            (0, vitest_1.expect)(vscode.window.showInputBox).toHaveBeenCalledTimes(6); // 4 for addNewHost + 2 for workspace and password
            (0, vitest_1.expect)(configManager.saveHost).toHaveBeenCalled();
        });
        (0, vitest_1.it)('should handle selecting "Add New Host"', async () => {
            // Mock selecting "Add New Host"
            vscode.window.showQuickPick.mockResolvedValueOnce({
                label: '$(add) Add New Host',
                isAddNew: true
            });
            // Mock cancelling the add new host flow
            vscode.window.showInputBox.mockResolvedValueOnce(undefined);
            const result = await hostConfigUI.showHostSelectionMenu();
            (0, vitest_1.expect)(result).toBeUndefined();
        });
        (0, vitest_1.it)('should handle selecting "Manage Hosts"', async () => {
            // Mock selecting "Manage Hosts"
            vscode.window.showQuickPick.mockResolvedValueOnce({
                label: '$(gear) Manage Hosts',
                isManage: true
            });
            // Mock selecting a host to manage
            vscode.window.showQuickPick.mockResolvedValueOnce({
                label: 'Test Server 1',
                host: mockHosts[0]
            });
            // Mock selecting an action
            vscode.window.showQuickPick.mockResolvedValueOnce({
                label: '$(star) Set as Default'
            });
            await hostConfigUI.showHostSelectionMenu();
            (0, vitest_1.expect)(vscode.window.showQuickPick).toHaveBeenCalledTimes(3);
            (0, vitest_1.expect)(configManager.setDefaultHost).toHaveBeenCalledWith('host1');
        });
    });
    (0, vitest_1.describe)('addNewHost', () => {
        (0, vitest_1.it)('should add a new host with password authentication', async () => {
            // Mock user inputs for adding a new host
            vscode.window.showInputBox
                .mockResolvedValueOnce('New Server') // name
                .mockResolvedValueOnce('new.example.com') // host
                .mockResolvedValueOnce('newuser') // username
                .mockResolvedValueOnce('22') // port
                .mockResolvedValueOnce('password') // password
                .mockResolvedValueOnce('/home/newuser/workspace'); // remote workspace
            vscode.window.showQuickPick
                .mockResolvedValueOnce({ label: 'Password' }); // auth method
            const result = await hostConfigUI.addNewHost();
            (0, vitest_1.expect)(result).toBeDefined();
            (0, vitest_1.expect)(configManager.saveHost).toHaveBeenCalled();
            (0, vitest_1.expect)(vscode.window.showInformationMessage).toHaveBeenCalledWith('Host New Server added successfully');
        });
        (0, vitest_1.it)('should handle validation errors', async () => {
            // Mock saveHost to throw an error
            configManager.saveHost.mockRejectedValueOnce(new Error('Invalid host configuration'));
            // Mock user inputs for adding a new host
            vscode.window.showInputBox
                .mockResolvedValueOnce('Invalid Server') // name
                .mockResolvedValueOnce('invalid.example.com') // host
                .mockResolvedValueOnce('user') // username
                .mockResolvedValueOnce('22'); // port
            vscode.window.showQuickPick
                .mockResolvedValueOnce({ label: 'Password' }); // auth method
            const result = await hostConfigUI.addNewHost();
            (0, vitest_1.expect)(result).toBeUndefined();
            (0, vitest_1.expect)(vscode.window.showErrorMessage).toHaveBeenCalledWith('Failed to add host: Error: Invalid host configuration');
        });
    });
    (0, vitest_1.describe)('editHost', () => {
        (0, vitest_1.it)('should edit an existing host', async () => {
            // Mock selecting a field to edit
            vscode.window.showQuickPick
                .mockResolvedValueOnce({ label: 'Name' }) // field to edit
                .mockResolvedValueOnce({ label: 'No' }); // don't edit more
            // Mock new name input
            vscode.window.showInputBox.mockResolvedValueOnce('Updated Server Name');
            await hostConfigUI.editHost(mockHosts[0]);
            (0, vitest_1.expect)(configManager.updateHost).toHaveBeenCalledWith('host1', { name: 'Updated Server Name' });
            (0, vitest_1.expect)(vscode.window.showInformationMessage).toHaveBeenCalledWith('Host Test Server 1 updated successfully');
            (0, vitest_1.expect)(vscode.window.showInformationMessage).toHaveBeenCalledWith('Host renamed to Updated Server Name');
        });
    });
    (0, vitest_1.describe)('deleteHost', () => {
        (0, vitest_1.it)('should delete a host after confirmation', async () => {
            // Mock confirmation
            vscode.window.showQuickPick.mockResolvedValueOnce({ label: 'Yes' });
            const result = await hostConfigUI.deleteHost(mockHosts[0]);
            (0, vitest_1.expect)(configManager.deleteHost).toHaveBeenCalledWith('host1');
            (0, vitest_1.expect)(vscode.window.showInformationMessage).toHaveBeenCalledWith('Host Test Server 1 deleted');
            (0, vitest_1.expect)(result).toBeUndefined(); // Should return undefined when deleted
        });
        (0, vitest_1.it)('should not delete a host if not confirmed', async () => {
            // Mock cancellation
            vscode.window.showQuickPick.mockResolvedValueOnce('No');
            const result = await hostConfigUI.deleteHost(mockHosts[0]);
            (0, vitest_1.expect)(configManager.deleteHost).not.toHaveBeenCalled();
            (0, vitest_1.expect)(result).toEqual(mockHosts[0]);
        });
    });
    (0, vitest_1.describe)('setDefaultHost', () => {
        (0, vitest_1.it)('should set a host as default', async () => {
            await hostConfigUI.setDefaultHost(mockHosts[1]);
            (0, vitest_1.expect)(configManager.setDefaultHost).toHaveBeenCalledWith('host2');
            (0, vitest_1.expect)(vscode.window.showInformationMessage).toHaveBeenCalledWith('Test Server 2 set as default');
        });
    });
    (0, vitest_1.describe)('testConnection', () => {
        (0, vitest_1.it)('should show progress during connection test', async () => {
            // Mock the connection test to succeed
            vscode.window.showInformationMessage.mockImplementation(() => { });
            await hostConfigUI.testConnection(mockHosts[0]);
            (0, vitest_1.expect)(vscode.window.showInformationMessage).toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=host-configuration-ui.test.js.map