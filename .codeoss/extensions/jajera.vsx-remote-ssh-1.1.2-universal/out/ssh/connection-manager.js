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
exports.SSHConnectionManagerImpl = void 0;
const ssh2_1 = require("ssh2");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const os = __importStar(require("os"));
const vscode = __importStar(require("vscode"));
const ssh_1 = require("../interfaces/ssh");
/**
 * Helper function to classify SSH errors by type
 * @param error The error to classify
 * @param connectionId Optional connection ID
 * @returns Classified SSH error
 */
function classifySSHError(error, connectionId) {
    const errorMessage = error.message.toLowerCase();
    const timestamp = new Date();
    // Connection errors
    if (errorMessage.includes('connect etimedout') || errorMessage.includes('timeout')) {
        return {
            type: ssh_1.SSHErrorType.NetworkTimeout,
            message: 'Connection timed out while trying to reach the server',
            originalError: error,
            timestamp,
            connectionId,
            troubleshootingSteps: [
                'Check if the server is online and reachable',
                'Verify that the hostname and port are correct',
                'Check if there are any firewalls blocking the connection',
                'Try increasing the connection timeout in settings'
            ]
        };
    }
    if (errorMessage.includes('connect econnrefused') || errorMessage.includes('connection refused')) {
        return {
            type: ssh_1.SSHErrorType.ConnectionRefused,
            message: 'Connection refused by the server',
            originalError: error,
            timestamp,
            connectionId,
            troubleshootingSteps: [
                'Verify that the SSH service is running on the server',
                'Check if the port number is correct',
                'Ensure that the server\'s firewall allows SSH connections',
                'Try connecting with a different SSH client to verify the issue'
            ]
        };
    }
    if (errorMessage.includes('host unreachable') || errorMessage.includes('no route to host')) {
        return {
            type: ssh_1.SSHErrorType.HostUnreachable,
            message: 'Cannot reach the host server',
            originalError: error,
            timestamp,
            connectionId,
            troubleshootingSteps: [
                'Check your network connection',
                'Verify that the hostname is correct',
                'Try connecting to the server from another network',
                'Check if the server is behind a VPN or firewall'
            ]
        };
    }
    if (errorMessage.includes('getaddrinfo') || errorMessage.includes('dns')) {
        return {
            type: ssh_1.SSHErrorType.DNSResolutionFailed,
            message: 'Failed to resolve the hostname',
            originalError: error,
            timestamp,
            connectionId,
            troubleshootingSteps: [
                'Check if the hostname is spelled correctly',
                'Verify your DNS settings',
                'Try using an IP address instead of a hostname',
                'Check if your DNS server is functioning properly'
            ]
        };
    }
    // Authentication errors
    if (errorMessage.includes('authentication failed') || errorMessage.includes('auth failed')) {
        return {
            type: ssh_1.SSHErrorType.AuthenticationFailed,
            message: 'Authentication failed',
            originalError: error,
            timestamp,
            connectionId,
            troubleshootingSteps: [
                'Verify that your username is correct',
                'Check if your password or SSH key is correct',
                'Ensure that your SSH key is properly configured on the server',
                'Check if the server allows your authentication method'
            ]
        };
    }
    if (errorMessage.includes('permission denied')) {
        return {
            type: ssh_1.SSHErrorType.PermissionDenied,
            message: 'Permission denied by the server',
            originalError: error,
            timestamp,
            connectionId,
            troubleshootingSteps: [
                'Verify that your user account has permission to access the server',
                'Check if your SSH key is added to the authorized_keys file on the server',
                'Ensure that the permissions on your SSH key files are correct (chmod 600)',
                'Check the server\'s SSH configuration for any restrictions'
            ]
        };
    }
    if (errorMessage.includes('key') && (errorMessage.includes('rejected') || errorMessage.includes('invalid'))) {
        return {
            type: ssh_1.SSHErrorType.KeyRejected,
            message: 'SSH key was rejected by the server',
            originalError: error,
            timestamp,
            connectionId,
            troubleshootingSteps: [
                'Verify that the correct SSH key is being used',
                'Check if the key is added to the authorized_keys file on the server',
                'Ensure that the key format is supported by the server',
                'Try regenerating your SSH key pair'
            ]
        };
    }
    if (errorMessage.includes('password') && (errorMessage.includes('rejected') || errorMessage.includes('incorrect'))) {
        return {
            type: ssh_1.SSHErrorType.PasswordRejected,
            message: 'Password was rejected by the server',
            originalError: error,
            timestamp,
            connectionId,
            troubleshootingSteps: [
                'Verify that your password is correct',
                'Check if the server allows password authentication',
                'Ensure that your account is not locked due to too many failed attempts',
                'Try resetting your password on the server'
            ]
        };
    }
    // Protocol errors
    if (errorMessage.includes('protocol') || errorMessage.includes('handshake')) {
        return {
            type: ssh_1.SSHErrorType.ProtocolError,
            message: 'SSH protocol error occurred',
            originalError: error,
            timestamp,
            connectionId,
            troubleshootingSteps: [
                'Check if the server supports the SSH protocol version',
                'Verify that the server is configured correctly',
                'Try connecting with a different SSH client',
                'Check server logs for more details'
            ]
        };
    }
    // Default unknown error
    return {
        type: ssh_1.SSHErrorType.Unknown,
        message: error.message,
        originalError: error,
        timestamp,
        connectionId,
        troubleshootingSteps: [
            'Check the error message for clues',
            'Verify your connection settings',
            'Try connecting with a different SSH client',
            'Contact your system administrator if the problem persists'
        ]
    };
}
/**
 * Implementation of SSH Connection Manager
 */
