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
exports.ExtensionHostBridgeExtension = void 0;
/**
 * Extension Host Bridge Extension
 * Implements the extension compatibility layer for the VSX Remote SSH extension
 */
const vscode = __importStar(require("vscode"));
const extension_manager_1 = require("./extension-manager");
const debug_session_manager_1 = require("./debug-session-manager");
const language_server_manager_1 = require("./language-server-manager");
/**
 * Extension Host Bridge Extension
 * Extends the core bridge with extension compatibility features
 */
class ExtensionHostBridgeExtension {
    constructor(connectionManager) {
        this.connectionManager = connectionManager;
        this.disposables = [];
        // Initialize extension compatibility components
        this.extensionManager = new extension_manager_1.ExtensionManagerImpl(connectionManager);
        this.debugSessionManager = new debug_session_manager_1.DebugSessionManagerImpl(connectionManager);
        this.languageServerManager = new language_server_manager_1.LanguageServerManagerImpl(connectionManager);
    }
    /**
     * Initialize the extension host bridge extension
     */
    initialize() {
        // Register commands
        this.registerCommands();
    }
    /**
     * Register extension-related commands
     */
    registerCommands() {
        // Show extension manager
        this.disposables.push(vscode.commands.registerCommand('ssh-remote.showExtensionManager', async (connectionId) => {
            await this.showExtensionManager(connectionId);
        }));
        // Install extension
        this.disposables.push(vscode.commands.registerCommand('ssh-remote.installExtension', async (connectionId, extensionId) => {
            await this.installExtension(connectionId, extensionId);
        }));
        // Uninstall extension
        this.disposables.push(vscode.commands.registerCommand('ssh-remote.uninstallExtension', async (connectionId, extensionId) => {
            await this.uninstallExtension(connectionId, extensionId);
        }));
        // Synchronize extensions
        this.disposables.push(vscode.commands.registerCommand('ssh-remote.synchronizeExtensions', async (connectionId) => {
            await this.synchronizeExtensions(connectionId);
        }));
        // Start debug session
        this.disposables.push(vscode.commands.registerCommand('ssh-remote.startDebugSession', async (connectionId, config) => {
            await this.startDebugSession(connectionId, config);
        }));
    }
    /**
     * Show the extension manager UI
     */
    async showExtensionManager(connectionId) {
        try {
            // Get remote extensions
            const remoteExtensions = await this.extensionManager.getRemoteExtensions(connectionId);
            // Show extensions in a quick pick
            const items = remoteExtensions.map(ext => `${ext.name} (${ext.version}) - ${ext.isCompatible ? 'Compatible' : 'Not Compatible'}`);
            const selected = await vscode.window.showQuickPick([
                ...items,
                '$(add) Install New Extension',
                '$(sync) Synchronize Extensions',
                '$(close) Close'
            ], { placeHolder: 'Remote Extensions' });
            if (!selected) {
                return;
            }
            if (selected === '$(add) Install New Extension') {
                await this.showInstallExtensionUI(connectionId);
            }
            else if (selected === '$(sync) Synchronize Extensions') {
                await this.synchronizeExtensions(connectionId);
            }
            else if (selected !== '$(close) Close') {
                // Handle extension selection
                const index = items.indexOf(selected);
                if (index !== -1) {
                    const extension = remoteExtensions[index];
                    await this.showExtensionOptions(connectionId, extension);
                }
            }
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to show extension manager: ${error}`);
        }
    }
    /**
     * Show options for a selected extension
     */
    async showExtensionOptions(connectionId, extension) {
        const options = ['Uninstall', 'Cancel'];
        const selected = await vscode.window.showQuickPick(options, { placeHolder: `${extension.name} (${extension.version})` });
        if (selected === 'Uninstall') {
            await this.uninstallExtension(connectionId, extension.id);
        }
    }
    /**
     * Show UI for installing a new extension
     */
    async showInstallExtensionUI(connectionId) {
        const extensionId = await vscode.window.showInputBox({
            prompt: 'Enter extension ID (e.g., publisher.name)',
            placeHolder: 'publisher.name'
        });
        if (!extensionId) {
            return;
        }
        await this.installExtension(connectionId, extensionId);
    }
    /**
     * Install an extension on the remote host
     */
    async installExtension(connectionId, extensionId) {
        try {
            vscode.window.showInformationMessage(`Installing extension ${extensionId}...`);
            const result = await this.extensionManager.installExtension(connectionId, extensionId);
            if (result.status === 'installed') {
                vscode.window.showInformationMessage(`Extension ${extensionId} installed successfully`);
            }
            else {
                vscode.window.showErrorMessage(`Failed to install extension: ${result.error}`);
            }
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to install extension: ${error}`);
        }
    }
    /**
     * Uninstall an extension from the remote host
     */
    async uninstallExtension(connectionId, extensionId) {
        try {
            vscode.window.showInformationMessage(`Uninstalling extension ${extensionId}...`);
            const result = await this.extensionManager.uninstallExtension(connectionId, extensionId);
            if (result) {
                vscode.window.showInformationMessage(`Extension ${extensionId} uninstalled successfully`);
            }
            else {
                vscode.window.showErrorMessage(`Failed to uninstall extension`);
            }
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to uninstall extension: ${error}`);
        }
    }
    /**
     * Synchronize extensions from local to remote
     */
    async synchronizeExtensions(connectionId) {
        try {
            vscode.window.showInformationMessage('Synchronizing extensions...');
            const results = await this.extensionManager.synchronizeExtensions(connectionId);
            const installed = results.filter(r => r.status === 'installed').length;
            const failed = results.filter(r => r.status === 'failed').length;
            vscode.window.showInformationMessage(`Synchronized extensions: ${installed} installed, ${failed} failed`);
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to synchronize extensions: ${error}`);
        }
    }
    /**
     * Start a debug session on the remote host
     */
    async startDebugSession(connectionId, config) {
        try {
            vscode.window.showInformationMessage('Starting debug session...');
            const session = await this.debugSessionManager.startDebugSession(connectionId, config);
            vscode.window.showInformationMessage(`Debug session started: ${session.name}`);
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to start debug session: ${error}`);
        }
    }
    /**
     * Start a language server on the remote host
     */
    async startLanguageServer(connectionId, languageId) {
        try {
            vscode.window.showInformationMessage(`Starting ${languageId} language server...`);
            const result = await this.languageServerManager.startLanguageServer(connectionId, languageId);
            if (result) {
                vscode.window.showInformationMessage(`${languageId} language server started successfully`);
            }
            else {
                vscode.window.showErrorMessage(`Failed to start ${languageId} language server`);
            }
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to start language server: ${error}`);
        }
    }
    /**
     * Stop a language server on the remote host
     */
    async stopLanguageServer(connectionId, languageId) {
        try {
            await this.languageServerManager.stopLanguageServer(connectionId, languageId);
            vscode.window.showInformationMessage(`${languageId} language server stopped`);
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to stop language server: ${error}`);
        }
    }
    /**
     * Get the extension manager
     */
    getExtensionManager() {
        return this.extensionManager;
    }
    /**
     * Get the debug session manager
     */
    getDebugSessionManager() {
        return this.debugSessionManager;
    }
    /**
     * Get the language server manager
     */
    getLanguageServerManager() {
        return this.languageServerManager;
    }
    /**
     * Dispose of all resources
     */
    dispose() {
        // Dispose of all disposables
        this.disposables.forEach(d => d.dispose());
        this.disposables = [];
        // Dispose of extension compatibility components
        this.debugSessionManager.dispose();
        this.languageServerManager.dispose();
    }
}
exports.ExtensionHostBridgeExtension = ExtensionHostBridgeExtension;
//# sourceMappingURL=extension-host-bridge-extension.js.map