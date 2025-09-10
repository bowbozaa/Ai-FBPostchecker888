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
exports.MountTerminalCommands = void 0;
/**
 * Mount Terminal Commands
 * Provides command palette integration for mount-aware terminals
 */
const vscode = __importStar(require("vscode"));
const notification_service_1 = require("./notification-service");
/**
 * Handles VS Code command palette integration for mount-aware terminals
 */
class MountTerminalCommands {
    /**
     * Creates a new mount terminal commands instance
     * @param extensionBridge The extension host bridge
     * @param mountManager The mount manager
     */
    constructor(extensionBridge, mountManager) {
        this.extensionBridge = extensionBridge;
        this.mountManager = mountManager;
        this.disposables = [];
        // Get notification service instance
        this.notificationService = notification_service_1.NotificationService.getInstance();
        // Set the mount manager in the extension bridge
        this.extensionBridge.setMountManager(mountManager);
    }
    /**
     * Register all mount terminal commands
     */
    registerCommands() {
        console.log('DEBUG: MountTerminalCommands.registerCommands called');
        // Terminal commands for mounted folders
        this.registerCommand('remote-ssh.openTerminalInMount', this.openTerminalInMount.bind(this));
        this.registerCommand('remote-ssh.openTerminalInCurrentFolder', this.openTerminalInCurrentFolder.bind(this));
        this.registerCommand('remote-ssh.openTerminalWithPath', this.openTerminalWithPath.bind(this));
        console.log('DEBUG: MountTerminalCommands.registerCommands completed');
    }
    /**
     * Helper method to register a command
     */
    registerCommand(command, callback) {
        console.log(`DEBUG: Registering command: ${command}`);
        const disposable = vscode.commands.registerCommand(command, callback);
        this.disposables.push(disposable);
        console.log(`DEBUG: Command registered: ${command}`);
    }
    /**
     * Open a terminal in a mounted folder
     */
    async openTerminalInMount() {
        // Get all active mounts
        const mounts = this.mountManager.getMounts().filter(m => m.isActive);
        if (mounts.length === 0) {
            this.notificationService.showNotification('No active mounted folders', notification_service_1.NotificationLevel.Info);
            return;
        }
        // Create quick pick items for each mount
        const items = mounts.map(mount => ({
            label: mount.name,
            description: `Remote path: ${mount.remotePath}`,
            detail: `Mount ID: ${mount.id}`,
            mount
        }));
        // Show quick pick with mount options
        const selected = await vscode.window.showQuickPick(items, {
            placeHolder: 'Select a mounted folder to open terminal in',
            ignoreFocusOut: true
        });
        if (!selected) {
            return;
        }
        try {
            // Create a terminal for the selected mount
            await this.extensionBridge.createTerminalForMount(selected.mount.id);
        }
        catch (error) {
            this.notificationService.showNotification(`Failed to open terminal in mounted folder: ${error}`, notification_service_1.NotificationLevel.Error);
        }
    }
    /**
     * Open a terminal in the current folder if it's a mounted folder
     */
    async openTerminalInCurrentFolder() {
        try {
            const terminal = await this.extensionBridge.openTerminalInCurrentWorkspaceFolder();
            if (!terminal) {
                this.notificationService.showNotification('Current folder is not a mounted folder', notification_service_1.NotificationLevel.Info);
            }
        }
        catch (error) {
            this.notificationService.showNotification(`Failed to open terminal in current folder: ${error}`, notification_service_1.NotificationLevel.Error);
        }
    }
    /**
     * Open a terminal in a mounted folder with a specific path
     */
    async openTerminalWithPath() {
        // Get all active mounts
        const mounts = this.mountManager.getMounts().filter(m => m.isActive);
        if (mounts.length === 0) {
            this.notificationService.showNotification('No active mounted folders', notification_service_1.NotificationLevel.Info);
            return;
        }
        // Create quick pick items for each mount
        const items = mounts.map(mount => ({
            label: mount.name,
            description: `Remote path: ${mount.remotePath}`,
            detail: `Mount ID: ${mount.id}`,
            mount
        }));
        // Show quick pick with mount options
        const selected = await vscode.window.showQuickPick(items, {
            placeHolder: 'Select a mounted folder to open terminal in',
            ignoreFocusOut: true
        });
        if (!selected) {
            return;
        }
        // Ask for a path within the mount
        const path = await vscode.window.showInputBox({
            prompt: `Enter a path within ${selected.mount.name}`,
            placeHolder: 'e.g., src/app or /absolute/path',
            ignoreFocusOut: true
        });
        if (path === undefined) {
            return;
        }
        try {
            // Create terminal options with the specified path
            const options = {
                cwd: path,
                useWorkingDirectory: true
            };
            // Create a terminal for the selected mount with the specified path
            await this.extensionBridge.createTerminalForMount(selected.mount.id, options);
        }
        catch (error) {
            this.notificationService.showNotification(`Failed to open terminal in mounted folder: ${error}`, notification_service_1.NotificationLevel.Error);
        }
    }
    /**
     * Dispose of all resources
     */
    dispose() {
        this.disposables.forEach(d => d.dispose());
        this.disposables = [];
    }
}
exports.MountTerminalCommands = MountTerminalCommands;
//# sourceMappingURL=mount-terminal-commands.js.map