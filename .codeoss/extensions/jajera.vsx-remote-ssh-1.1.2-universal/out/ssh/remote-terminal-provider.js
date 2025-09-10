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
exports.RemoteTerminalProviderImpl = exports.RemoteTerminalImpl = void 0;
/**
 * Remote Terminal Provider Implementation
 * Provides SSH terminal functionality for VS Code
 */
const vscode = __importStar(require("vscode"));
const uuid_1 = require("uuid");
const ssh_1 = require("../interfaces/ssh");
const error_classifier_1 = require("./error-classifier");
const terminal_session_manager_1 = require("./terminal-session-manager");
/**
 * Implementation of RemoteTerminal interface
 * Represents a single terminal session connected to a remote SSH server
 */
class RemoteTerminalImpl {
    /**
     * Creates a new remote terminal instance
     * @param connection SSH connection to use for this terminal
     * @param shell The SSH shell instance
     * @param sessionId Optional session ID for persistence
     */
    constructor(connection, shell, sessionId) {
        this._disposed = false;
        this._id = (0, uuid_1.v4)();
        this._connection = connection;
        this._shell = shell;
        this._onDataEmitter = new vscode.EventEmitter();
        this._onExitEmitter = new vscode.EventEmitter();
        this._errorClassifier = new error_classifier_1.SSHErrorClassifier();
        this._sessionId = sessionId || (0, uuid_1.v4)();
        // Set up event handlers for the shell
        this._setupEventHandlers();
    }
    /**
     * Get the terminal ID
     */
    get id() {
        return this._id;
    }
    /**
     * Get the SSH connection associated with this terminal
     */
    get connection() {
        return this._connection;
    }
    /**
     * Event that fires when data is received from the terminal
     */
    get onData() {
        return this._onDataEmitter.event;
    }
    /**
     * Event that fires when the terminal exits
     */
    get onExit() {
        return this._onExitEmitter.event;
    }
    /**
     * Get the session ID for persistence
     */
    get sessionId() {
        return this._sessionId;
    }
    /**
     * Write data to the terminal
     * @param data The data to write
     */
    async write(data) {
        if (this._disposed) {
            throw new Error('Terminal has been disposed');
        }
        try {
            this._shell.write(data);
        }
        catch (error) {
            const typedError = error;
            console.error(`Error writing to terminal: ${typedError.message}`);
            // Check if it's a network error and try to reconnect
            if (this._errorClassifier.isNetworkError(typedError)) {
                await this._attemptReconnect();
                // Retry the write after reconnection
                this._shell.write(data);
            }
            else {
                throw typedError;
            }
        }
    }
    /**
     * Resize the terminal
     * @param cols Number of columns
     * @param rows Number of rows
     */
    async resize(cols, rows) {
        if (this._disposed) {
            throw new Error('Terminal has been disposed');
        }
        try {
            this._shell.resize(cols, rows);
        }
        catch (error) {
            const typedError = error;
            console.error(`Error resizing terminal: ${typedError.message}`);
            // Check if it's a network error and try to reconnect
            if (this._errorClassifier.isNetworkError(typedError)) {
                await this._attemptReconnect();
                // Retry the resize after reconnection
                this._shell.resize(cols, rows);
            }
            else {
                throw typedError;
            }
        }
    }
    /**
     * Dispose of the terminal resources
     */
    dispose() {
        if (this._disposed) {
            return;
        }
        try {
            this._shell.end();
            this._onDataEmitter.dispose();
            this._onExitEmitter.dispose();
            this._disposed = true;
        }
        catch (error) {
            console.error(`Error disposing terminal: ${error.message}`);
        }
    }
    /**
     * Set up event handlers for the shell
     */
    _setupEventHandlers() {
        // Handle data events
        this._shell.on('data', (data) => {
            const stringData = data.toString();
            this._onDataEmitter.fire(stringData);
        });
        // Handle exit events
        this._shell.on('exit', (code) => {
            this._onExitEmitter.fire(code || 0);
            this._disposed = true;
        });
        // Handle error events
        this._shell.on('error', (error) => {
            console.error(`Terminal error: ${error.message}`);
            // Check if it's a network error and try to reconnect
            if (this._errorClassifier.isNetworkError(error)) {
                this._attemptReconnect().catch(reconnectError => {
                    console.error(`Failed to reconnect terminal: ${reconnectError.message}`);
                    this._onExitEmitter.fire(1);
                    this._disposed = true;
                });
            }
            else {
                // For non-network errors, just exit the terminal
                this._onExitEmitter.fire(1);
                this._disposed = true;
            }
        });
        // Handle close events
        this._shell.on('close', () => {
            if (!this._disposed) {
                this._onExitEmitter.fire(0);
                this._disposed = true;
            }
        });
    }
    /**
     * Attempt to reconnect the terminal session
     */
    async _attemptReconnect() {
        try {
            // Notify user that reconnection is being attempted
            this._onDataEmitter.fire('\r\n[Connection lost. Attempting to reconnect...]\r\n');
            // Reconnect the SSH connection if needed
            if (!this._connection.isConnected()) {
                await this._connection.reconnect();
            }
            // Access the provider to create a new shell
            const provider = new RemoteTerminalProviderImpl();
            // Get the session manager
            const sessionManager = provider.getSessionManager();
            // Get the session state if it exists
            const sessionState = sessionManager.getSessionState(this._sessionId);
            // Get the current terminal options (if any were stored)
            const terminalOptions = {
                cols: this._shell.columns || 80,
                rows: this._shell.rows || 24,
                // Use the working directory from the session if available
                cwd: sessionState?.workingDirectory || '~',
                // Use the environment variables from the session if available
                env: sessionState?.environmentVariables || {}
            };
            // Create a new shell session
            const newShell = await provider._createShell(this._connection, terminalOptions);
            // Replace the old shell with the new one
            const oldShell = this._shell;
            this._shell = newShell;
            // Set up event handlers for the new shell
            this._setupEventHandlers();
            // Clean up the old shell
            try {
                oldShell.end();
            }
            catch (err) {
                console.warn('Error ending old shell session:', err);
            }
            // Update the session with the new PID if available
            if (newShell.pid && sessionManager) {
                sessionManager.updateSession(this._sessionId, {
                    pid: newShell.pid,
                    isActive: true
                });
            }
            // Notify that we've reconnected
            this._onDataEmitter.fire('\r\n[Connection restored]\r\n');
        }
        catch (error) {
            console.error(`Failed to reconnect terminal: ${error.message}`);
            this._onDataEmitter.fire(`\r\n[Failed to reconnect: ${error.message}]\r\n`);
            throw error;
        }
    }
}
exports.RemoteTerminalImpl = RemoteTerminalImpl;
/**
 * Implementation of RemoteTerminalProvider interface
 * Manages terminal sessions for remote SSH connections
 */
