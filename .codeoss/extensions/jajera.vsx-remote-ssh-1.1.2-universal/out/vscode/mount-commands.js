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
exports.MountCommands = void 0;
/**
 * Mount Commands
 * Provides command palette integration for mount operations
 */
const vscode = __importStar(require("vscode"));
const mount_performance_monitor_1 = require("../ssh/mount-performance-monitor");
const notification_service_1 = require("./notification-service");
/**
 * Handles VS Code command palette integration for mount operations
 */
class MountCommands {
    /**
     * Creates a new mount commands instance
     * @param mountManager The mount manager
     * @param connectionManager The connection manager
     */
    constructor(mountManager, connectionManager) {
        this.mountManager = mountManager;
        this.connectionManager = connectionManager;
        this.disposables = [];
        try {
            this.notificationService = notification_service_1.NotificationService.getInstance();
            this.performanceMonitor = mount_performance_monitor_1.MountPerformanceMonitor.getInstance();
            console.log('DEBUG: MountCommands constructor completed successfully');
        }
        catch (error) {
            console.error('DEBUG: Error in MountCommands constructor:', error);
            // Fallback to using vscode.window directly if NotificationService fails
            this.notificationService = {
                showNotification: (message, level) => {
                    switch (level) {
                        case notification_service_1.NotificationLevel.Info:
                            vscode.window.showInformationMessage(message);
                            break;
                        case notification_service_1.NotificationLevel.Warning:
                            vscode.window.showWarningMessage(message);
                            break;
                        case notification_service_1.NotificationLevel.Error:
                            vscode.window.showErrorMessage(message);
                            break;
                    }
                }
            };
        }
    }
    /**
     * Register all mount commands
     * @deprecated Use direct registration in extension.ts instead
     */
    registerCommands() {
        console.log('DEBUG: MountCommands.registerCommands called');
        console.log('DEBUG: This method is deprecated. Use direct registration in extension.ts instead.');
        console.log('DEBUG: MountCommands.registerCommands completed');
    }
    /**
     * Mount a remote folder
     */
    async mountRemoteFolder() {
        try {
            // Get active connections
            const connections = this.connectionManager.getActiveConnections();
            if (connections.length === 0) {
                this.notificationService.showNotification('No active SSH connections', notification_service_1.NotificationLevel.Info);
                // Ask if the user wants to connect to a host
                const connect = await vscode.window.showInformationMessage('No active SSH connections. Would you like to connect to a host?', 'Connect', 'Cancel');
                if (connect === 'Connect') {
                    await vscode.commands.executeCommand('remote-ssh.connect');
                    return;
                }
                return;
            }
            // Create quick pick items for each connection
            const items = connections.map(connection => ({
                label: connection.config.host || `${connection.config.username}@${connection.config.host}`,
                description: `${connection.config.username}@${connection.config.host}:${connection.config.port}`,
                detail: `Connection ID: ${connection.id}`,
                connection
            }));
            // Show quick pick with connection options
            const selected = await vscode.window.showQuickPick(items, {
                placeHolder: 'Select an SSH connection',
                ignoreFocusOut: true
            });
            if (!selected) {
                return;
            }
            // Ask for remote path
            const remotePath = await vscode.window.showInputBox({
                prompt: 'Enter the remote path to mount',
                placeHolder: '/home/user/project',
                ignoreFocusOut: true,
                validateInput: (value) => {
                    if (!value) {
                        return 'Remote path is required';
                    }
                    return null;
                }
            });
            if (!remotePath) {
                return;
            }
            // Ask for mount name
            const defaultName = remotePath.split('/').filter(Boolean).pop() || 'Remote Folder';
            const mountName = await vscode.window.showInputBox({
                prompt: 'Enter a name for the mount',
                placeHolder: defaultName,
                value: defaultName,
                ignoreFocusOut: true
            });
            if (mountName === undefined) {
                return;
            }
            // Show progress
            await vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: `Mounting ${remotePath}...`,
                cancellable: false
            }, async (progress) => {
                try {
                    // Add the mount
                    const mount = await this.mountManager.addMount(selected.connection.id, remotePath, mountName || defaultName);
                    // Show success message
                    this.notificationService.showNotification(`Successfully mounted ${remotePath} as ${mount.name}`, notification_service_1.NotificationLevel.Info);
                    // Add to workspace
                    const mountUri = this.mountManager.getMountUri(mount);
                    vscode.workspace.updateWorkspaceFolders(vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders.length : 0, 0, { uri: mountUri, name: mount.name });
                }
                catch (error) {
                    // Show error message
                    this.notificationService.showNotification(`Failed to mount ${remotePath}: ${error}`, notification_service_1.NotificationLevel.Error);
                }
            });
        }
        catch (error) {
            this.notificationService.showNotification(`Failed to mount remote folder: ${error}`, notification_service_1.NotificationLevel.Error);
        }
    }
    /**
     * Unmount a remote folder
     */
    async unmountRemoteFolder() {
        try {
            // Get all mounts
            const mounts = this.mountManager.getMounts();
            if (mounts.length === 0) {
                this.notificationService.showNotification('No mounted folders', notification_service_1.NotificationLevel.Info);
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
                placeHolder: 'Select a mounted folder to unmount',
                ignoreFocusOut: true
            });
            if (!selected) {
                return;
            }
            // Show progress
            await vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: `Unmounting ${selected.mount.name}...`,
                cancellable: false
            }, async (progress) => {
                try {
                    // Remove from workspace
                    const mountUri = this.mountManager.getMountUri(selected.mount);
                    const workspaceFolders = vscode.workspace.workspaceFolders || [];
                    const folderIndex = workspaceFolders.findIndex(folder => folder.uri.toString() === mountUri.toString());
                    if (folderIndex !== -1) {
                        vscode.workspace.updateWorkspaceFolders(folderIndex, 1);
                    }
                    // Remove the mount
                    await this.mountManager.removeMount(selected.mount.id);
                    // Show success message
                    this.notificationService.showNotification(`Successfully unmounted ${selected.mount.name}`, notification_service_1.NotificationLevel.Info);
                }
                catch (error) {
                    // Show error message
                    this.notificationService.showNotification(`Failed to unmount ${selected.mount.name}: ${error}`, notification_service_1.NotificationLevel.Error);
                }
            });
        }
        catch (error) {
            this.notificationService.showNotification(`Failed to unmount remote folder: ${error}`, notification_service_1.NotificationLevel.Error);
        }
    }
    /**
     * Show mount performance statistics
     */
    async showMountPerformanceStats() {
        try {
            // Get all mounts
            const mounts = this.mountManager.getMounts();
            if (mounts.length === 0) {
                this.notificationService.showNotification('No mounted folders', notification_service_1.NotificationLevel.Info);
                return;
            }
            // Show performance stats
            this.performanceMonitor.showPerformanceMetrics();
        }
        catch (error) {
            this.notificationService.showNotification(`Failed to show mount performance statistics: ${error}`, notification_service_1.NotificationLevel.Error);
        }
    }
    /**
     * Optimize mount performance
     */
    async optimizeMountPerformance() {
        try {
            // Get all mounts
            const mounts = this.mountManager.getMounts();
            if (mounts.length === 0) {
                this.notificationService.showNotification('No mounted folders', notification_service_1.NotificationLevel.Info);
                return;
            }
            // Create quick pick items for each mount
            const items = mounts.map(mount => ({
                label: mount.name,
                description: `Remote path: ${mount.remotePath}`,
                detail: `Mount ID: ${mount.id}`,
                mount
            }));
            // Add option to optimize all mounts
            items.unshift({
                label: 'All Mounts',
                description: 'Optimize all mounted folders',
                detail: `${mounts.length} mounts`,
                mount: undefined
            });
            // Show quick pick with mount options
            const selected = await vscode.window.showQuickPick(items, {
                placeHolder: 'Select a mounted folder to optimize',
                ignoreFocusOut: true
            });
            if (!selected) {
                return;
            }
            // Show progress
            await vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: `Optimizing ${selected.mount ? selected.mount.name : 'all mounts'}...`,
                cancellable: false
            }, async (progress) => {
                try {
                    // Optimize the mount
                    await this.performanceMonitor.optimizeMountPerformance(selected.mount?.id);
                    // Show success message
                    this.notificationService.showNotification(`Successfully optimized ${selected.mount ? selected.mount.name : 'all mounts'}`, notification_service_1.NotificationLevel.Info);
                }
                catch (error) {
                    // Show error message
                    this.notificationService.showNotification(`Failed to optimize ${selected.mount ? selected.mount.name : 'all mounts'}: ${error}`, notification_service_1.NotificationLevel.Error);
                }
            });
        }
        catch (error) {
            this.notificationService.showNotification(`Failed to optimize mount performance: ${error}`, notification_service_1.NotificationLevel.Error);
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
exports.MountCommands = MountCommands;
//# sourceMappingURL=mount-commands.js.map