class SSHConnectionManagerImpl {
    constructor(stateManager) {
        this.connections = new Map();
        this.connectionCounter = 0;
        this.stateManager = null;
        this.healthCheckInterval = null;
        this.HEALTH_CHECK_INTERVAL_MS = 30000; // Check connection health every 30 seconds
        this.DEFAULT_MAX_RECONNECT_ATTEMPTS = 5;
        this.DEFAULT_RECONNECT_BACKOFF_FACTOR = 2;
        this.DEFAULT_RECONNECT_INITIAL_DELAY_MS = 1000;
        this.DEFAULT_RECONNECT_MAX_DELAY_MS = 60000;
        this.stateManager = stateManager || null;
        this.startHealthCheck();
    }
    startHealthCheck() {
        if (this.healthCheckInterval) {
            clearInterval(this.healthCheckInterval);
        }
        this.healthCheckInterval = setInterval(() => {
            this.checkConnectionHealth().catch(err => {
                console.error('Error during connection health check:', err);
            });
        }, this.HEALTH_CHECK_INTERVAL_MS);
    }
    stopHealthCheck() {
        if (this.healthCheckInterval) {
            clearInterval(this.healthCheckInterval);
            this.healthCheckInterval = null;
        }
    }
    async checkConnectionHealth() {
        const connections = Array.from(this.connections.values());
        for (const connection of connections) {
            if (connection.status === ssh_1.ConnectionStatus.Connected) {
                try {
                    // Try to execute a simple command to check if connection is still alive
                    await connection.execute('echo "health_check"');
                }
                catch (error) {
                    console.warn(`Connection ${connection.id} appears to be dead, marking as disconnected`);
                    connection.status = ssh_1.ConnectionStatus.Disconnected;
                    // Attempt automatic reconnection
                    this.attemptReconnection(connection).catch(err => {
                        console.error(`Failed to reconnect to ${connection.id}:`, err);
                    });
                }
            }
        }
    }
    /**
     * Calculates the delay for reconnection attempts using exponential backoff with jitter
     * @param attemptCount Current attempt number (0-based)
     * @param initialDelayMs Initial delay in milliseconds
     * @param backoffFactor Factor to multiply delay by for each attempt
     * @param maxDelayMs Maximum delay in milliseconds
     * @returns Delay in milliseconds
     */
    calculateBackoffDelay(attemptCount, initialDelayMs, backoffFactor, maxDelayMs) {
        // Calculate base delay using exponential backoff
        const baseDelay = initialDelayMs * Math.pow(backoffFactor, attemptCount);
        // Apply jitter (random value between 0-50% of the base delay)
        // This helps prevent reconnection storms when multiple clients reconnect simultaneously
        const jitter = baseDelay * 0.5 * Math.random();
        // Return the delay with jitter, capped at maxDelayMs
        return Math.min(baseDelay + jitter, maxDelayMs);
    }
    /**
     * Attempts to reconnect to a disconnected SSH connection using exponential backoff
     * @param connection The connection to reconnect
     * @returns Promise that resolves when reconnection is successful or rejects after max attempts
     */
    async attemptReconnection(connection) {
        // Get reconnection settings from config or use defaults
        const maxAttempts = connection.config.maxReconnectAttempts || this.getMaxReconnectAttempts();
        const initialDelay = connection.config.reconnectInitialDelayMs || this.getReconnectInitialDelayMs();
        const backoffFactor = connection.config.reconnectBackoffFactor || this.getReconnectBackoffFactor();
        const maxDelay = connection.config.reconnectMaxDelayMs || this.getReconnectMaxDelayMs();
        // Get current reconnect attempts from state manager or use 0
        let reconnectAttempts = 0;
        if (this.stateManager) {
            const state = await this.stateManager.getConnectionState(connection.id);
            reconnectAttempts = state?.reconnectAttempts || 0;
        }
        // Update connection status to reconnecting
        connection.status = ssh_1.ConnectionStatus.Reconnecting;
        // Notify user that reconnection is being attempted
        vscode.window.showInformationMessage(`Attempting to reconnect to ${connection.config.host}...`, 'Cancel').then(selection => {
            if (selection === 'Cancel') {
                // If user cancels, stop reconnection attempts
                if (connection.reconnectTimer) {
                    clearTimeout(connection.reconnectTimer);
                    connection.reconnectTimer = null;
                }
                connection.status = ssh_1.ConnectionStatus.Disconnected;
            }
        });
        // Update connection state
        if (this.stateManager) {
            await this.stateManager.updateConnectionState(connection.id, {
                status: ssh_1.ConnectionStatus.Reconnecting,
                reconnectAttempts
            });
        }
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            // Check if reconnection was cancelled
            if (connection.status !== ssh_1.ConnectionStatus.Reconnecting) {
                throw new Error('Reconnection cancelled by user');
            }
            try {
                console.log(`Attempting to reconnect to ${connection.config.host} (attempt ${attempt}/${maxAttempts})`);
                // Show progress notification for current attempt
                vscode.window.showInformationMessage(`Reconnection attempt ${attempt}/${maxAttempts} to ${connection.config.host}...`);
                // Attempt to connect
                await connection.connect();
                console.log(`Successfully reconnected to ${connection.config.host}`);
                // Show success notification
                vscode.window.showInformationMessage(`Successfully reconnected to ${connection.config.host}`);
                // Update connection state
                if (this.stateManager) {
                    await this.stateManager.updateConnectionState(connection.id, {
                        status: ssh_1.ConnectionStatus.Connected,
                        lastActivity: new Date(),
                        reconnectAttempts: 0
                    });
                }
                return;
            }
            catch (error) {
                console.warn(`Reconnection attempt ${attempt} failed for ${connection.config.host}:`, error);
                // Get error type to determine if we should continue retrying
                const sshError = classifySSHError(error, connection.id);
                // If this is a non-retryable error, stop reconnection attempts
                if (this.shouldStopRetrying(sshError.type)) {
                    console.error(`Stopping reconnection attempts due to non-retryable error: ${sshError.type}`);
                    connection.status = ssh_1.ConnectionStatus.Error;
                    // Show error notification with details
                    vscode.window.showErrorMessage(`Cannot reconnect to ${connection.config.host}: ${sshError.message}`, 'Show Details').then(selection => {
                        if (selection === 'Show Details') {
                            this.showTroubleshootingSteps(sshError);
                        }
                    });
                    // Update connection state
                    if (this.stateManager) {
                        await this.stateManager.updateConnectionState(connection.id, {
                            status: ssh_1.ConnectionStatus.Error,
                            lastError: sshError,
                            reconnectAttempts: attempt
                        });
                    }
                    throw error;
                }
                // If this is the last attempt, give up
                if (attempt === maxAttempts) {
                    console.error(`Failed to reconnect to ${connection.config.host} after ${maxAttempts} attempts`);
                    connection.status = ssh_1.ConnectionStatus.Error;
                    // Show error notification with retry option
                    vscode.window.showErrorMessage(`Failed to reconnect to ${connection.config.host} after ${maxAttempts} attempts`, 'Retry', 'Show Details').then(selection => {
                        if (selection === 'Retry') {
                            // Reset reconnect attempts and try again
                            this.attemptReconnection(connection).catch(err => {
                                console.error('Retry failed:', err);
                            });
                        }
                        else if (selection === 'Show Details') {
                            this.showTroubleshootingSteps(sshError);
                        }
                    });
                    // Update connection state
                    if (this.stateManager) {
                        await this.stateManager.updateConnectionState(connection.id, {
                            status: ssh_1.ConnectionStatus.Error,
                            lastError: sshError,
                            reconnectAttempts: attempt
                        });
                    }
                    throw error;
                }
                // Wait before next attempt using exponential backoff with jitter
                const delay = this.calculateBackoffDelay(attempt, initialDelay, backoffFactor, maxDelay);
                console.log(`Waiting ${delay}ms before next reconnection attempt`);
                // Update connection state with current attempt count
                if (this.stateManager) {
                    await this.stateManager.updateConnectionState(connection.id, {
                        reconnectAttempts: attempt
                    });
                }
                // Wait for the calculated delay
                await new Promise(resolve => {
                    connection.reconnectTimer = setTimeout(resolve, delay);
                });
            }
        }
    }
    shouldStopRetrying(errorType) {
        // Don't retry for certain error types
        const nonRetryableErrors = [
            ssh_1.SSHErrorType.AuthenticationFailed,
            ssh_1.SSHErrorType.PermissionDenied,
            ssh_1.SSHErrorType.KeyRejected,
            ssh_1.SSHErrorType.PasswordRejected,
            ssh_1.SSHErrorType.ConfigurationError
        ];
        return nonRetryableErrors.includes(errorType);
    }
    async handleSSHError(error, connection) {
        const sshError = classifySSHError(error, connection.id);
        // Update connection state with error
        if (this.stateManager) {
            await this.stateManager.updateConnectionState(connection.id, {
                status: ssh_1.ConnectionStatus.Error,
                lastError: sshError
            });
        }
        // Show error to user
        vscode.window.showErrorMessage(`SSH Connection Error: ${sshError.message}`, 'Show Details', 'Retry').then(selection => {
            if (selection === 'Show Details') {
                this.showTroubleshootingSteps(sshError);
            }
            else if (selection === 'Retry') {
                this.attemptReconnection(connection).catch(err => {
                    console.error('Retry failed:', err);
                });
            }
        });
        // Log error for debugging
        console.error(`SSH Error for connection ${connection.id}:`, {
            type: sshError.type,
            message: sshError.message,
            originalError: sshError.originalError?.message
        });
    }
    async handleConnectionError(error, connection) {
        await this.handleSSHError(error, connection);
    }
    showTroubleshootingSteps(sshError) {
        try {
            // Create a markdown string with troubleshooting information
            let markdown = new vscode.MarkdownString();
            markdown.appendMarkdown(`# SSH Connection Error\n\n`);
            markdown.appendMarkdown(`**Error**: ${sshError.message}\n\n`);
            if (sshError.troubleshootingSteps && sshError.troubleshootingSteps.length > 0) {
                markdown.appendMarkdown('## Suggested steps:\n\n');
                sshError.troubleshootingSteps.forEach(step => {
                    markdown.appendMarkdown(`- ${step}\n`);
                });
            }
            // Add error details
            markdown.appendMarkdown('\n## Error details:\n\n');
            markdown.appendMarkdown(`- **Error type**: ${sshError.type}\n`);
            markdown.appendMarkdown(`- **Timestamp**: ${sshError.timestamp.toLocaleString()}\n`);
            // Show the troubleshooting information in a new editor
            vscode.workspace.openTextDocument({
                content: markdown.value,
                language: 'markdown'
            }).then(doc => {
                vscode.window.showTextDocument(doc);
            });
        }
        catch (error) {
            // Fallback for tests or if vscode API is not available
            console.log('Troubleshooting steps:');
            console.log(sshError.troubleshootingSteps);
        }
    }
    getMaxReconnectAttempts() {
        return vscode.workspace.getConfiguration('remote-ssh').get('reconnectAttempts', this.DEFAULT_MAX_RECONNECT_ATTEMPTS);
    }
    getReconnectBackoffFactor() {
        return this.DEFAULT_RECONNECT_BACKOFF_FACTOR;
    }
    getReconnectInitialDelayMs() {
        return this.DEFAULT_RECONNECT_INITIAL_DELAY_MS;
    }
    getReconnectMaxDelayMs() {
        return this.DEFAULT_RECONNECT_MAX_DELAY_MS;
    }
    async updateConnectionState(connection, updates = {}) {
        if (this.stateManager) {
            await this.stateManager.updateConnectionState(connection.id, {
                status: connection.status,
                lastActivity: new Date(),
                ...updates
            });
        }
    }
    async connect(config) {
        this.validateConfig(config);
        const connectionId = `connection_${++this.connectionCounter}`;
        const connection = new SSHConnectionImpl(connectionId, config);
        try {
            await connection.connect();
            this.connections.set(connectionId, connection);
            // Update connection state
            await this.updateConnectionState(connection);
            console.log(`Successfully connected to ${config.host}:${config.port}`);
            return connection;
        }
        catch (error) {
            await this.handleSSHError(error, connection);
            throw error;
        }
    }
    async disconnect(connectionId) {
        const connection = this.connections.get(connectionId);
        if (!connection) {
            throw new Error(`Connection ${connectionId} not found`);
        }
        await connection.disconnect();
        this.connections.delete(connectionId);
        // Update connection state
        if (this.stateManager) {
            await this.stateManager.updateConnectionState(connectionId, {
                status: ssh_1.ConnectionStatus.Disconnected
            });
        }
    }
    getActiveConnections() {
        return Array.from(this.connections.values());
    }
    getConnection(connectionId) {
        return this.connections.get(connectionId);
    }
    async reconnect(connectionId) {
        const connection = this.connections.get(connectionId);
        if (!connection) {
            throw new Error(`Connection ${connectionId} not found`);
        }
        await this.attemptReconnection(connection);
        return connection;
    }
    async disconnectAll() {
        const disconnectPromises = Array.from(this.connections.keys()).map(id => this.disconnect(id).catch(err => {
            console.error(`Error disconnecting ${id}:`, err);
        }));
        await Promise.all(disconnectPromises);
    }
    async restoreConnections() {
        if (!this.stateManager) {
            return [];
        }
        const restoredConnections = [];
        const savedStates = await this.stateManager.getAllConnectionStates();
        for (const state of savedStates) {
            if (state.status === ssh_1.ConnectionStatus.Connected) {
                try {
                    const connection = new SSHConnectionImpl(state.connectionId, state.config);
                    await connection.connect();
                    this.connections.set(state.connectionId, connection);
                    restoredConnections.push(connection);
                    console.log(`Restored connection to ${state.config.host}`);
                }
                catch (error) {
                    console.error(`Failed to restore connection to ${state.config.host}:`, error);
                    // Update state to reflect failure
                    await this.stateManager.updateConnectionState(state.connectionId, {
                        status: ssh_1.ConnectionStatus.Error,
                        lastError: classifySSHError(error, state.connectionId)
                    });
                }
            }
        }
        return restoredConnections;
    }
    dispose() {
        this.stopHealthCheck();
        this.disconnectAll().catch(err => {
            console.error('Error during disposal:', err);
        });
    }
    validateConfig(config) {
        if (!config.host) {
            throw new Error('Host is required');
        }
        if (!config.username) {
            throw new Error('Username is required');
        }
        if (config.port && (config.port < 1 || config.port > 65535)) {
            throw new Error('Port must be between 1 and 65535');
        }
        switch (config.authMethod) {
            case 'password':
                if (!config.password) {
                    throw new Error('Password is required for password authentication');
                }
                break;
            case 'key':
                if (!config.privateKeyPath) {
                    throw new Error('Private key path is required for key authentication');
                }
                break;
            case 'agent':
                if (!process.env.SSH_AUTH_SOCK) {
                    throw new Error('SSH agent not available (SSH_AUTH_SOCK not set)');
                }
                break;
            default:
                throw new Error(`Unsupported authentication method: ${config.authMethod}`);
        }
    }
}
exports.SSHConnectionManagerImpl = SSHConnectionManagerImpl;
/**
 * Implementation of SSH Connection
 */
