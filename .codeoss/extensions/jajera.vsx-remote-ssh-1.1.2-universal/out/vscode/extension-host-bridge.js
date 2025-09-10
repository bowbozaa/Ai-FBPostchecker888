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
exports.ExtensionHostBridgeImpl = void 0;
const vscode = __importStar(require("vscode"));
const remote_file_system_provider_1 = require("../ssh/remote-file-system-provider");
const mount_terminal_provider_1 = require("../ssh/mount-terminal-provider");
const mount_source_control_provider_1 = require("../ssh/mount-source-control-provider");
const ssh_1 = require("../interfaces/ssh");
const host_configuration_ui_1 = require("../config/host-configuration-ui");
class ExtensionHostBridgeImpl {
    constructor(connectionManager, configManager, fileCache, terminalProvider) {
        this.fileSystemProviders = new Map();
        this.terminals = new Map();
        this.disposables = [];
        this.connectionManager = connectionManager;
        this.configManager = configManager;
        this.fileCache = fileCache;
        this.terminalProvider = terminalProvider;
        this.hostConfigUI = new host_configuration_ui_1.HostConfigurationUI(configManager);
        this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
    }
    async initialize() {
        // Initialize the host configuration UI
        this.hostConfigUI = new host_configuration_ui_1.HostConfigurationUI(this.configManager);
        // Create status bar item
        this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
        this.statusBarItem.text = '$(server) SSH Remote';
        this.statusBarItem.tooltip = 'SSH Remote Extension';
        this.statusBarItem.show();
        this.disposables.push(this.statusBarItem);
        // Set up connection monitoring
        this.setupConnectionMonitoring();
        console.log('Extension Host Bridge initialized');
    }
    setupConnectionMonitoring() {
        // Monitor connection status changes
        setInterval(() => {
            const activeConnections = this.connectionManager.getActiveConnections();
            if (activeConnections.length > 0) {
                const connection = activeConnections[0]; // For now, show first connection
                this.updateStatusBar(connection.id, connection.status);
            }
            else {
                this.statusBarItem.text = '$(server) SSH Remote';
                this.statusBarItem.tooltip = 'No active SSH connections';
            }
        }, 5000);
    }
    registerFileSystemProvider(connectionId, provider) {
        const vscodeProvider = new VSCodeFileSystemProvider(provider);
        this.fileSystemProviders.set(connectionId, vscodeProvider);
    }
    unregisterFileSystemProvider(connectionId) {
        const provider = this.fileSystemProviders.get(connectionId);
        if (provider) {
            this.fileSystemProviders.delete(connectionId);
        }
    }
    async createTerminal(connectionId, options) {
        const connection = this.connectionManager.getConnection(connectionId);
        if (!connection) {
            throw new Error(`Connection ${connectionId} not found`);
        }
        const remoteTerminal = await this.terminalProvider.createTerminal(connection, options);
        const terminal = vscode.window.createTerminal({
            name: `SSH: ${connection.config.host}`,
            pty: new SSHPseudoTerminal(remoteTerminal)
        });
        this.terminals.set(connectionId, terminal);
        return terminal;
    }
    updateStatusBar(connectionId, status) {
        const connection = this.connectionManager.getConnection(connectionId);
        if (!connection) {
            return;
        }
        const statusIcons = {
            [ssh_1.ConnectionStatus.Connected]: '$(check)',
            [ssh_1.ConnectionStatus.Connecting]: '$(sync~spin)',
            [ssh_1.ConnectionStatus.Reconnecting]: '$(sync~spin)',
            [ssh_1.ConnectionStatus.Error]: '$(error)',
            [ssh_1.ConnectionStatus.Disconnected]: '$(server)'
        };
        this.statusBarItem.text = `${statusIcons[status]} SSH: ${connection.config.host}`;
        this.statusBarItem.tooltip = `SSH Connection to ${connection.config.host} (${status})`;
    }
    showNotification(message, type) {
        switch (type) {
            case 'info':
                vscode.window.showInformationMessage(message);
                break;
            case 'warning':
                vscode.window.showWarningMessage(message);
                break;
            case 'error':
                vscode.window.showErrorMessage(message);
                break;
        }
    }
    async showInputBox(prompt, password, defaultValue) {
        return vscode.window.showInputBox({
            prompt,
            password,
            ignoreFocusOut: true,
            value: defaultValue
        });
    }
    async showQuickPick(items, placeholder, activeItem) {
        const options = {
            placeHolder: placeholder,
            ignoreFocusOut: true
        };
        // VS Code doesn't directly support setting an active item in QuickPick
        // We'll return the result as is
        return vscode.window.showQuickPick(items, options);
    }
    async openFile(uri) {
        const document = await vscode.workspace.openTextDocument(uri);
        await vscode.window.showTextDocument(document);
    }
    async revealFile(uri) {
        await vscode.commands.executeCommand('revealInExplorer', uri);
    }
    async showHostSelection() {
        // Use the host configuration UI to show the host selection menu
        const selectedHost = await this.hostConfigUI.showHostSelectionMenu();
        if (selectedHost) {
            await this.connectToHost(selectedHost);
        }
    }
    async connectToHost(host) {
        try {
            this.showNotification(`Connecting to ${host.host}...`, 'info');
            const connection = await this.connectionManager.connect(host);
            if (connection && connection.isConnected()) {
                this.showNotification(`Connected to ${host.host}`, 'info');
                // Register file system provider for this connection
                const fileSystemProvider = new remote_file_system_provider_1.RemoteFileSystemProviderImpl(this.connectionManager);
                this.registerFileSystemProvider(connection.id, fileSystemProvider);
                // Update status bar
                this.updateStatusBar(connection.id, ssh_1.ConnectionStatus.Connected);
                // Open remote workspace if specified
                if (host.remoteWorkspace) {
                    try {
                        // Create a URI for the remote workspace
                        const uri = vscode.Uri.parse(`ssh://${host.username}@${host.host}:${host.port}${host.remoteWorkspace}`);
                        // Open the folder in a new window
                        await vscode.commands.executeCommand('vscode.openFolder', uri);
                    }
                    catch (error) {
                        this.showNotification(`Failed to open remote workspace: ${error}`, 'warning');
                    }
                }
            }
        }
        catch (error) {
            this.showNotification(`Failed to connect to ${host.host}: ${error}`, 'error');
            throw error;
        }
    }
    async disconnectCurrentHost() {
        const activeConnections = this.connectionManager.getActiveConnections();
        if (activeConnections.length === 0) {
            this.showNotification('No active SSH connections', 'info');
            return;
        }
        for (const connection of activeConnections) {
            await this.connectionManager.disconnect(connection.id);
            this.unregisterFileSystemProvider(connection.id);
        }
        this.showNotification('Disconnected from all SSH hosts', 'info');
    }
    showActiveConnections() {
        const connections = this.connectionManager.getActiveConnections();
        if (connections.length === 0) {
            this.showNotification('No active SSH connections', 'info');
            return;
        }
        const message = connections.map((c) => `${c.config.host} (${c.status})`).join('\n');
        vscode.window.showInformationMessage(`Active connections:\n${message}`);
    }
    async openTerminalForCurrentConnection() {
        const activeConnections = this.connectionManager.getActiveConnections();
        if (activeConnections.length === 0) {
            this.showNotification('No active SSH connection', 'warning');
            return undefined;
        }
        try {
            const connection = activeConnections[0];
            const terminal = await this.createTerminal(connection.id);
            terminal.show();
            return terminal;
        }
        catch (error) {
            this.showNotification(`Failed to open terminal: ${error}`, 'error');
            return undefined;
        }
    }
    /**
     * Set the mount manager for terminal integration with mounted folders
     * @param mountManager The mount manager instance
     */
    setMountManager(mountManager) {
        this.mountManager = mountManager;
        // Initialize the mount terminal provider if we have both dependencies
        if (this.mountManager && this.terminalProvider) {
            this.mountTerminalProvider = new mount_terminal_provider_1.MountTerminalProviderImpl(this.terminalProvider, this.mountManager);
        }
        // Initialize the mount source control provider
        if (this.mountManager) {
            this.mountSourceControlProvider = new mount_source_control_provider_1.MountSourceControlProviderImpl(this.mountManager);
        }
    }
    /**
     * Initialize source control for a mount point
     * @param mountId The ID of the mount point
     * @returns The source control instance
     */
    async initializeSourceControlForMount(mountId) {
        if (!this.mountSourceControlProvider || !this.mountManager) {
            throw new Error('Mount source control provider not initialized. Mount manager must be set first.');
        }
        const mountPoint = this.mountManager.getMountById(mountId);
        if (!mountPoint) {
            throw new Error(`Mount point with ID ${mountId} not found`);
        }
        try {
            const sourceControl = await this.mountSourceControlProvider.initializeSourceControl(mountPoint);
            return sourceControl;
        }
        catch (error) {
            this.showNotification(`Failed to initialize source control for mount: ${error}`, 'error');
            throw error;
        }
    }
    /**
     * Execute a Git command on a mounted folder
     * @param mountId The ID of the mount point
     * @param command The Git command to execute
     * @param args The arguments for the Git command
     * @returns The result of the command execution
     */
    async executeGitCommand(mountId, command, ...args) {
        if (!this.mountSourceControlProvider || !this.mountManager) {
            throw new Error('Mount source control provider not initialized. Mount manager must be set first.');
        }
        const mountPoint = this.mountManager.getMountById(mountId);
        if (!mountPoint) {
            throw new Error(`Mount point with ID ${mountId} not found`);
        }
        try {
            return await this.mountSourceControlProvider.executeGitCommand(mountId, command, ...args);
        }
        catch (error) {
            this.showNotification(`Failed to execute Git command: ${error}`, 'error');
            throw error;
        }
    }
    /**
     * Refresh the source control status for a mount point
     * @param mountId The ID of the mount point
     */
    async refreshSourceControl(mountId) {
        if (!this.mountSourceControlProvider || !this.mountManager) {
            throw new Error('Mount source control provider not initialized. Mount manager must be set first.');
        }
        const mountPoint = this.mountManager.getMountById(mountId);
        if (!mountPoint) {
            throw new Error(`Mount point with ID ${mountId} not found`);
        }
        try {
            await this.mountSourceControlProvider.refreshSourceControl(mountId);
        }
        catch (error) {
            this.showNotification(`Failed to refresh source control: ${error}`, 'error');
            throw error;
        }
    }
    /**
     * Create a terminal for a mounted folder
     * @param mountId The ID of the mount point
     * @param options Terminal options
     * @returns A new VS Code terminal
     */
    async createTerminalForMount(mountId, options) {
        if (!this.mountTerminalProvider || !this.mountManager) {
            throw new Error('Mount terminal provider not initialized. Mount manager must be set first.');
        }
        const mountPoint = this.mountManager.getMountById(mountId);
        if (!mountPoint) {
            throw new Error(`Mount point with ID ${mountId} not found`);
        }
        try {
            const terminal = await this.mountTerminalProvider.createTerminalForMount(mountId, options);
            terminal.show();
            return terminal;
        }
        catch (error) {
            this.showNotification(`Failed to create terminal for mount: ${error}`, 'error');
            throw error;
        }
    }
    /**
     * Open a terminal in the current workspace folder if it's a mounted folder
     * @returns A new terminal or undefined if the current folder is not a mounted folder
     */
    async openTerminalInCurrentWorkspaceFolder() {
        if (!this.mountTerminalProvider) {
            this.showNotification('Mount terminal provider not initialized', 'warning');
            return undefined;
        }
        try {
            const terminal = await this.mountTerminalProvider.openTerminalInCurrentWorkspaceFolder();
            if (terminal) {
                terminal.show();
                return terminal;
            }
            else {
                // If no mount was found for the current folder, fall back to regular SSH terminal
                return this.openTerminalForCurrentConnection();
            }
        }
        catch (error) {
            this.showNotification(`Failed to open terminal in current folder: ${error}`, 'warning');
            return undefined;
        }
    }
    async addNewHost() {
        // Use the host configuration UI to add a new host
        const newHost = await this.hostConfigUI.addNewHost();
        if (newHost) {
            // Ask if user wants to connect now
            const connectNow = await this.showQuickPick(['Yes', 'No'], 'Connect to this host now?');
            if (connectNow === 'Yes') {
                await this.connectToHost(newHost);
            }
        }
    }
    async showHostManagement() {
        // Use the host configuration UI to show the host management menu
        const selectedHost = await this.hostConfigUI.showHostManagement();
        if (selectedHost) {
            // If a host was selected, ask what action to perform
            const options = [
                'Connect',
                'Edit',
                'Delete',
                'Set as Default',
                'Test Connection'
            ];
            const action = await this.showQuickPick(options, `Action for ${selectedHost.name}`);
            if (!action) {
                return;
            }
            switch (action) {
                case 'Connect':
                    await this.connectToHost(selectedHost);
                    break;
                case 'Edit':
                    await this.editHost(selectedHost);
                    break;
                case 'Delete':
                    await this.deleteHost(selectedHost.id);
                    break;
                case 'Set as Default':
                    await this.configManager.setDefaultHost(selectedHost.id);
                    this.showNotification(`${selectedHost.name} set as default`, 'info');
                    break;
                case 'Test Connection':
                    await this.testConnection(selectedHost);
                    break;
            }
        }
    }
    async testConnectionImpl(host) {
        try {
            this.showNotification(`Testing connection to ${host.host}...`, 'info');
            // Create a temporary connection to test
            const connection = await this.connectionManager.connect(host);
            if (connection && connection.isConnected()) {
                this.showNotification(`Connection to ${host.host} successful!`, 'info');
                // Disconnect the test connection
                await this.connectionManager.disconnect(connection.id);
            }
            else {
                this.showNotification(`Failed to connect to ${host.host}`, 'error');
            }
        }
        catch (error) {
            this.showNotification(`Connection test failed: ${error}`, 'error');
        }
    }
    async testConnection(hostId) {
        let host;
        if (typeof hostId === 'string') {
            const foundHost = await this.configManager.getHost(hostId);
            if (!foundHost) {
                this.showNotification(`Host with ID ${hostId} not found`, 'error');
                return;
            }
            host = foundHost;
        }
        else {
            host = hostId;
        }
        await this.testConnectionImpl(host);
    }
    async editHostImpl(host) {
        // Create a multi-step wizard for editing an existing host
        const fields = [
            'Name',
            'Hostname/IP',
            'Username',
            'Port',
            'Authentication Method',
            'Private Key Path',
            'Remote Workspace',
            'Cancel'
        ];
        const fieldToEdit = await this.showQuickPick(fields, 'Select field to edit');
        if (!fieldToEdit || fieldToEdit === 'Cancel') {
            return;
        }
        const updates = {};
        switch (fieldToEdit) {
            case 'Name':
                const name = await this.showInputBox('Enter new name', false, host.name);
                if (name) {
                    updates.name = name;
                }
                break;
            case 'Hostname/IP':
                const hostname = await this.showInputBox('Enter new hostname or IP address', false, host.host);
                if (hostname) {
                    updates.host = hostname;
                }
                break;
            case 'Username':
                const username = await this.showInputBox('Enter new username', false, host.username);
                if (username) {
                    updates.username = username;
                }
                break;
            case 'Port':
                const portStr = await this.showInputBox('Enter new port', false, host.port.toString());
                if (portStr) {
                    const port = parseInt(portStr, 10);
                    if (isNaN(port) || port < 1 || port > 65535) {
                        this.showNotification('Invalid port number. Please enter a number between 1 and 65535.', 'error');
                        return;
                    }
                    updates.port = port;
                }
                break;
            case 'Authentication Method':
                const authMethods = ['password', 'key', 'agent'];
                const authMethod = await this.showQuickPick(authMethods, 'Select authentication method');
                if (authMethod) {
                    updates.authMethod = authMethod;
                }
                break;
            case 'Private Key Path':
                const keyPath = await this.showInputBox('Enter private key path', false, host.privateKeyPath);
                if (keyPath) {
                    updates.privateKeyPath = keyPath;
                }
                break;
            case 'Remote Workspace':
                const workspace = await this.showInputBox('Enter remote workspace path', false, host.remoteWorkspace);
                if (workspace) {
                    updates.remoteWorkspace = workspace;
                }
                break;
        }
        if (Object.keys(updates).length > 0) {
            try {
                await this.configManager.updateHost(host.id, updates);
                this.showNotification(`Host ${host.name} updated successfully`, 'info');
            }
            catch (error) {
                this.showNotification(`Failed to update host: ${error}`, 'error');
            }
        }
    }
    async editHost(hostId) {
        let host;
        if (typeof hostId === 'string') {
            const foundHost = await this.configManager.getHost(hostId);
            if (!foundHost) {
                this.showNotification(`Host with ID ${hostId} not found`, 'error');
                return;
            }
            host = foundHost;
        }
        else {
            host = hostId;
        }
        await this.editHostImpl(host);
    }
    /**
     * Delete a host by ID
     * @param hostId The ID of the host to delete
     */
    async deleteHost(hostId) {
        const host = await this.configManager.getHost(hostId);
        if (!host) {
            this.showNotification(`Host with ID ${hostId} not found`, 'error');
            return;
        }
        const confirmDelete = await this.showQuickPick(['Yes', 'No'], `Are you sure you want to delete ${host.name}?`);
        if (confirmDelete === 'Yes') {
            try {
                await this.configManager.deleteHost(hostId);
                this.showNotification(`Host ${host.name} deleted`, 'info');
            }
            catch (error) {
                this.showNotification(`Failed to delete host: ${error}`, 'error');
            }
        }
    }
    dispose() {
        this.statusBarItem.dispose();
        this.disposables.forEach(d => d.dispose());
        this.terminals.forEach(t => t.dispose());
    }
}
exports.ExtensionHostBridgeImpl = ExtensionHostBridgeImpl;
// Helper classes for VS Code integration
class VSCodeFileSystemProvider {
    constructor(remoteProvider) {
        this.remoteProvider = remoteProvider;
        this.onDidChangeFile = new vscode.EventEmitter().event;
    }
    watch() {
        return {
            ignoreCreateEvents: false,
            ignoreChangeEvents: false,
            ignoreDeleteEvents: false,
            onDidCreate: new vscode.EventEmitter().event,
            onDidChange: new vscode.EventEmitter().event,
            onDidDelete: new vscode.EventEmitter().event,
            dispose: () => { }
        };
    }
    // Delegate all methods to remote provider
    async readFile(uri) {
        return this.remoteProvider.readFile(uri);
    }
    async writeFile(uri, content, options) {
        return this.remoteProvider.writeFile(uri, content, options);
    }
    async delete(uri, options) {
        return this.remoteProvider.delete(uri, options);
    }
    async rename(oldUri, newUri, options) {
        return this.remoteProvider.rename(oldUri, newUri, options);
    }
    async stat(uri) {
        return this.remoteProvider.stat(uri);
    }
    async readDirectory(uri) {
        return this.remoteProvider.readDirectory(uri);
    }
    async createDirectory(uri) {
        return this.remoteProvider.createDirectory(uri);
    }
}
class SSHPseudoTerminal {
    constructor(remoteTerminal) {
        this.remoteTerminal = remoteTerminal;
        this.writeEmitter = new vscode.EventEmitter();
        this.closeEmitter = new vscode.EventEmitter();
        this.onDidWrite = this.writeEmitter.event;
        this.onDidClose = this.closeEmitter.event;
        this.remoteTerminal.onData((data) => {
            this.writeEmitter.fire(data);
        });
        this.remoteTerminal.onExit((code) => {
            this.closeEmitter.fire(code);
        });
    }
    open() {
        // Terminal is ready
    }
    close() {
        this.remoteTerminal.dispose();
    }
    handleInput(data) {
        this.remoteTerminal.write(data);
    }
    setDimensions(dimensions) {
        this.remoteTerminal.resize(dimensions.columns, dimensions.rows);
    }
}
//# sourceMappingURL=extension-host-bridge.js.map