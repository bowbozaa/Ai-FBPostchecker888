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
exports.MountManagerImpl = void 0;
/**
 * Mount Manager implementation
 * Manages remote folder mounts
 */
const vscode = __importStar(require("vscode"));
const mount_performance_monitor_1 = require("./mount-performance-monitor");
const mount_error_handler_1 = require("./mount-error-handler");
const uuid_1 = require("uuid");
/**
 * Default mount options
 */
const DEFAULT_MOUNT_OPTIONS = {
    readOnly: false,
    autoReconnect: true,
    cacheEnabled: true,
    cacheTTL: 300000, // 5 minutes
    watchEnabled: true,
    watchExcludes: ['**/node_modules/**', '**/.git/**']
};
/**
 * Implementation of the MountManager interface
 */
class MountManagerImpl {
    /**
     * Creates a new MountManagerImpl instance
     * @param connectionManager The connection manager
     * @param context The extension context
     */
    constructor(connectionManager, context) {
        this.connectionManager = connectionManager;
        this.context = context;
        this.mounts = new Map();
        this.mountsByUri = new Map(); // URI string -> mount ID
        this.disposables = [];
        this.mountsStorageKey = 'ssh-remote.mounts';
        this.errorHandler = new mount_error_handler_1.MountErrorHandler();
        this.performanceMonitor = mount_performance_monitor_1.MountPerformanceMonitor.getInstance();
        this.loadMounts();
        // Register event handlers
        this.disposables.push(vscode.workspace.onDidChangeConfiguration(e => {
            if (e.affectsConfiguration('remote-ssh.mount')) {
                this.updateMountOptions();
            }
        }));
    }
    /**
     * Get all mounts
     * @returns Array of mount points
     */
    getMounts() {
        return Array.from(this.mounts.values());
    }
    /**
     * Get a mount by ID
     * @param id The mount ID
     * @returns The mount point or undefined if not found
     */
    getMountById(id) {
        return this.mounts.get(id);
    }
    /**
     * Get a mount by URI
     * @param uri The URI
     * @returns The mount point or undefined if not found
     */
    getMountByUri(uri) {
        const uriString = uri.toString();
        const mountId = this.mountsByUri.get(uriString);
        if (mountId) {
            return this.mounts.get(mountId);
        }
        // Try to find by prefix
        for (const [mountUri, id] of this.mountsByUri.entries()) {
            if (uriString.startsWith(mountUri)) {
                return this.mounts.get(id);
            }
        }
        return undefined;
    }
    /**
     * Add a new mount
     * @param connectionId The connection ID
     * @param remotePath The remote path
     * @param name Optional name for the mount
     * @param options Optional mount options
     * @returns The created mount point
     */
    async addMount(connectionId, remotePath, name, options) {
        // Get the connection
        const connection = this.connectionManager.getConnectionById(connectionId);
        if (!connection) {
            throw new Error(`Connection with ID ${connectionId} not found`);
        }
        // Normalize remote path
        if (!remotePath.startsWith('/')) {
            remotePath = `/${remotePath}`;
        }
        // Generate a unique ID for the mount
        const id = (0, uuid_1.v4)();
        // Generate a name if not provided
        if (!name) {
            const pathParts = remotePath.split('/');
            name = pathParts[pathParts.length - 1] || pathParts[pathParts.length - 2] || 'Remote Folder';
        }
        // Create the mount point
        const mountPoint = {
            id,
            name,
            connectionId,
            remotePath,
            mountPath: `/mounts/${id}`,
            options: { ...DEFAULT_MOUNT_OPTIONS, ...(options || {}) },
            isActive: true,
            lastActivity: new Date()
        };
        // Add the mount
        this.mounts.set(id, mountPoint);
        // Add to URI map
        const mountUri = this.getMountUri(mountPoint);
        this.mountsByUri.set(mountUri.toString(), id);
        // Save mounts
        this.saveMounts();
        // Return the mount point
        return mountPoint;
    }
    /**
     * Remove a mount
     * @param mountId The mount ID
     * @returns True if the mount was removed, false otherwise
     */
    async removeMount(mountId) {
        // Get the mount
        const mount = this.mounts.get(mountId);
        if (!mount) {
            return false;
        }
        // Remove from maps
        this.mounts.delete(mountId);
        // Remove from URI map
        const mountUri = this.getMountUri(mount);
        this.mountsByUri.delete(mountUri.toString());
        // Save mounts
        this.saveMounts();
        return true;
    }
    /**
     * Update a mount
     * @param mountId The mount ID
     * @param updates The updates to apply
     * @returns The updated mount point or undefined if not found
     */
    async updateMount(mountId, updates) {
        // Get the mount
        const mount = this.mounts.get(mountId);
        if (!mount) {
            return undefined;
        }
        // Update the mount
        const updatedMount = {
            ...mount,
            ...updates,
            // Ensure ID is not changed
            id: mountId
        };
        // Update the mount
        this.mounts.set(mountId, updatedMount);
        // Update URI map if needed
        if (updates.remotePath || updates.connectionId) {
            const oldMountUri = this.getMountUri(mount);
            this.mountsByUri.delete(oldMountUri.toString());
            const newMountUri = this.getMountUri(updatedMount);
            this.mountsByUri.set(newMountUri.toString(), mountId);
        }
        // Save mounts
        this.saveMounts();
        return updatedMount;
    }
    /**
     * Translate a URI between mount and remote schemes
     * @param uri The URI to translate
     * @returns The translated URI or undefined if not found
     */
    translateUri(uri) {
        // Check if this is a mount URI
        if (uri.scheme === 'mount') {
            // Get the mount ID from the path
            const pathParts = uri.path.split('/');
            if (pathParts.length < 3) {
                return undefined;
            }
            const mountId = pathParts[2];
            const mount = this.mounts.get(mountId);
            if (!mount) {
                return undefined;
            }
            // Get the connection
            const connection = this.connectionManager.getConnectionById(mount.connectionId);
            if (!connection) {
                return undefined;
            }
            // Get the relative path
            const relativePath = uri.path.substring(mount.mountPath.length);
            // Create the remote URI
            return vscode.Uri.parse(`ssh://${connection.config.username}@${connection.config.host}:${connection.config.port}${mount.remotePath}${relativePath}`);
        }
        // Check if this is a remote URI
        if (uri.scheme === 'ssh') {
            // Find a mount that matches this URI
            for (const mount of this.mounts.values()) {
                // Get the connection
                const connection = this.connectionManager.getConnectionById(mount.connectionId);
                if (!connection) {
                    continue;
                }
                // Check if this URI matches the mount
                const remoteUri = this.getRemoteUri(mount);
                if (uri.toString().startsWith(remoteUri.toString())) {
                    // Get the relative path
                    const relativePath = uri.path.substring(mount.remotePath.length);
                    // Create the mount URI
                    return vscode.Uri.parse(`mount://${mount.mountPath}${relativePath}`);
                }
            }
        }
        return undefined;
    }
    /**
     * Get the mount URI for a mount point
     * @param mountPoint The mount point
     * @returns The mount URI
     */
    getMountUri(mountPoint) {
        return vscode.Uri.parse(`mount://${mountPoint.mountPath}`);
    }
    /**
     * Get the remote URI for a mount point
     * @param mountPoint The mount point
     * @returns The remote URI
     */
    getRemoteUri(mountPoint) {
        // Get the connection
        const connection = this.connectionManager.getConnectionById(mountPoint.connectionId);
        if (!connection) {
            throw new Error(`Connection with ID ${mountPoint.connectionId} not found`);
        }
        // Create the remote URI
        return vscode.Uri.parse(`ssh://${connection.config.username}@${connection.config.host}:${connection.config.port}${mountPoint.remotePath}`);
    }
    /**
     * Load mounts from storage
     */
    loadMounts() {
        try {
            // Get mounts from storage
            const mountsData = this.context.globalState.get(this.mountsStorageKey);
            if (!mountsData) {
                return;
            }
            // Add mounts
            for (const mountData of mountsData) {
                // Fix dates
                mountData.lastActivity = new Date(mountData.lastActivity);
                // Add to maps
                this.mounts.set(mountData.id, mountData);
                // Add to URI map
                const mountUri = this.getMountUri(mountData);
                this.mountsByUri.set(mountUri.toString(), mountData.id);
            }
        }
        catch (error) {
            console.error('Failed to load mounts:', error);
        }
    }
    /**
     * Save mounts to storage
     */
    saveMounts() {
        try {
            // Get mounts as array
            const mountsData = Array.from(this.mounts.values());
            // Save to storage
            this.context.globalState.update(this.mountsStorageKey, mountsData);
        }
        catch (error) {
            console.error('Failed to save mounts:', error);
        }
    }
    /**
     * Update mount options from configuration
     */
    updateMountOptions() {
        // Get configuration
        const config = vscode.workspace.getConfiguration('remote-ssh.mount');
        // Update default options
        DEFAULT_MOUNT_OPTIONS.cacheEnabled = config.get('cacheEnabled', DEFAULT_MOUNT_OPTIONS.cacheEnabled);
        DEFAULT_MOUNT_OPTIONS.cacheTTL = config.get('cacheTTL', DEFAULT_MOUNT_OPTIONS.cacheTTL);
        DEFAULT_MOUNT_OPTIONS.watchEnabled = config.get('watchEnabled', DEFAULT_MOUNT_OPTIONS.watchEnabled);
        DEFAULT_MOUNT_OPTIONS.watchExcludes = config.get('watchExcludePatterns', DEFAULT_MOUNT_OPTIONS.watchExcludes);
        DEFAULT_MOUNT_OPTIONS.autoReconnect = config.get('autoReconnect', DEFAULT_MOUNT_OPTIONS.autoReconnect);
        DEFAULT_MOUNT_OPTIONS.readOnly = config.get('readOnly', DEFAULT_MOUNT_OPTIONS.readOnly);
        // Update existing mounts
        for (const [id, mount] of this.mounts.entries()) {
            this.mounts.set(id, {
                ...mount,
                options: {
                    ...DEFAULT_MOUNT_OPTIONS,
                    ...mount.options
                }
            });
        }
    }
    /**
     * Dispose of resources
     */
    dispose() {
        this.disposables.forEach(d => d.dispose());
        this.disposables = [];
    }
}
exports.MountManagerImpl = MountManagerImpl;
//# sourceMappingURL=mount-manager.js.map