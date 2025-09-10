"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VSCodeSecureStorage = void 0;
/**
 * Implementation of SecureStorage using VS Code's SecretStorage API
 * for secure credential management
 */
class VSCodeSecureStorage {
    constructor(context) {
        this.keyPrefix = 'vsx-remote-ssh-';
        this.storedKeys = new Set();
        this.secretStorage = context.secrets;
    }
    /**
     * Store a value securely
     * @param key The key to store the value under
     * @param value The value to store
     */
    async store(key, value) {
        const fullKey = `${this.keyPrefix}${key}`;
        await this.secretStorage.store(fullKey, value);
        this.storedKeys.add(fullKey);
    }
    /**
     * Retrieve a securely stored value
     * @param key The key to retrieve
     * @returns The stored value or undefined if not found
     */
    async retrieve(key) {
        return await this.secretStorage.get(`${this.keyPrefix}${key}`);
    }
    /**
     * Delete a securely stored value
     * @param key The key to delete
     */
    async delete(key) {
        const fullKey = `${this.keyPrefix}${key}`;
        await this.secretStorage.delete(fullKey);
        this.storedKeys.delete(fullKey);
    }
    /**
     * Clear all securely stored values for this extension
     */
    async clear() {
        // Delete all tracked keys
        const deletePromises = Array.from(this.storedKeys).map(key => this.secretStorage.delete(key));
        await Promise.all(deletePromises);
        this.storedKeys.clear();
    }
}
exports.VSCodeSecureStorage = VSCodeSecureStorage;
//# sourceMappingURL=secure-storage.js.map