class RemoteTerminalProviderImpl {
    /**
     * Creates a new remote terminal provider
     * @param sessionManager Optional terminal session manager
     */
    constructor(sessionManager) {
        this._terminals = new Map();
        this._errorClassifier = new error_classifier_1.SSHErrorClassifier();
        this._sessionManager = sessionManager || new terminal_session_manager_1.TerminalSessionManager();
    }
    /**
     * Create a new terminal session
     * @param connection SSH connection to use
     * @param options Terminal options
     * @returns A new RemoteTerminal instance
     */
    async createTerminal(connection, options) {
        if (!connection.isConnected()) {
            throw new Error('Cannot create terminal: SSH connection is not established');
        }
        try {
            // Create a new shell session
            const shell = await this._createShell(connection, options);
            // Create a session in the session manager
            const session = this._sessionManager.createSession(connection.id, options?.cwd || '~', options?.env || {});
            // Create the terminal instance
            const terminal = new RemoteTerminalImpl(connection, shell, session.id);
            // Store the terminal
            this._terminals.set(terminal.id, terminal);
            // Update the session with the PID if available
            if (shell.pid) {
                this._sessionManager.updateSession(session.id, {
                    pid: shell.pid
                });
            }
            return terminal;
        }
        catch (error) {
            const typedError = error;
            console.error(`Failed to create terminal: ${typedError.message}`);
            // Classify the error for better error messages
            const errorType = this._errorClassifier.classifyError(typedError);
            switch (errorType) {
                case ssh_1.SSHErrorType.AuthenticationFailed:
                    throw new Error('Authentication failed. Please check your credentials.');
                case ssh_1.SSHErrorType.ConnectionRefused:
                    throw new Error('Connection refused. The SSH server may not be running or accessible.');
                case ssh_1.SSHErrorType.PermissionDenied:
                    throw new Error('Permission denied. You may not have the required permissions to create a shell.');
                default:
                    throw new Error(`Failed to create terminal: ${typedError.message}`);
            }
        }
    }
    /**
     * Get all active terminal sessions
     * @returns Array of active RemoteTerminal instances
     */
    getActiveTerminals() {
        return Array.from(this._terminals.values());
    }
    /**
     * Close a terminal session
     * @param terminalId ID of the terminal to close
     */
    async closeTerminal(terminalId) {
        const terminal = this._terminals.get(terminalId);
        if (!terminal) {
            throw new Error(`Terminal with ID ${terminalId} not found`);
        }
        // Get the session ID from the terminal
        const sessionId = terminal.sessionId;
        // Mark the session as inactive
        if (sessionId) {
            this._sessionManager.deactivateSession(sessionId);
        }
        terminal.dispose();
        this._terminals.delete(terminalId);
    }
    /**
     * Restore terminal sessions for a connection
     * @param connection The SSH connection to restore sessions for
     * @returns Array of restored terminals
     */
    async restoreTerminalSessions(connection) {
        if (!connection.isConnected()) {
            throw new Error('Cannot restore terminals: SSH connection is not established');
        }
        const sessions = this._sessionManager.getSessionsByConnection(connection.id);
        const restoredTerminals = [];
        for (const session of sessions) {
            if (!session.isActive) {
                continue; // Skip inactive sessions
            }
            try {
                // Create a new shell with the session's environment and working directory
                const options = {
                    cwd: session.cwd,
                    env: session.environment
                };
                const shell = await this._createShell(connection, options);
                // Create the terminal instance with the existing session ID
                const terminal = new RemoteTerminalImpl(connection, shell, session.id);
                // Store the terminal
                this._terminals.set(terminal.id, terminal);
                // Activate the session
                this._sessionManager.activateSession(session.id);
                // Update the session with the new PID if available
                if (shell.pid) {
                    this._sessionManager.updateSession(session.id, {
                        pid: shell.pid
                    });
                }
                restoredTerminals.push(terminal);
                // Notify the user that the terminal was restored
                vscode.window.showInformationMessage(`Restored terminal session in ${session.cwd}`);
            }
            catch (error) {
                console.error(`Failed to restore terminal session ${session.id}:`, error);
                // Mark the session as inactive since we couldn't restore it
                this._sessionManager.deactivateSession(session.id);
            }
        }
        return restoredTerminals;
    }
    /**
     * Get the session manager
     * @returns The terminal session manager
     */
    getSessionManager() {
        return this._sessionManager;
    }
    /**
     * Create a shell session on the remote server
     * @param connection SSH connection to use
     * @param options Terminal options
     * @returns A shell instance
     */
    async _createShell(connection, options) {
        if (!connection.isConnected()) {
            throw new Error('Cannot create shell: SSH connection is not established');
        }
        try {
            // Access the underlying SSH client from the connection
            // This assumes the SSHConnection implementation has a method to access the client
            const client = connection.client;
            if (!client) {
                throw new Error('SSH client not available');
            }
            // Set default terminal options if not provided
            const shellOptions = {
                term: 'xterm-256color',
                cols: options?.cols || 80,
                rows: options?.rows || 24,
                env: { ...process.env, ...options?.env },
            };
            // Add custom shell path if specified
            if (options?.shellPath) {
                shellOptions.env.SHELL = options.shellPath;
            }
            // Create a new shell session
            return new Promise((resolve, reject) => {
                client.shell(shellOptions, (err, stream) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    // If a working directory is specified, change to it after the shell is created
                    if (options?.cwd) {
                        // Wait for the shell to be ready before sending the cd command
                        stream.once('ready', () => {
                            stream.write(`cd "${options.cwd.replace(/"/g, '\\"')}"\n`);
                        });
                    }
                    // If shell arguments are specified, send them to the shell
                    if (options?.shellArgs && options.shellArgs.length > 0) {
                        // Wait for the shell to be ready before sending arguments
                        stream.once('ready', () => {
                            const argsString = options.shellArgs.join(' ');
                            stream.write(`${argsString}\n`);
                        });
                    }
                    resolve(stream);
                });
            });
        }
        catch (error) {
            console.error('Failed to create shell:', error);
            throw error;
        }
    }
}
exports.RemoteTerminalProviderImpl = RemoteTerminalProviderImpl;
//# sourceMappingURL=remote-terminal-provider.js.map