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
exports.RemoteFileCache = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class RemoteFileCache {
    constructor(config) {
        this.cache = new Map();
        this.stats = {
            hits: 0,
            misses: 0,
            evictions: 0,
            totalRequests: 0
        };
        this.config = config;
        this.ensureCacheDirectory();
    }
    ensureCacheDirectory() {
        if (!fs.existsSync(this.config.cacheDir)) {
            fs.mkdirSync(this.config.cacheDir, { recursive: true });
        }
    }
    async getFile(connectionId, filePath) {
        const cacheKey = this.getCacheKey(connectionId, filePath);
        this.stats.totalRequests++;
        const cached = this.cache.get(cacheKey);
        if (cached && this.isValid(cached)) {
            this.stats.hits++;
            cached.lastAccessed = new Date();
            return cached;
        }
        if (cached) {
            this.cache.delete(cacheKey);
            this.stats.evictions++;
        }
        this.stats.misses++;
        return null;
    }
    async setFile(connectionId, filePath, content, metadata) {
        const cacheKey = this.getCacheKey(connectionId, filePath);
        const cachedFile = {
            path: filePath,
            content: this.config.enableCompression ? await this.compress(content) : content,
            metadata,
            lastAccessed: new Date(),
            lastModified: new Date(),
            size: content.length,
            isDirectory: metadata.mode & 0o40000 ? true : false
        };
        // Check if we need to evict entries
        await this.ensureCapacity(cachedFile.size);
        this.cache.set(cacheKey, cachedFile);
        await this.persistToDisk(cacheKey, cachedFile);
    }
    async invalidateFile(connectionId, filePath) {
        const cacheKey = this.getCacheKey(connectionId, filePath);
        this.cache.delete(cacheKey);
        await this.removeFromDisk(cacheKey);
    }
    async invalidateDirectory(connectionId, dirPath) {
        const prefix = this.getCacheKey(connectionId, dirPath);
        const keysToDelete = [];
        for (const key of this.cache.keys()) {
            if (key.startsWith(prefix)) {
                keysToDelete.push(key);
            }
        }
        for (const key of keysToDelete) {
            this.cache.delete(key);
            await this.removeFromDisk(key);
        }
    }
    async clearCache() {
        this.cache.clear();
        this.stats = {
            hits: 0,
            misses: 0,
            evictions: 0,
            totalRequests: 0
        };
        await this.clearDiskCache();
    }
    getStats() {
        const totalSize = Array.from(this.cache.values()).reduce((sum, file) => sum + file.size, 0);
        const hitRate = this.stats.totalRequests > 0 ? this.stats.hits / this.stats.totalRequests : 0;
        const missRate = this.stats.totalRequests > 0 ? this.stats.misses / this.stats.totalRequests : 0;
        return {
            totalFiles: this.cache.size,
            totalSize,
            hitRate,
            missRate,
            evictions: this.stats.evictions
        };
    }
    getCacheKey(connectionId, filePath) {
        return `${connectionId}:${filePath}`;
    }
    isValid(cachedFile) {
        const now = new Date();
        const age = now.getTime() - cachedFile.lastModified.getTime();
        return age < this.config.maxAge;
    }
    async ensureCapacity(newFileSize) {
        const currentSize = Array.from(this.cache.values()).reduce((sum, file) => sum + file.size, 0);
        if (currentSize + newFileSize <= this.config.maxSize) {
            return;
        }
        // Sort by last accessed time (LRU)
        const entries = Array.from(this.cache.entries())
            .sort(([, a], [, b]) => a.lastAccessed.getTime() - b.lastAccessed.getTime());
        let freedSize = 0;
        const keysToRemove = [];
        for (const [key, file] of entries) {
            if (currentSize - freedSize + newFileSize <= this.config.maxSize) {
                break;
            }
            keysToRemove.push(key);
            freedSize += file.size;
        }
        for (const key of keysToRemove) {
            this.cache.delete(key);
            await this.removeFromDisk(key);
            this.stats.evictions++;
        }
    }
    async compress(data) {
        // Simple compression - in a real implementation, you'd use zlib
        return data;
    }
    async decompress(data) {
        // Simple decompression - in a real implementation, you'd use zlib
        return data;
    }
    async persistToDisk(cacheKey, cachedFile) {
        const filePath = path.join(this.config.cacheDir, this.sanitizeFileName(cacheKey));
        const data = JSON.stringify(cachedFile);
        await fs.promises.writeFile(filePath, data);
    }
    async removeFromDisk(cacheKey) {
        const filePath = path.join(this.config.cacheDir, this.sanitizeFileName(cacheKey));
        try {
            await fs.promises.unlink(filePath);
        }
        catch (error) {
            // File might not exist, ignore
        }
    }
    async clearDiskCache() {
        try {
            const files = await fs.promises.readdir(this.config.cacheDir);
            for (const file of files) {
                await fs.promises.unlink(path.join(this.config.cacheDir, file));
            }
        }
        catch (error) {
            // Directory might not exist, ignore
        }
    }
    sanitizeFileName(fileName) {
        return fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    }
    async loadFromDisk() {
        try {
            const files = await fs.promises.readdir(this.config.cacheDir);
            for (const file of files) {
                try {
                    const filePath = path.join(this.config.cacheDir, file);
                    const data = await fs.promises.readFile(filePath, 'utf8');
                    const cachedFile = JSON.parse(data);
                    // Restore dates
                    cachedFile.lastAccessed = new Date(cachedFile.lastAccessed);
                    cachedFile.lastModified = new Date(cachedFile.lastModified);
                    cachedFile.metadata.atime = new Date(cachedFile.metadata.atime);
                    cachedFile.metadata.mtime = new Date(cachedFile.metadata.mtime);
                    cachedFile.metadata.ctime = new Date(cachedFile.metadata.ctime);
                    // Convert content back to Buffer
                    if (typeof cachedFile.content === 'string') {
                        cachedFile.content = Buffer.from(cachedFile.content, 'base64');
                    }
                    const cacheKey = this.desanitizeFileName(file);
                    this.cache.set(cacheKey, cachedFile);
                }
                catch (error) {
                    // Skip corrupted cache files
                    console.warn(`Failed to load cache file ${file}:`, error);
                }
            }
        }
        catch (error) {
            // Cache directory might not exist, ignore
        }
    }
    desanitizeFileName(fileName) {
        // This is a simplified version - in practice you'd need a more robust mapping
        return fileName.replace(/_/g, ':');
    }
}
exports.RemoteFileCache = RemoteFileCache;
//# sourceMappingURL=remote-file-cache.js.map