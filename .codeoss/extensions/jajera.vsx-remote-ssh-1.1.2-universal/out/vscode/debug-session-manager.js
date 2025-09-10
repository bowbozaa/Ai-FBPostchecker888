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
exports.DebugSessionManagerImpl = void 0;
/**
 * Debug Session Manager Implementation
 * Handles remote debugging sessions and protocol forwarding
 */
const vscode = __importStar(require("vscode"));
const net = __importStar(require("net"));
const path = __importStar(require("path"));
/**
 * Implementation of the DebugSessionManager interface
 */
class DebugSessionManagerImpl {
    constructor(connectionManager, skipRegistration = false) {
        this.connectionManager = connectionManager;
        this.skipRegistration = skipRegistration;
        this.activeSessions = new Map();
        this.debugServers = new Map();
        this.debugAdapters = new Map();
        this.protocolForwarders = new Map();
        this.disposables = [];
        // Initialize debug adapters map with common debug adapters
        this.initializeDebugAdapters();
        if (!skipRegistration) {
            // Register debug configuration provider
            this.registerDebugConfigurationProvider();
            // Listen for breakpoint changes
            this.listenForBreakpointChanges();
        }
    }
    /**
     * Initialize debug adapters map with common debug adapters
     */
    initializeDebugAdapters() {
        // Node.js debug adapter
        this.debugAdapters.set('node', {
            type: 'node',
            command: 'node',
            args: ['--inspect'],
        });
        // Python debug adapter
        this.debugAdapters.set('python', {
            type: 'python',
            command: 'python',
            args: ['-m', 'debugpy', '--listen'],
        });
        // Go debug adapter
        this.debugAdapters.set('go', {
            type: 'go',
            command: 'dlv',
            args: ['dap', '--listen'],
        });
        // Java debug adapter
        this.debugAdapters.set('java', {
            type: 'java',
            command: 'java',
            args: ['-jar', '/path/to/java-debug-adapter.jar'],
        });
        // PHP debug adapter
        this.debugAdapters.set('php', {
            type: 'php',
            command: 'php',
            args: ['-dxdebug.mode=debug', '-dxdebug.client_port'],
        });
    }
    /**
     * Register debug configuration provider
     */
    registerDebugConfigurationProvider() {
        // Register debug configuration provider for all supported types
        for (const type of this.debugAdapters.keys()) {
            const provider = vscode.debug.registerDebugConfigurationProvider(type, {
                resolveDebugConfiguration: async (folder, config) => {
                    // Add SSH remote debugging properties
                    if (config.remote && config.connectionId) {
                        // Mark as handled by our extension
                        config.sshRemote = true;
                        // Ensure we have a name
                        if (!config.name) {
                            config.name = `Remote ${config.type} Debug`;
                        }
                        // Add remote workspace path if not specified
                        if (!config.remoteRoot && folder) {
                            const connection = this.connectionManager.getConnection(config.connectionId);
                            if (connection) {
                                try {
                                    const result = await connection.execute('pwd');
                                    if (result.exitCode === 0) {
                                        config.remoteRoot = result.stdout.trim();
                                    }
                                }
                                catch (error) {
                                    console.error('Error getting remote workspace path:', error);
                                }
                            }
                        }
                    }
                    return config;
                },
                resolveDebugConfigurationWithSubstitutedVariables: async (folder, config) => {
                    // If this is our SSH remote debug configuration, handle it
                    if (config.sshRemote && config.connectionId) {
                        try {
                            // Start the debug session through our manager
                            await this.startDebugSession(config.connectionId, config, folder);
                            // Return null to indicate we'll handle this debug session
                            return null;
                        }
                        catch (error) {
                            console.error('Error starting remote debug session:', error);
                            vscode.window.showErrorMessage(`Failed to start remote debug session: ${error}`);
                            return undefined;
                        }
                    }
                    return config;
                }
            });
            this.disposables.push(provider);
        }
    }
    /**
     * Listen for breakpoint changes
     */
    listenForBreakpointChanges() {
        // Listen for breakpoint changes
        this.disposables.push(vscode.debug.onDidChangeBreakpoints(event => {
            this.handleBreakpointChanges(event);
        }));
    }
    /**
     * Handle breakpoint changes
     */
    async handleBreakpointChanges(event) {
        // For each active session, update breakpoints
        for (const [sessionId, sessionInfo] of this.activeSessions.entries()) {
            try {
                // Get the debug session
                const session = sessionInfo.session;
                // Update added breakpoints
                for (const breakpoint of event.added) {
                    await this.addBreakpoint(sessionId, breakpoint);
                }
                // Update changed breakpoints
                for (const breakpoint of event.changed) {
                    await this.updateBreakpoint(sessionId, breakpoint);
                }
                // Remove removed breakpoints
                for (const breakpoint of event.removed) {
                    await this.removeBreakpoint(sessionId, breakpoint);
                }
            }
            catch (error) {
                console.error(`Error updating breakpoints for session ${sessionId}:`, error);
            }
        }
    }
    /**
     * Add a breakpoint to a debug session
     */
    async addBreakpoint(sessionId, breakpoint) {
        const sessionInfo = this.activeSessions.get(sessionId);
        if (!sessionInfo) {
            return;
        }
        try {
            // Get the source file path
            if (breakpoint instanceof vscode.SourceBreakpoint) {
                const source = breakpoint.location.uri.fsPath;
                // Add to session breakpoints
                if (!sessionInfo.breakpoints.has(source)) {
                    sessionInfo.breakpoints.set(source, []);
                }
                sessionInfo.breakpoints.get(source)?.push(breakpoint);
                // Forward breakpoint to remote debug adapter
                await this.forwardBreakpointToRemote(sessionInfo, breakpoint, 'add');
            }
        }
        catch (error) {
            console.error(`Error adding breakpoint to session ${sessionId}:`, error);
        }
    }
    /**
     * Update a breakpoint in a debug session
     */
    async updateBreakpoint(sessionId, breakpoint) {
        const sessionInfo = this.activeSessions.get(sessionId);
        if (!sessionInfo) {
            return;
        }
        try {
            // Get the source file path
            if (breakpoint instanceof vscode.SourceBreakpoint) {
                const source = breakpoint.location.uri.fsPath;
                // Update in session breakpoints
                const breakpoints = sessionInfo.breakpoints.get(source) || [];
                const index = breakpoints.findIndex(b => b instanceof vscode.SourceBreakpoint &&
                    b.location.uri.fsPath === source &&
                    b.location.range.isEqual(breakpoint.location.range));
                if (index !== -1) {
                    breakpoints[index] = breakpoint;
                }
                // Forward breakpoint to remote debug adapter
                await this.forwardBreakpointToRemote(sessionInfo, breakpoint, 'update');
            }
        }
        catch (error) {
            console.error(`Error updating breakpoint in session ${sessionId}:`, error);
        }
    }
    /**
     * Remove a breakpoint from a debug session
     */
    async removeBreakpoint(sessionId, breakpoint) {
        const sessionInfo = this.activeSessions.get(sessionId);
        if (!sessionInfo) {
            return;
        }
        try {
            // Get the source file path
            if (breakpoint instanceof vscode.SourceBreakpoint) {
                const source = breakpoint.location.uri.fsPath;
                // Remove from session breakpoints
                const breakpoints = sessionInfo.breakpoints.get(source) || [];
                const index = breakpoints.findIndex(b => b instanceof vscode.SourceBreakpoint &&
                    b.location.uri.fsPath === source &&
                    b.location.range.isEqual(breakpoint.location.range));
                if (index !== -1) {
                    breakpoints.splice(index, 1);
                }
                // Forward breakpoint to remote debug adapter
                await this.forwardBreakpointToRemote(sessionInfo, breakpoint, 'remove');
            }
        }
        catch (error) {
            console.error(`Error removing breakpoint from session ${sessionId}:`, error);
        }
    }
    /**
     * Forward breakpoint to remote debug adapter
     */
    async forwardBreakpointToRemote(sessionInfo, breakpoint, action) {
        try {
            if (!(breakpoint instanceof vscode.SourceBreakpoint)) {
                return;
            }
            // Get the source file path
            const localPath = breakpoint.location.uri.fsPath;
            // Convert local path to remote path
            const remotePath = await this.mapLocalPathToRemote(sessionInfo.connectionId, localPath, sessionInfo.config.localRoot, sessionInfo.config.remoteRoot);
            // Create breakpoint message
            const message = {
                seq: Date.now(),
                type: 'request',
                command: action === 'remove' ? 'removeBreakpoint' : 'setBreakpoint',
                body: {
                    source: {
                        path: remotePath
                    },
                    line: breakpoint.location.range.start.line + 1,
                    column: breakpoint.location.range.start.character + 1,
                    condition: breakpoint.condition,
                    hitCondition: breakpoint.hitCondition,
                    logMessage: breakpoint.logMessage,
                    enabled: breakpoint.enabled
                }
            };
            // Forward message to debug adapter
            await this.forwardDebugMessage(sessionInfo.connectionId, message);
        }
        catch (error) {
            console.error('Error forwarding breakpoint to remote:', error);
        }
    }
    /**
     * Map local path to remote path
     */
    async mapLocalPathToRemote(connectionId, localPath, localRoot, remoteRoot) {
        if (!localRoot || !remoteRoot) {
            return localPath;
        }
        // Get relative path from local root
        const relativePath = path.relative(localRoot, localPath);
        // Join with remote root
        return path.posix.join(remoteRoot, relativePath.replace(/\\/g, '/'));
    }
    /**
     * Start a debug session on the remote host
     */
    async startDebugSession(connectionId, config, workspaceFolder) {
        const connection = this.getConnection(connectionId);
        try {
            // Create a unique session ID
            const sessionId = `${connectionId}-${Date.now()}`;
            // Set up port forwarding for the debug session
            const localPort = await this.findFreePort();
            const remotePort = await this.findRemoteFreePort(connection);
            // Create a tunnel for the debug port
            const tunnelProcess = await this.createTunnel(connection, localPort, remotePort);
            // Start the debug adapter on the remote host
            await this.startRemoteDebugAdapter(connection, config, remotePort);
            // Start the local debug session
            const localConfig = { ...config };
            localConfig.port = localPort;
            localConfig.host = 'localhost';
            // Start the debug session
            const success = await vscode.debug.startDebugging(workspaceFolder, localConfig);
            if (!success) {
                throw new Error('Failed to start debug session');
            }
            // Get the active debug session
            const activeSession = vscode.debug.activeDebugSession;
            if (!activeSession) {
                throw new Error('No active debug session found');
            }
            // Create session info
            const sessionInfo = {
                id: sessionId,
                connectionId,
                session: activeSession,
                localPort,
                remotePort,
                tunnelProcess,
                config,
                workspaceFolder,
                breakpoints: new Map()
            };
            // Store the session
            this.activeSessions.set(sessionId, sessionInfo);
            // Set up protocol forwarding
            await this.setupProtocolForwarding(sessionInfo);
            // Set up breakpoint synchronization
            await this.synchronizeBreakpoints(sessionInfo);
            return activeSession;
        }
        catch (error) {
            console.error('Error starting debug session:', error);
            throw error;
        }
    }
    /**
     * Set up protocol forwarding
     */
    async setupProtocolForwarding(sessionInfo) {
        try {
            // Create a server to listen for debug protocol messages
            const server = net.createServer(socket => {
                // Store the socket
                if (!this.protocolForwarders.has(sessionInfo.id)) {
                    this.protocolForwarders.set(sessionInfo.id, []);
                }
                this.protocolForwarders.get(sessionInfo.id)?.push(socket);
                // Handle data from the debug adapter
                socket.on('data', async (data) => {
                    try {
                        // Parse the debug protocol message
                        const message = JSON.parse(data.toString());
                        // Forward the message to the remote debug adapter
                        await this.forwardDebugMessage(sessionInfo.connectionId, message);
                    }
                    catch (error) {
                        console.error('Error forwarding debug protocol message:', error);
                    }
                });
                // Handle socket close
                socket.on('close', () => {
                    // Remove the socket from the list
                    const sockets = this.protocolForwarders.get(sessionInfo.id) || [];
                    const index = sockets.indexOf(socket);
                    if (index !== -1) {
                        sockets.splice(index, 1);
                    }
                });
            });
            // Listen on a random port
            server.listen(0, 'localhost');
            // Store the server
            this.debugServers.set(sessionInfo.id, server);
        }
        catch (error) {
            console.error('Error setting up protocol forwarding:', error);
        }
    }
    /**
     * Synchronize breakpoints
     */
    async synchronizeBreakpoints(sessionInfo) {
        try {
            // Get all breakpoints
            const breakpoints = vscode.debug.breakpoints;
            // Group breakpoints by source file
            const breakpointsBySource = new Map();
            for (const breakpoint of breakpoints) {
                if (breakpoint instanceof vscode.SourceBreakpoint) {
                    const source = breakpoint.location.uri.fsPath;
                    if (!breakpointsBySource.has(source)) {
                        breakpointsBySource.set(source, []);
                    }
                    breakpointsBySource.get(source)?.push(breakpoint);
                }
            }
            // Store breakpoints in session info
            sessionInfo.breakpoints = breakpointsBySource;
            // Forward breakpoints to remote debug adapter
            for (const [source, bps] of breakpointsBySource.entries()) {
                for (const bp of bps) {
                    await this.forwardBreakpointToRemote(sessionInfo, bp, 'add');
                }
            }
        }
        catch (error) {
            console.error('Error synchronizing breakpoints:', error);
        }
    }
    /**
     * Stop a debug session
     */
    async stopDebugSession(sessionId) {
        const sessionInfo = this.activeSessions.get(sessionId);
        if (!sessionInfo) {
            return;
        }
        try {
            // Stop the debug session
            await vscode.debug.stopDebugging(sessionInfo.session);
            // Clean up resources
            this.activeSessions.delete(sessionId);
            // Close the debug server
            const server = this.debugServers.get(sessionId);
            if (server) {
                server.close();
                this.debugServers.delete(sessionId);
            }
            // Close protocol forwarders
            const forwarders = this.protocolForwarders.get(sessionId) || [];
            for (const socket of forwarders) {
                socket.destroy();
            }
            this.protocolForwarders.delete(sessionId);
            // Kill the tunnel process
            if (sessionInfo.tunnelProcess) {
                try {
                    sessionInfo.tunnelProcess.kill();
                }
                catch (error) {
                    console.error('Error killing tunnel process:', error);
                }
            }
            // Stop the remote debug adapter
            try {
                const connection = this.getConnection(sessionInfo.connectionId);
                await this.stopRemoteDebugAdapter(connection, sessionInfo.remotePort);
            }
            catch (error) {
                console.error('Error stopping remote debug adapter:', error);
            }
        }
        catch (error) {
            console.error('Error stopping debug session:', error);
        }
    }
    /**
     * Get active debug sessions
     */
    async getActiveDebugSessions(connectionId) {
        return Array.from(this.activeSessions.values())
            .filter(info => info.connectionId === connectionId)
            .map(info => info.session);
    }
    /**
     * Forward debugging protocol messages
     */
    async forwardDebugMessage(connectionId, message) {
        try {
            // Find all sessions for this connection
            const sessions = Array.from(this.activeSessions.values())
                .filter(info => info.connectionId === connectionId);
            if (sessions.length === 0) {
                return;
            }
            // Forward the message to each session
            for (const sessionInfo of sessions) {
                // Get the forwarders for this session
                const forwarders = this.protocolForwarders.get(sessionInfo.id) || [];
                // Forward the message to each forwarder
                for (const socket of forwarders) {
                    if (socket.writable) {
                        socket.write(JSON.stringify(message) + '\r\n');
                    }
                }
            }
        }
        catch (error) {
            console.error('Error forwarding debug message:', error);
        }
    }
    /**
     * Get a connection by ID
     */
    getConnection(connectionId) {
        const connection = this.connectionManager.getConnection(connectionId);
        if (!connection) {
            throw new Error(`Connection ${connectionId} not found`);
        }
        return connection;
    }
    /**
     * Find a free port on the local machine
     */
    async findFreePort() {
        return new Promise((resolve, reject) => {
            const server = net.createServer();
            server.listen(0, () => {
                const address = server.address();
                if (address && typeof address === 'object') {
                    const port = address.port;
                    server.close(() => {
                        resolve(port);
                    });
                }
                else {
                    server.close();
                    reject(new Error('Failed to get server address'));
                }
            });
        });
    }
    /**
     * Find a free port on the remote machine
     */
    async findRemoteFreePort(connection) {
        try {
            // Find a free port on the remote machine
            const result = await connection.execute('python -c "import socket; s=socket.socket(); s.bind((\'\', 0)); print(s.getsockname()[1]); s.close()"');
            if (result.exitCode !== 0) {
                throw new Error(`Failed to find free port: ${result.stderr}`);
            }
            const port = parseInt(result.stdout.trim(), 10);
            if (isNaN(port)) {
                throw new Error('Invalid port number');
            }
            return port;
        }
        catch (error) {
            console.error('Error finding remote free port:', error);
            // Fallback to a random port in the ephemeral range
            return Math.floor(Math.random() * (65535 - 49152) + 49152);
        }
    }
    /**
     * Create an SSH tunnel for port forwarding
     */
    async createTunnel(connection, localPort, remotePort) {
        try {
            // Create a tunnel for the debug port
            // This implementation uses the SSH connection to create a tunnel
            const result = await connection.execute(`ssh -L ${localPort}:localhost:${remotePort} -N -f`);
            if (result.exitCode !== 0) {
                throw new Error(`Failed to create tunnel: ${result.stderr}`);
            }
            // Get the process ID of the tunnel
            const pidResult = await connection.execute(`pgrep -f "ssh -L ${localPort}:localhost:${remotePort}"`);
            if (pidResult.exitCode !== 0) {
                console.warn('Could not get tunnel process ID, cleanup may be incomplete');
                return null;
            }
            const pid = parseInt(pidResult.stdout.trim(), 10);
            if (isNaN(pid)) {
                console.warn('Invalid tunnel process ID, cleanup may be incomplete');
                return null;
            }
            // Return a process-like object that can be killed
            return {
                pid,
                kill: async () => {
                    try {
                        await connection.execute(`kill ${pid}`);
                    }
                    catch (error) {
                        console.error('Error killing tunnel process:', error);
                    }
                }
            };
        }
        catch (error) {
            console.error('Error creating tunnel:', error);
            throw error;
        }
    }
    /**
     * Start a debug adapter on the remote host
     */
    async startRemoteDebugAdapter(connection, config, port) {
        try {
            // Get the debug adapter configuration
            const adapterConfig = this.debugAdapters.get(config.type);
            if (!adapterConfig) {
                throw new Error(`Unsupported debug type: ${config.type}`);
            }
            // Build the command to start the debug adapter
            let command = '';
            switch (config.type) {
                case 'node':
                    // Node.js debug adapter
                    command = `${adapterConfig.command} ${adapterConfig.args.join(' ')}=${port} ${config.program || ''} &`;
                    break;
                case 'python':
                    // Python debug adapter
                    command = `${adapterConfig.command} ${adapterConfig.args.join(' ')} ${port} ${config.program || ''} &`;
                    break;
                case 'go':
                    // Go debug adapter
                    command = `${adapterConfig.command} ${adapterConfig.args.join(' ')} :${port} ${config.program || ''} &`;
                    break;
                case 'php':
                    // PHP debug adapter
                    command = `${adapterConfig.command} ${adapterConfig.args.join(' ')}=${port} ${config.program || ''} &`;
                    break;
                case 'java':
                    // Java debug adapter
                    command = `${adapterConfig.command} ${adapterConfig.args.join(' ')} --port ${port} ${config.program || ''} &`;
                    break;
                default:
                    // Generic debug adapter
                    if (config.remoteDebugCommand) {
                        command = `${config.remoteDebugCommand} ${port} &`;
                    }
                    else {
                        throw new Error(`Unsupported debug type: ${config.type}`);
                    }
            }
            // Add working directory if specified
            if (config.cwd) {
                command = `cd ${config.cwd} && ${command}`;
            }
            // Add environment variables if specified
            if (config.env) {
                const envVars = Object.entries(config.env)
                    .map(([key, value]) => `${key}=${value}`)
                    .join(' ');
                command = `${envVars} ${command}`;
            }
            // Start the debug adapter
            const result = await connection.execute(command);
            if (result.exitCode !== 0) {
                throw new Error(`Failed to start debug adapter: ${result.stderr}`);
            }
        }
        catch (error) {
            console.error('Error starting remote debug adapter:', error);
            throw error;
        }
    }
    /**
     * Stop a remote debug adapter
     */
    async stopRemoteDebugAdapter(connection, port) {
        try {
            // Find the process listening on the port
            const result = await connection.execute(`lsof -i :${port} -t`);
            if (result.exitCode !== 0 || !result.stdout.trim()) {
                // No process found, nothing to do
                return;
            }
            // Kill the process
            const pid = result.stdout.trim();
            await connection.execute(`kill ${pid}`);
        }
        catch (error) {
            console.error('Error stopping remote debug adapter:', error);
        }
    }
    /**
     * Get the session ID for a debug session
     */
    getSessionIdBySession(session) {
        for (const [id, info] of this.activeSessions.entries()) {
            if (info.session.id === session.id) {
                return id;
            }
        }
        return undefined;
    }
    /**
     * Get debug configuration for a connection
     */
    async getDebugConfigurations(connectionId) {
        try {
            const connection = this.getConnection(connectionId);
            // Get remote language runtimes
            const runtimes = await this.detectRemoteRuntimes(connection);
            // Create debug configurations for each runtime
            const configs = [];
            for (const runtime of runtimes) {
                switch (runtime) {
                    case 'node':
                        configs.push({
                            type: 'node',
                            request: 'launch',
                            name: 'Remote Node.js',
                            program: '${file}',
                            connectionId,
                            remote: true,
                            localRoot: '${workspaceFolder}',
                            remoteRoot: '/path/to/remote/project'
                        });
                        break;
                    case 'python':
                        configs.push({
                            type: 'python',
                            request: 'launch',
                            name: 'Remote Python',
                            program: '${file}',
                            connectionId,
                            remote: true,
                            localRoot: '${workspaceFolder}',
                            remoteRoot: '/path/to/remote/project'
                        });
                        break;
                    case 'go':
                        configs.push({
                            type: 'go',
                            request: 'launch',
                            name: 'Remote Go',
                            program: '${file}',
                            connectionId,
                            remote: true,
                            localRoot: '${workspaceFolder}',
                            remoteRoot: '/path/to/remote/project'
                        });
                        break;
                    case 'java':
                        configs.push({
                            type: 'java',
                            request: 'launch',
                            name: 'Remote Java',
                            mainClass: '${file}',
                            connectionId,
                            remote: true,
                            localRoot: '${workspaceFolder}',
                            remoteRoot: '/path/to/remote/project'
                        });
                        break;
                    case 'php':
                        configs.push({
                            type: 'php',
                            request: 'launch',
                            name: 'Remote PHP',
                            program: '${file}',
                            connectionId,
                            remote: true,
                            localRoot: '${workspaceFolder}',
                            remoteRoot: '/path/to/remote/project'
                        });
                        break;
                }
            }
            return configs;
        }
        catch (error) {
            console.error('Error getting debug configurations:', error);
            return [];
        }
    }
    /**
     * Detect remote language runtimes
     */
    async detectRemoteRuntimes(connection) {
        try {
            const runtimes = [];
            // Check for Node.js
            const nodeResult = await connection.execute('which node');
            if (nodeResult.exitCode === 0) {
                runtimes.push('node');
            }
            // Check for Python
            const pythonResult = await connection.execute('which python || which python3');
            if (pythonResult.exitCode === 0) {
                runtimes.push('python');
            }
            // Check for Go
            const goResult = await connection.execute('which go');
            if (goResult.exitCode === 0) {
                runtimes.push('go');
            }
            // Check for Java
            const javaResult = await connection.execute('which java');
            if (javaResult.exitCode === 0) {
                runtimes.push('java');
            }
            // Check for PHP
            const phpResult = await connection.execute('which php');
            if (phpResult.exitCode === 0) {
                runtimes.push('php');
            }
            return runtimes;
        }
        catch (error) {
            console.error('Error detecting remote runtimes:', error);
            return [];
        }
    }
    /**
     * Dispose of all resources
     */
    dispose() {
        // Stop all debug sessions
        for (const sessionId of this.activeSessions.keys()) {
            this.stopDebugSession(sessionId);
        }
        // Close all debug servers
        for (const server of this.debugServers.values()) {
            server.close();
        }
        // Close all protocol forwarders
        for (const [sessionId, forwarders] of this.protocolForwarders.entries()) {
            for (const socket of forwarders) {
                socket.destroy();
            }
        }
        // Dispose of all disposables
        for (const disposable of this.disposables) {
            disposable.dispose();
        }
        this.activeSessions.clear();
        this.debugServers.clear();
        this.protocolForwarders.clear();
        this.disposables = [];
    }
}
exports.DebugSessionManagerImpl = DebugSessionManagerImpl;
//# sourceMappingURL=debug-session-manager.js.map