class SSHConnectionImpl {
    constructor(id, config) {
        this.status = ssh_1.ConnectionStatus.Disconnected;
        this.lastConnected = new Date();
        this.client = null;
        this.connectPromise = null;
        // Track connection attempts for incremental backoff
        this.connectionAttempts = 0;
        this.MAX_CONNECTION_ATTEMPTS = 3; // Maximum attempts before giving up on initial connection
        this.lastError = null;
        this.reconnectTimer = null; // Made public so connection manager can access it
        this.sftpClient = null;
        this.id = id;
        this.config = config;
    }
    async connect() {
        if (this.connectPromise) {
            return this.connectPromise;
        }
        this.connectPromise = this._doConnect();
        return this.connectPromise;
    }
    async _doConnect() {
        if (this.status === ssh_1.ConnectionStatus.Connected) {
            return;
        }
        // Increment connection attempts counter for initial connection retries
        this.connectionAttempts++;
        // Check if we've exceeded the maximum number of initial connection attempts
        if (this.connectionAttempts > this.MAX_CONNECTION_ATTEMPTS) {
            const error = new Error(`Failed to connect after ${this.MAX_CONNECTION_ATTEMPTS} attempts`);
            this.status = ssh_1.ConnectionStatus.Error;
            this.lastError = classifySSHError(error, this.id);
            this.connectPromise = null;
            throw this.lastError;
        }
        this.status = ssh_1.ConnectionStatus.Connecting;
        this.client = new ssh2_1.Client();
        return new Promise((resolve, reject) => {
            this.client.on('ready', () => {
                this.status = ssh_1.ConnectionStatus.Connected;
                this.lastConnected = new Date();
                this.connectionAttempts = 0; // Reset connection attempts on successful connection
                this.connectPromise = null;
                resolve();
            });
            this.client.on('error', (error) => {
                this.status = ssh_1.ConnectionStatus.Error;
                this.lastError = classifySSHError(error, this.id);
                this.connectPromise = null;
                // Log detailed error information
                console.error(`SSH connection error for ${this.config.host}:`, {
                    type: this.lastError.type,
                    message: this.lastError.message,
                    attempt: this.connectionAttempts,
                    maxAttempts: this.MAX_CONNECTION_ATTEMPTS
                });
                reject(this.lastError);
            });
            this.client.on('close', () => {
                if (this.status === ssh_1.ConnectionStatus.Connected) {
                    this.status = ssh_1.ConnectionStatus.Disconnected;
                    // Show warning with reconnect option
                    vscode.window.showWarningMessage(`Connection to ${this.config.host} was closed unexpectedly.`, 'Reconnect').then(selection => {
                        if (selection === 'Reconnect') {
                            this.reconnect().catch(err => {
                                console.error(`Failed to reconnect to ${this.config.host}:`, err);
                            });
                        }
                    });
                }
            });
            // Handle keyboard-interactive authentication
            this.client.on('keyboard-interactive', (name, instructions, lang, prompts, finish) => {
                if (this.config.password && prompts.length === 1 && prompts[0].prompt.toLowerCase().includes('password')) {
                    finish([this.config.password]);
                }
                else {
                    vscode.window.showErrorMessage(`SSH server requires interactive authentication that cannot be handled automatically`, 'Learn More').then(selection => {
                        if (selection === 'Learn More') {
                            this.showInteractiveAuthInfo();
                        }
                    });
                    finish([]);
                }
            });
            // Handle banner messages
            this.client.on('banner', (message) => {
                vscode.window.showInformationMessage(`SSH Server Message: ${message}`);
            });
            try {
                const connectConfig = this.buildConnectConfig();
                this.client.connect(connectConfig);
            }
            catch (error) {
                this.status = ssh_1.ConnectionStatus.Error;
                this.connectPromise = null;
                const sshError = classifySSHError(error, this.id);
                // Log detailed error information
                console.error(`SSH connection setup error for ${this.config.host}:`, {
                    type: sshError.type,
                    message: sshError.message,
                    attempt: this.connectionAttempts,
                    maxAttempts: this.MAX_CONNECTION_ATTEMPTS
                });
                reject(sshError);
            }
        });
    }
    showInteractiveAuthInfo() {
        try {
            let markdown = new vscode.MarkdownString();
            markdown.appendMarkdown(`# SSH Interactive Authentication\n\n`);
            markdown.appendMarkdown(`The SSH server at ${this.config.host} is requesting interactive authentication that cannot be handled automatically.\n\n`);
            markdown.appendMarkdown('## What this means\n\n');
            markdown.appendMarkdown('The server is requesting additional authentication information beyond a simple password or key, such as:\n\n');
            markdown.appendMarkdown('- Two-factor authentication codes\n');
            markdown.appendMarkdown('- Security questions\n');
            markdown.appendMarkdown('- CAPTCHA or other verification\n\n');
            markdown.appendMarkdown('## Suggested solutions\n\n');
            markdown.appendMarkdown('1. **Use SSH key authentication**: Set up key-based authentication on the server to avoid interactive prompts\n');
            markdown.appendMarkdown('2. **Configure SSH agent forwarding**: Use an SSH agent to handle authentication challenges\n');
            markdown.appendMarkdown('3. **Modify server configuration**: If you control the server, consider adjusting the SSH configuration to allow non-interactive authentication\n');
            vscode.workspace.openTextDocument({
                content: markdown.value,
                language: 'markdown'
            }).then(doc => {
                vscode.window.showTextDocument(doc);
            });
        }
        catch (error) {
            console.log('SSH server requires interactive authentication');
        }
    }
    buildConnectConfig() {
        const config = {
            host: this.config.host,
            port: this.config.port,
            username: this.config.username,
            readyTimeout: this.config.connectTimeout || 15000,
            tryKeyboard: true,
            keepaliveInterval: 10000,
            keepaliveCountMax: 3,
        };
        switch (this.config.authMethod) {
            case 'password':
                if (!this.config.password) {
                    throw new Error('Password is required for password authentication');
                }
                config.password = this.config.password;
                break;
            case 'key':
                if (!this.config.privateKeyPath) {
                    throw new Error('Private key path is required for key authentication');
                }
                const keyPath = this.resolveKeyPath(this.config.privateKeyPath);
                if (!fs.existsSync(keyPath)) {
                    throw new Error(`Private key file not found: ${keyPath}`);
                }
                try {
                    config.privateKey = fs.readFileSync(keyPath);
                    if (this.config.passphrase) {
                        config.passphrase = this.config.passphrase;
                    }
                }
                catch (error) {
                    throw new Error(`Failed to read private key file: ${error.message}`);
                }
                break;
            case 'agent':
                config.agent = process.env.SSH_AUTH_SOCK;
                if (!config.agent) {
                    throw new Error('SSH agent not available (SSH_AUTH_SOCK not set)');
                }
                break;
            default:
                throw new Error(`Unsupported authentication method: ${this.config.authMethod}`);
        }
        return config;
    }
    resolveKeyPath(keyPath) {
        if (keyPath.startsWith('~/')) {
            return path.join(os.homedir(), keyPath.slice(2));
        }
        return path.resolve(keyPath);
    }
    async execute(command) {
        if (!this.client || this.status !== ssh_1.ConnectionStatus.Connected) {
            throw new Error('SSH connection is not established');
        }
        return new Promise((resolve, reject) => {
            this.client.exec(command, (err, stream) => {
                if (err) {
                    reject(new Error(`Command execution failed: ${err.message}`));
                    return;
                }
                let stdout = '';
                let stderr = '';
                let exitCode = 0;
                stream.on('data', (data) => {
                    stdout += data.toString();
                });
                stream.stderr.on('data', (data) => {
                    stderr += data.toString();
                });
                stream.on('close', (code) => {
                    exitCode = code || 0;
                    resolve({ stdout, stderr, exitCode });
                });
                stream.on('error', (err) => {
                    reject(err);
                });
            });
        });
    }
    async createSFTP() {
        if (!this.client || this.status !== ssh_1.ConnectionStatus.Connected) {
            throw new Error('SSH connection is not established');
        }
        return new Promise((resolve, reject) => {
            this.client.sftp((err, sftp) => {
                if (err) {
                    reject(new Error(`Failed to create SFTP session: ${err.message}`));
                    return;
                }
                resolve(sftp);
            });
        });
    }
    async disconnect() {
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
            this.reconnectTimer = null;
        }
        if (this.sftpClient) {
            this.sftpClient = null;
        }
        if (this.client) {
            return new Promise((resolve) => {
                this.client.on('close', () => {
                    this.client = null;
                    this.status = ssh_1.ConnectionStatus.Disconnected;
                    resolve();
                });
                try {
                    this.client.end();
                }
                catch (error) {
                    this.client = null;
                    this.status = ssh_1.ConnectionStatus.Disconnected;
                    resolve();
                }
            });
        }
        else {
            this.status = ssh_1.ConnectionStatus.Disconnected;
            return Promise.resolve();
        }
    }
    async reconnect() {
        this.status = ssh_1.ConnectionStatus.Reconnecting;
        try {
            await this.disconnect();
            await this.connect();
        }
        catch (error) {
            this.status = ssh_1.ConnectionStatus.Error;
            throw error;
        }
    }
    isConnected() {
        return this.status === ssh_1.ConnectionStatus.Connected;
    }
}
//# sourceMappingURL=connection-manager.js.map