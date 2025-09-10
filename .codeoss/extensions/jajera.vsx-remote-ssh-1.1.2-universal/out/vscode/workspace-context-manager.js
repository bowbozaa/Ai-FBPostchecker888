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
exports.WorkspaceContextManager = void 0;
const vscode = __importStar(require("vscode"));
/**
 * Manages workspace contexts for multiple SSH connections
 */
class WorkspaceContextManager {
    constructor(context, connectionManager, configManager) {
        this.context = context;
        this.connectionManager = connectionManager;
        this.configManager = configManager;
        this.contexts = new Map();
        this.disposables = [];
        this.loadContexts();
        this.registerEventHandlers();
    }
    /**
     * Load saved workspace contexts from extension storage
     */
    loadContexts() {
        const savedContexts = this.context.globalState.get(WorkspaceContextManager.WORKSPACE_CONTEXTS_KEY, []);
        (savedContexts || []).forEach(ctx => {
            this.contexts.set(ctx.id, ctx);
        });
    }
    /**
     * Save workspace contexts to extension storage
     */
    async saveContexts() {
        const contextsArray = Array.from(this.contexts.values());
        await this.context.globalState.update(WorkspaceContextManager.WORKSPACE_CONTEXTS_KEY, contextsArray);
    }
    /**
     * Register event handlers for workspace changes
     */
    registerEventHandlers() {
        // Track file opening
        this.disposables.push(vscode.window.onDidChangeActiveTextEditor(editor => {
            if (editor && this.activeContextId) {
                const context = this.contexts.get(this.activeContextId);
                if (context) {
                    const filePath = editor.document.uri.path;
                    if (!context.openFiles.includes(filePath)) {
                        context.openFiles.push(filePath);
                        this.saveContexts();
                    }
                }
            }
        }));
        // Track workspace folder changes
        this.disposables.push(vscode.workspace.onDidChangeWorkspaceFolders(() => {
            this.updateActiveContext();
        }));
    }
    /**
     * Update the active context based on current workspace
     */
    updateActiveContext() {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders || workspaceFolders.length === 0) {
            this.activeContextId = undefined;
            return;
        }
        // Check if the current workspace URI matches any of our SSH contexts
        const currentUri = workspaceFolders[0].uri;
        if (currentUri.scheme === 'ssh') {
            // Find or create a context for this SSH workspace
            for (const [id, ctx] of this.contexts.entries()) {
                if (currentUri.path.startsWith(ctx.workspacePath)) {
                    this.activeContextId = id;
                    ctx.lastAccessed = new Date();
                    this.saveContexts();
                    return;
                }
            }
            // No matching context found, create a new one
            this.createContextFromUri(currentUri);
        }
        else {
            this.activeContextId = undefined;
        }
    }
    /**
     * Create a new workspace context from a URI
     */
    async createContextFromUri(uri) {
        if (uri.scheme !== 'ssh') {
            return undefined;
        }
        // Parse the SSH URI to get connection details
        const match = uri.authority.match(/([^@]+)@([^:]+)(?::(\d+))?/);
        if (!match) {
            return undefined;
        }
        const [, username, host, portStr] = match;
        const port = portStr ? parseInt(portStr, 10) : 22;
        // Find the connection for this host
        const connections = this.connectionManager.getActiveConnections();
        let connection;
        for (const conn of connections) {
            if (conn.config.host === host &&
                conn.config.username === username &&
                conn.config.port === port) {
                connection = conn;
                break;
            }
        }
        if (!connection) {
            // No active connection found, try to find a matching host config
            const hosts = await this.configManager.getHosts();
            let hostConfig;
            for (const config of hosts) {
                if (config.host === host &&
                    config.username === username &&
                    config.port === port) {
                    hostConfig = config;
                    break;
                }
            }
            if (!hostConfig) {
                return undefined;
            }
            // Create a new connection
            try {
                connection = await this.connectionManager.connect(hostConfig);
            }
            catch (error) {
                console.error('Failed to create connection for workspace context:', error);
                return undefined;
            }
        }
        // Create a new context
        const contextId = `context_${Date.now()}`;
        const workspacePath = uri.path;
        const pathParts = workspacePath.split('/');
        const name = pathParts[pathParts.length - 1] || `${host}:${workspacePath}`;
        const newContext = {
            id: contextId,
            connectionId: connection.id,
            workspacePath,
            name,
            lastAccessed: new Date(),
            openFiles: []
        };
        this.contexts.set(contextId, newContext);
        this.activeContextId = contextId;
        await this.saveContexts();
        return newContext;
    }
    /**
     * Get the active workspace context
     */
    getActiveContext() {
        if (!this.activeContextId) {
            return undefined;
        }
        return this.contexts.get(this.activeContextId);
    }
    /**
     * Get all workspace contexts
     */
    getAllContexts() {
        return Array.from(this.contexts.values());
    }
    /**
     * Get contexts for a specific connection
     */
    getContextsForConnection(connectionId) {
        return Array.from(this.contexts.values()).filter(ctx => ctx.connectionId === connectionId);
    }
    /**
     * Switch to a different workspace context
     */
    async switchToContext(contextId) {
        const context = this.contexts.get(contextId);
        if (!context) {
            return false;
        }
        // Get the connection for this context
        const connection = this.connectionManager.getConnection(context.connectionId);
        if (!connection) {
            return false;
        }
        // Create a URI for the workspace
        const uri = vscode.Uri.parse(`ssh://${connection.config.username}@${connection.config.host}:${connection.config.port}${context.workspacePath}`);
        // Open the folder
        try {
            await vscode.commands.executeCommand('vscode.openFolder', uri);
            return true;
        }
        catch (error) {
            console.error('Failed to switch workspace context:', error);
            return false;
        }
    }
    /**
     * Create a new workspace context
     */
    async createContext(connection, workspacePath, name) {
        const contextId = `context_${Date.now()}`;
        const pathParts = workspacePath.split('/');
        const contextName = name || pathParts[pathParts.length - 1] || `${connection.config.host}:${workspacePath}`;
        const newContext = {
            id: contextId,
            connectionId: connection.id,
            workspacePath,
            name: contextName,
            lastAccessed: new Date(),
            openFiles: []
        };
        this.contexts.set(contextId, newContext);
        await this.saveContexts();
        return newContext;
    }
    /**
     * Delete a workspace context
     */
    async deleteContext(contextId) {
        const deleted = this.contexts.delete(contextId);
        if (deleted) {
            if (this.activeContextId === contextId) {
                this.activeContextId = undefined;
            }
            await this.saveContexts();
        }
        return deleted;
    }
    /**
     * Restore the last workspace after VS Code restart
     */
    async restoreLastWorkspace() {
        // Find the most recently accessed context
        let mostRecent;
        let mostRecentDate = new Date(0);
        for (const context of this.contexts.values()) {
            if (context.lastAccessed > mostRecentDate) {
                mostRecent = context;
                mostRecentDate = context.lastAccessed;
            }
        }
        if (mostRecent) {
            return await this.switchToContext(mostRecent.id);
        }
        return false;
    }
    /**
     * Update a workspace context
     */
    async updateContext(contextId, updates) {
        const context = this.contexts.get(contextId);
        if (!context) {
            return false;
        }
        Object.assign(context, updates);
        await this.saveContexts();
        return true;
    }
    /**
     * Dispose of all resources
     */
    dispose() {
        this.disposables.forEach(d => d.dispose());
    }
}
exports.WorkspaceContextManager = WorkspaceContextManager;
WorkspaceContextManager.WORKSPACE_CONTEXTS_KEY = 'vsx-remote-ssh.workspaceContexts';
//# sourceMappingURL=workspace-context-manager.js.map