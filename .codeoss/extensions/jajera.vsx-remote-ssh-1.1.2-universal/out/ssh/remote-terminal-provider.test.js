"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const ssh_1 = require("../interfaces/ssh");
// Mock vscode module before importing the implementation
vitest_1.vi.mock('vscode', () => {
    return {
        EventEmitter: class {
            constructor() {
                this.fire = vitest_1.vi.fn();
                this.event = vitest_1.vi.fn();
                this.dispose = vitest_1.vi.fn();
            }
        }
    };
});
// Import the implementation after mocking
const remote_terminal_provider_1 = require("./remote-terminal-provider");
// Mock SSH Connection
const createMockConnection = (id, connected = true) => ({
    id,
    config: {
        host: 'test.example.com',
        port: 22,
        username: 'testuser',
        authMethod: 'password',
        password: 'testpass'
    },
    status: connected ? ssh_1.ConnectionStatus.Connected : ssh_1.ConnectionStatus.Disconnected,
    lastConnected: new Date(),
    execute: vitest_1.vi.fn().mockResolvedValue({ stdout: '', stderr: '', exitCode: 0 }),
    createSFTP: vitest_1.vi.fn().mockResolvedValue({}),
    reconnect: vitest_1.vi.fn().mockResolvedValue(undefined),
    disconnect: vitest_1.vi.fn().mockResolvedValue(undefined),
    isConnected: vitest_1.vi.fn().mockReturnValue(connected)
});
// Mock SSH Shell
class MockShell {
    constructor() {
        this.write = vitest_1.vi.fn();
        this.resize = vitest_1.vi.fn();
        this.end = vitest_1.vi.fn();
        this.on = vitest_1.vi.fn();
    }
}
(0, vitest_1.describe)('RemoteTerminalProvider', () => {
    let provider;
    let connection;
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.clearAllMocks();
        // Create mock connection
        connection = createMockConnection('test-connection');
        // Create provider
        provider = new remote_terminal_provider_1.RemoteTerminalProviderImpl();
        // Mock the _createShell method to return a MockShell
        vitest_1.vi.spyOn(provider, '_createShell').mockImplementation(() => {
            return Promise.resolve(new MockShell());
        });
    });
    (0, vitest_1.afterEach)(() => {
        vitest_1.vi.restoreAllMocks();
    });
    (0, vitest_1.it)('should create a new terminal session', async () => {
        const terminal = await provider.createTerminal(connection);
        (0, vitest_1.expect)(terminal).toBeDefined();
        (0, vitest_1.expect)(terminal.connection).toBe(connection);
        // Verify the terminal was added to the active terminals
        const activeTerminals = provider.getActiveTerminals();
        (0, vitest_1.expect)(activeTerminals.length).toBe(1);
        (0, vitest_1.expect)(activeTerminals[0]).toBe(terminal);
    });
    (0, vitest_1.it)('should throw an error if the connection is not established', async () => {
        const disconnectedConnection = createMockConnection('disconnected', false);
        await (0, vitest_1.expect)(provider.createTerminal(disconnectedConnection)).rejects.toThrow('Cannot create terminal: SSH connection is not established');
    });
    (0, vitest_1.it)('should close a terminal session', async () => {
        // Create a terminal
        const terminal = await provider.createTerminal(connection);
        const terminalId = terminal.id;
        // Close the terminal
        await provider.closeTerminal(terminalId);
        // Verify the terminal was removed from active terminals
        const activeTerminals = provider.getActiveTerminals();
        (0, vitest_1.expect)(activeTerminals.length).toBe(0);
    });
});
(0, vitest_1.describe)('RemoteTerminal', () => {
    let connection;
    let shell;
    let terminal;
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.clearAllMocks();
        // Create mock connection
        connection = createMockConnection('test-connection');
        // Create mock shell
        shell = new MockShell();
        // Create terminal
        terminal = new remote_terminal_provider_1.RemoteTerminalImpl(connection, shell);
    });
    (0, vitest_1.afterEach)(() => {
        vitest_1.vi.restoreAllMocks();
    });
    (0, vitest_1.it)('should write data to the shell', async () => {
        await terminal.write('test data');
        (0, vitest_1.expect)(shell.write).toHaveBeenCalledWith('test data');
    });
    (0, vitest_1.it)('should resize the shell', async () => {
        await terminal.resize(120, 40);
        (0, vitest_1.expect)(shell.resize).toHaveBeenCalledWith(120, 40);
    });
    (0, vitest_1.it)('should dispose resources', () => {
        terminal.dispose();
        (0, vitest_1.expect)(shell.end).toHaveBeenCalled();
    });
});
//# sourceMappingURL=remote-terminal-provider.test.js.map