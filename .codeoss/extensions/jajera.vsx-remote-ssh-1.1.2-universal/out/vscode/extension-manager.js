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
exports.ExtensionManagerImpl = void 0;
/**
 * Extension Manager Implementation
 * Handles remote extension installation, compatibility checking, and synchronization
 */
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const extension_1 = require("../interfaces/extension");
/**
 * Implementation of the ExtensionManager interface
 */
class ExtensionManagerImpl {
    constructor(connectionManager) {
        this.connectionManager = connectionManager;
        this.remoteExtensionsCache = new Map();
        this.compatibilityCache = new Map();
    }
    /**
     * Get all extensions installed on the remote host
     */
    async getRemoteExtensions(connectionId) {
        // Check cache first
        if (this.remoteExtensionsCache.has(connectionId)) {
            return this.remoteExtensionsCache.get(connectionId) || [];
        }
        const connection = this.getConnection(connectionId);
        try {
            // Get the remote extensions directory
            const result = await connection.execute('code --list-extensions --show-versions --category');
            if (result.exitCode !== 0) {
                throw new Error(`Failed to list remote extensions: ${result.stderr}`);
            }
            // Parse the output
            const extensions = [];
            const lines = result.stdout.split('\n').filter(line => line.trim().length > 0);
            for (const line of lines) {
                try {
                    // Format is: publisher.name@version [kind]
                    const match = line.match(/^([^@]+)@([^\s]+)\s+\[([^\]]+)\]$/);
                    if (match) {
                        const [, id, version, kindStr] = match;
                        const [publisher, name] = id.split('.');
                        // Parse extension kinds
                        const kinds = [];
                        if (kindStr.includes('ui')) {
                            kinds.push(extension_1.ExtensionKind.UI);
                        }
                        if (kindStr.includes('workspace')) {
                            kinds.push(extension_1.ExtensionKind.Workspace);
                        }
                        if (kindStr.includes('web')) {
                            kinds.push(extension_1.ExtensionKind.Web);
                        }
                        // Get extension path
                        const pathResult = await connection.execute(`code --locate-extension ${id}`);
                        const extensionPath = pathResult.stdout.trim();
                        // Check if extension is active
                        const isActive = true; // We can't easily determine this remotely
                        // Get extension details
                        const packageJsonPath = path.join(extensionPath, 'package.json');
                        const packageJsonResult = await connection.execute(`cat ${packageJsonPath}`);
                        let description = '';
                        if (packageJsonResult.exitCode === 0) {
                            try {
                                const packageJson = JSON.parse(packageJsonResult.stdout);
                                description = packageJson.description || '';
                            }
                            catch (e) {
                                // Ignore JSON parsing errors
                            }
                        }
                        // Check compatibility
                        const isCompatible = kinds.includes(extension_1.ExtensionKind.Workspace);
                        extensions.push({
                            id,
                            name,
                            publisher,
                            version,
                            description,
                            isActive,
                            path: extensionPath,
                            isCompatible,
                            extensionKind: kinds
                        });
                    }
                }
                catch (e) {
                    console.error('Error parsing extension:', e);
                }
            }
            // Cache the results
            this.remoteExtensionsCache.set(connectionId, extensions);
            return extensions;
        }
        catch (error) {
            console.error('Error getting remote extensions:', error);
            return [];
        }
    }
    /**
     * Install an extension on the remote host
     */
    async installExtension(connectionId, extensionId) {
        const connection = this.getConnection(connectionId);
        try {
            // Install the extension
            const result = await connection.execute(`code --install-extension ${extensionId}`);
            if (result.exitCode !== 0) {
                return {
                    extensionId,
                    status: extension_1.ExtensionInstallStatus.Failed,
                    error: result.stderr
                };
            }
            // Clear the cache
            this.remoteExtensionsCache.delete(connectionId);
            return {
                extensionId,
                status: extension_1.ExtensionInstallStatus.Installed
            };
        }
        catch (error) {
            return {
                extensionId,
                status: extension_1.ExtensionInstallStatus.Failed,
                error: error instanceof Error ? error.message : String(error)
            };
        }
    }
    /**
     * Uninstall an extension from the remote host
     */
    async uninstallExtension(connectionId, extensionId) {
        const connection = this.getConnection(connectionId);
        try {
            // Uninstall the extension
            const result = await connection.execute(`code --uninstall-extension ${extensionId}`);
            if (result.exitCode !== 0) {
                return false;
            }
            // Clear the cache
            this.remoteExtensionsCache.delete(connectionId);
            return true;
        }
        catch (error) {
            return false;
        }
    }
    /**
     * Check if an extension is compatible with remote execution
     */
    async isExtensionCompatible(extensionId) {
        // Check cache first
        if (this.compatibilityCache.has(extensionId)) {
            return this.compatibilityCache.get(extensionId) || false;
        }
        try {
            // Get the extension
            const extension = vscode.extensions.getExtension(extensionId);
            if (!extension) {
                return false;
            }
            // Check if the extension is compatible with remote execution
            // Extensions that can run in workspace are compatible
            const packageJson = extension.packageJSON;
            const extensionKind = packageJson.extensionKind;
            let isCompatible = false;
            if (Array.isArray(extensionKind)) {
                isCompatible = extensionKind.includes('workspace');
            }
            else if (typeof extensionKind === 'string') {
                isCompatible = extensionKind === 'workspace';
            }
            else {
                // Default to true for extensions without extensionKind
                isCompatible = true;
            }
            // Cache the result
            this.compatibilityCache.set(extensionId, isCompatible);
            return isCompatible;
        }
        catch (error) {
            console.error('Error checking extension compatibility:', error);
            return false;
        }
    }
    /**
     * Get locally installed extensions that are compatible with remote execution
     */
    async getCompatibleLocalExtensions() {
        const extensions = vscode.extensions.all;
        const compatibleExtensions = [];
        for (const extension of extensions) {
            const isCompatible = await this.isExtensionCompatible(extension.id);
            if (isCompatible) {
                compatibleExtensions.push(extension);
            }
        }
        return compatibleExtensions;
    }
    /**
     * Synchronize compatible extensions from local to remote
     */
    async synchronizeExtensions(connectionId) {
        const results = [];
        try {
            // Get compatible local extensions
            const localExtensions = await this.getCompatibleLocalExtensions();
            // Get remote extensions
            const remoteExtensions = await this.getRemoteExtensions(connectionId);
            const remoteExtensionIds = new Set(remoteExtensions.map(ext => ext.id));
            // Install missing extensions
            for (const extension of localExtensions) {
                if (!remoteExtensionIds.has(extension.id)) {
                    const result = await this.installExtension(connectionId, extension.id);
                    results.push(result);
                }
            }
            return results;
        }
        catch (error) {
            console.error('Error synchronizing extensions:', error);
            return results;
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
     * Clear the extension cache for a connection
     */
    clearCache(connectionId) {
        this.remoteExtensionsCache.delete(connectionId);
    }
    /**
     * Clear all caches
     */
    clearAllCaches() {
        this.remoteExtensionsCache.clear();
        this.compatibilityCache.clear();
    }
}
exports.ExtensionManagerImpl = ExtensionManagerImpl;
//# sourceMappingURL=extension-manager.js.map