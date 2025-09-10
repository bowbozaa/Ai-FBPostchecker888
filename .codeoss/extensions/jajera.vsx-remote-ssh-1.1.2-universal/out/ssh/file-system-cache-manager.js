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
exports.FileSystemCacheManager = exports.DefaultCacheConfig = void 0;
const path = __importStar(require("path"));
/**
 * Default cache configuration
 */
exports.DefaultCacheConfig = {
    maxAge: 30000, // 30 seconds
    maxEntries: 1000,
    cacheDirectories: true,
    cacheStats: true,
    cacheContents: true,
    maxContentSize: 1024 * 1024 // 1MB
};
/**
 * Manages caching for the remote file system provider
 */
class FileSystemCacheManager {
    constructor(config = {}) {
        this.statCache = new Map();
        this.directoryCache = new Map();
        this.contentCache = new Map();
        // Cache statistics
        this.stats = {
            statHits: 0,
            statMisses: 0,
            directoryHits: 0,
            directoryMisses: 0,
            contentHits: 0,
            contentMisses: 0,
            evictions: 0
        };
        this.config = { ...exports.DefaultCacheConfig, ...config };
    }
    /**
     * Get cache key for a URI
     * @param uri The URI to get a cache key for
     * @returns Cache key string
     */
    getCacheKey(uri) {
        return `${uri.authority}:${uri.path}`;
    }
    /**
     * Check if a cache entry is still valid
     * @param timestamp The timestamp of the cache entry
     * @returns Whether the entry is still valid
     */
    isValid(timestamp) {
        return Date.now() - timestamp < this.config.maxAge;
    }
    /**
     * Ensure the cache doesn't exceed the maximum number of entries
     * @param cache The cache to check
     */
    ensureCapacity(cache) {
        if (cache.size >= this.config.maxEntries) {
            // Remove oldest entries (simple LRU implementation)
            const entries = Array.from(cache.entries());
            entries.sort((a, b) => {
                const timestampA = a[1].timestamp;
                const timestampB = b[1].timestamp;
                return timestampA - timestampB;
            });
            // Remove oldest 10% of entries
            const removeCount = Math.max(1, Math.floor(entries.length * 0.1));
            for (let i = 0; i < removeCount; i++) {
                cache.delete(entries[i][0]);
                this.stats.evictions++;
            }
        }
    }
    /**
     * Get file stat from cache or return null if not found
     * @param uri The URI to get stats for
     * @returns File stat or null if not in cache
     */
    getStat(uri) {
        if (!this.config.cacheStats) {
            return null;
        }
        const key = this.getCacheKey(uri);
        const entry = this.statCache.get(key);
        if (entry && this.isValid(entry.timestamp)) {
            this.stats.statHits++;
            return entry.stat;
        }
        if (entry) {
            this.statCache.delete(key);
        }
        this.stats.statMisses++;
        return null;
    }
    /**
     * Store file stat in cache
     * @param uri The URI of the file
     * @param stat The file stat to cache
     */
    setStat(uri, stat) {
        if (!this.config.cacheStats) {
            return;
        }
        const key = this.getCacheKey(uri);
        this.ensureCapacity(this.statCache);
        this.statCache.set(key, {
            stat,
            timestamp: Date.now()
        });
    }
    /**
     * Get directory listing from cache or return null if not found
     * @param uri The URI of the directory
     * @returns Directory listing or null if not in cache
     */
    getDirectory(uri) {
        if (!this.config.cacheDirectories) {
            return null;
        }
        const key = this.getCacheKey(uri);
        const entry = this.directoryCache.get(key);
        if (entry && this.isValid(entry.timestamp)) {
            this.stats.directoryHits++;
            return entry.entries;
        }
        if (entry) {
            this.directoryCache.delete(key);
        }
        this.stats.directoryMisses++;
        return null;
    }
    /**
     * Store directory listing in cache
     * @param uri The URI of the directory
     * @param entries The directory entries to cache
     */
    setDirectory(uri, entries) {
        if (!this.config.cacheDirectories) {
            return;
        }
        const key = this.getCacheKey(uri);
        this.ensureCapacity(this.directoryCache);
        this.directoryCache.set(key, {
            entries,
            timestamp: Date.now()
        });
    }
    /**
     * Get file content from cache or return null if not found
     * @param uri The URI of the file
     * @returns File content or null if not in cache
     */
    getContent(uri) {
        if (!this.config.cacheContents) {
            return null;
        }
        const key = this.getCacheKey(uri);
        const entry = this.contentCache.get(key);
        if (entry && this.isValid(entry.timestamp)) {
            this.stats.contentHits++;
            return entry.content;
        }
        if (entry) {
            this.contentCache.delete(key);
        }
        this.stats.contentMisses++;
        return null;
    }
    /**
     * Store file content in cache
     * @param uri The URI of the file
     * @param content The file content to cache
     */
    setContent(uri, content) {
        if (!this.config.cacheContents || content.byteLength > this.config.maxContentSize) {
            return;
        }
        const key = this.getCacheKey(uri);
        this.ensureCapacity(this.contentCache);
        this.contentCache.set(key, {
            content,
            timestamp: Date.now()
        });
    }
    /**
     * Invalidate cache entry for a URI
     * @param uri The URI to invalidate
     */
    invalidate(uri) {
        const key = this.getCacheKey(uri);
        this.statCache.delete(key);
        this.directoryCache.delete(key);
        this.contentCache.delete(key);
        // Always invalidate parent directory cache (normalize path)
        let parentPath = path.posix.dirname(uri.path);
        if (parentPath !== '/' && parentPath.endsWith('/')) {
            parentPath = parentPath.replace(/\/+$/, '');
        }
        const parentUri = uri.with({ path: parentPath });
        const parentKey = this.getCacheKey(parentUri);
        this.directoryCache.delete(parentKey);
    }
    /**
     * Invalidate all cache entries for a connection
     * @param connectionId The connection ID to invalidate
     */
    invalidateConnection(connectionId) {
        // Remove all entries for this connection
        for (const [key] of this.statCache.entries()) {
            if (key.startsWith(`${connectionId}:`)) {
                this.statCache.delete(key);
            }
        }
        for (const [key] of this.directoryCache.entries()) {
            if (key.startsWith(`${connectionId}:`)) {
                this.directoryCache.delete(key);
            }
        }
        for (const [key] of this.contentCache.entries()) {
            if (key.startsWith(`${connectionId}:`)) {
                this.contentCache.delete(key);
            }
        }
    }
    /**
     * Clear all caches
     */
    clear() {
        this.statCache.clear();
        this.directoryCache.clear();
        this.contentCache.clear();
        this.stats = {
            statHits: 0,
            statMisses: 0,
            directoryHits: 0,
            directoryMisses: 0,
            contentHits: 0,
            contentMisses: 0,
            evictions: 0
        };
    }
    /**
     * Get cache statistics
     * @returns Cache statistics
     */
    getStats() {
        const statTotal = this.stats.statHits + this.stats.statMisses;
        const directoryTotal = this.stats.directoryHits + this.stats.directoryMisses;
        const contentTotal = this.stats.contentHits + this.stats.contentMisses;
        return {
            ...this.stats,
            statHitRate: statTotal > 0 ? this.stats.statHits / statTotal : 0,
            directoryHitRate: directoryTotal > 0 ? this.stats.directoryHits / directoryTotal : 0,
            contentHitRate: contentTotal > 0 ? this.stats.contentHits / contentTotal : 0
        };
    }
}
exports.FileSystemCacheManager = FileSystemCacheManager;
//# sourceMappingURL=file-system-cache-manager.js.map