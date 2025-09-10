"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
// Mock SecureStorage implementation
class MockSecureStorage {
    constructor() {
        this.storage = new Map();
    }
    async store(key, value) {
        this.storage.set(key, value);
    }
    async retrieve(key) {
        return this.storage.get(key);
    }
    async delete(key) {
        this.storage.delete(key);
    }
    async clear() {
        this.storage.clear();
    }
}
// Mock ConfigurationManager for testing
class MockConfigurationManager {
    constructor(secureStorage) {
        this.hosts = [];
        this.secureStorage = secureStorage;
    }
    async saveHost(host) {
        // Store password securely if provided
        if (host.authMethod === 'password' && host.password) {
            await this.secureStorage.store(`host_password_${host.id}`, host.password);
            // Remove password from the host config object
            const hostCopy = { ...host };
            delete hostCopy.password;
            host = hostCopy;
        }
        // Store passphrase securely if provided
        if (host.authMethod === 'key' && host.passphrase) {
            await this.secureStorage.store(`host_passphrase_${host.id}`, host.passphrase);
            // Remove passphrase from the host config object
            const hostCopy = { ...host };
            delete hostCopy.passphrase;
            host = hostCopy;
        }
        const existingIndex = this.hosts.findIndex(h => h.id === host.id);
        if (existingIndex >= 0) {
            this.hosts[existingIndex] = host;
        }
        else {
            this.hosts.push(host);
        }
    }
    async updateHost(hostId, updates) {
        const hostIndex = this.hosts.findIndex(h => h.id === hostId);
        if (hostIndex === -1) {
            throw new Error(`Host with ID ${hostId} not found`);
        }
        const currentHost = this.hosts[hostIndex];
        const updatedHost = { ...currentHost, ...updates };
        // Handle password updates
        if (updates.password) {
            await this.secureStorage.store(`host_password_${hostId}`, updates.password);
            // Remove password from the updates object
            delete updatedHost.password;
        }
        // Handle passphrase updates
        if (updates.passphrase) {
            await this.secureStorage.store(`host_passphrase_${hostId}`, updates.passphrase);
            // Remove passphrase from the updates object
            delete updatedHost.passphrase;
        }
        if (!this.validateHostConfig(updatedHost)) {
            throw new Error('Invalid host configuration');
        }
        this.hosts[hostIndex] = updatedHost;
    }
    async deleteHost(hostId) {
        const hostIndex = this.hosts.findIndex(h => h.id === hostId);
        if (hostIndex === -1) {
            throw new Error(`Host with ID ${hostId} not found`);
        }
        // Delete any associated secure credentials
        try {
            await this.secureStorage.delete(`host_password_${hostId}`);
            await this.secureStorage.delete(`host_passphrase_${hostId}`);
        }
        catch (error) {
            console.warn('Failed to delete secure credentials:', error);
        }
        this.hosts.splice(hostIndex, 1);
    }
    async getHosts() {
        return [...this.hosts];
    }
    getHostsSync() {
        return [...this.hosts];
    }
    async getHost(hostId) {
        const host = this.hosts.find(h => h.id === hostId);
        if (!host) {
            return undefined;
        }
        // Create a copy of the host to avoid modifying the stored config
        const hostCopy = { ...host };
        // Add secure credentials if available
        if (host.authMethod === 'password') {
            const password = await this.secureStorage.retrieve(`host_password_${hostId}`);
            if (password) {
                hostCopy.password = password;
            }
        }
        if (host.authMethod === 'key') {
            const passphrase = await this.secureStorage.retrieve(`host_passphrase_${hostId}`);
            if (passphrase) {
                hostCopy.passphrase = passphrase;
            }
        }
        return hostCopy;
    }
    async getHostConfig(hostId) {
        const host = this.hosts.find(h => h.id === hostId);
        if (!host) {
            return undefined;
        }
        const config = {
            id: host.id,
            name: host.name,
            host: host.host,
            port: host.port,
            username: host.username,
            authMethod: host.authMethod,
            privateKeyPath: host.privateKeyPath,
            connectTimeout: 30000,
            maxReconnectAttempts: 5,
            reconnectBackoffFactor: 2,
            reconnectMaxDelayMs: 30000,
            reconnectInitialDelayMs: 1000
        };
        // Add secure credentials if available
        if (host.authMethod === 'password') {
            const password = await this.secureStorage.retrieve(`host_password_${hostId}`);
            if (password) {
                config.password = password;
            }
        }
        if (host.authMethod === 'key') {
            const passphrase = await this.secureStorage.retrieve(`host_passphrase_${hostId}`);
            if (passphrase) {
                config.passphrase = passphrase;
            }
        }
        return config;
    }
    validateHostConfig(host) {
        if (!host.id || !host.name || !host.host || !host.username) {
            return false;
        }
        if (host.port < 1 || host.port > 65535) {
            return false;
        }
        if (!['password', 'key', 'agent'].includes(host.authMethod)) {
            return false;
        }
        if (host.authMethod === 'key' && !host.privateKeyPath) {
            return false;
        }
        return true;
    }
    async setDefaultHost(hostId) {
        const host = this.hosts.find(h => h.id === hostId);
        if (!host) {
            throw new Error(`Host with ID ${hostId} not found`);
        }
        this.defaultHostId = hostId;
    }
    async getDefaultHost() {
        if (this.defaultHostId) {
            return await this.getHost(this.defaultHostId);
        }
        return this.hosts.length > 0 ? await this.getHost(this.hosts[0].id) : undefined;
    }
    getWorkspaceSettings() {
        return {
            defaultHostId: this.defaultHostId,
            autoConnectOnOpen: false,
            rememberLastConnection: true,
            workspaceSpecificConfig: false
        };
    }
}
(0, vitest_1.describe)('ConfigurationManager', () => {
    let configManager;
    let secureStorage;
    (0, vitest_1.beforeEach)(() => {
        // Create a new secure storage for each test
        secureStorage = new MockSecureStorage();
        // Create a new ConfigurationManager for each test
        configManager = new MockConfigurationManager(secureStorage);
    });
    (0, vitest_1.describe)('Host Configuration Management', () => {
        (0, vitest_1.it)('should save a host configuration', async () => {
            // Arrange
            const testHost = {
                id: 'test-host-1',
                name: 'Test Host',
                host: 'example.com',
                port: 22,
                username: 'testuser',
                authMethod: 'password'
            };
            // Add password to test secure storage
            const hostWithPassword = {
                ...testHost,
                password: 'test-password'
            };
            // Act
            await configManager.saveHost(hostWithPassword);
            // Verify password was stored securely
            const storedPassword = await secureStorage.retrieve(`host_password_${testHost.id}`);
            (0, vitest_1.expect)(storedPassword).toBe('test-password');
            // Verify host was added to the configuration
            const hosts = await configManager.getHosts();
            (0, vitest_1.expect)(hosts).toHaveLength(1);
            (0, vitest_1.expect)(hosts[0].id).toBe(testHost.id);
            // Verify password was not stored in the configuration
            (0, vitest_1.expect)(hosts[0].password).toBeUndefined();
        });
        (0, vitest_1.it)('should update an existing host configuration', async () => {
            // Arrange
            const testHost = {
                id: 'test-host-1',
                name: 'Test Host',
                host: 'example.com',
                port: 22,
                username: 'testuser',
                authMethod: 'password'
            };
            // Add the host first
            await configManager.saveHost(testHost);
            // Update with new values
            const updates = {
                name: 'Updated Host',
                host: 'updated.example.com',
                password: 'updated-password'
            };
            // Act
            await configManager.updateHost(testHost.id, updates);
            // Verify password was stored securely
            const storedPassword = await secureStorage.retrieve(`host_password_${testHost.id}`);
            (0, vitest_1.expect)(storedPassword).toBe('updated-password');
            // Verify host was updated in the configuration
            const hosts = await configManager.getHosts();
            (0, vitest_1.expect)(hosts).toHaveLength(1);
            (0, vitest_1.expect)(hosts[0].name).toBe('Updated Host');
            (0, vitest_1.expect)(hosts[0].host).toBe('updated.example.com');
            // Verify password was not stored in the configuration
            (0, vitest_1.expect)(hosts[0].password).toBeUndefined();
        });
        (0, vitest_1.it)('should delete a host configuration and its credentials', async () => {
            // Arrange
            const testHost = {
                id: 'test-host-1',
                name: 'Test Host',
                host: 'example.com',
                port: 22,
                username: 'testuser',
                authMethod: 'password'
            };
            // Add the host with password
            const hostWithPassword = {
                ...testHost,
                password: 'test-password'
            };
            await configManager.saveHost(hostWithPassword);
            // Verify host was added
            (0, vitest_1.expect)((await configManager.getHosts())).toHaveLength(1);
            // Act
            await configManager.deleteHost(testHost.id);
            // Verify host was removed from the configuration
            (0, vitest_1.expect)((await configManager.getHosts())).toHaveLength(0);
            // Verify password was deleted from secure storage
            const storedPassword = await secureStorage.retrieve(`host_password_${testHost.id}`);
            (0, vitest_1.expect)(storedPassword).toBeUndefined();
        });
        (0, vitest_1.it)('should retrieve a host with secure credentials', async () => {
            // Arrange
            const testHost = {
                id: 'test-host-1',
                name: 'Test Host',
                host: 'example.com',
                port: 22,
                username: 'testuser',
                authMethod: 'password'
            };
            // Add the host with password
            const hostWithPassword = {
                ...testHost,
                password: 'test-password'
            };
            await configManager.saveHost(hostWithPassword);
            // Act
            const retrievedHost = await configManager.getHost(testHost.id);
            // Assert
            (0, vitest_1.expect)(retrievedHost).toBeDefined();
            (0, vitest_1.expect)(retrievedHost?.id).toBe(testHost.id);
            (0, vitest_1.expect)(retrievedHost?.name).toBe(testHost.name);
            // Verify password was retrieved from secure storage
            (0, vitest_1.expect)(retrievedHost.password).toBe('test-password');
        });
        (0, vitest_1.it)('should validate host configurations', async () => {
            // Arrange
            const validHost = {
                id: 'test-host-1',
                name: 'Test Host',
                host: 'example.com',
                port: 22,
                username: 'testuser',
                authMethod: 'password'
            };
            const invalidHost1 = { ...validHost, port: 0 };
            const invalidHost2 = { ...validHost, authMethod: 'key' };
            const invalidHost3 = { ...validHost, id: '' };
            // Act & Assert
            (0, vitest_1.expect)(configManager.validateHostConfig(validHost)).toBe(true);
            (0, vitest_1.expect)(configManager.validateHostConfig(invalidHost1)).toBe(false);
            (0, vitest_1.expect)(configManager.validateHostConfig(invalidHost2)).toBe(false);
            (0, vitest_1.expect)(configManager.validateHostConfig(invalidHost3)).toBe(false);
            // Valid host with key and privateKeyPath
            const validKeyHost = {
                ...validHost,
                authMethod: 'key',
                privateKeyPath: '/path/to/key'
            };
            (0, vitest_1.expect)(configManager.validateHostConfig(validKeyHost)).toBe(true);
        });
        (0, vitest_1.it)('should get SSH connection config with credentials', async () => {
            // Arrange
            const testHost = {
                id: 'test-host-1',
                name: 'Test Host',
                host: 'example.com',
                port: 22,
                username: 'testuser',
                authMethod: 'password'
            };
            // Add the host with password
            const hostWithPassword = {
                ...testHost,
                password: 'test-password'
            };
            await configManager.saveHost(hostWithPassword);
            // Act
            const sshConfig = await configManager.getHostConfig(testHost.id);
            // Assert
            (0, vitest_1.expect)(sshConfig).toBeDefined();
            (0, vitest_1.expect)(sshConfig?.host).toBe(testHost.host);
            (0, vitest_1.expect)(sshConfig?.port).toBe(testHost.port);
            (0, vitest_1.expect)(sshConfig?.username).toBe(testHost.username);
            (0, vitest_1.expect)(sshConfig?.authMethod).toBe(testHost.authMethod);
            // Verify password was included in the SSH config
            (0, vitest_1.expect)(sshConfig?.password).toBe('test-password');
            // Verify connection settings were included
            (0, vitest_1.expect)(sshConfig?.connectTimeout).toBeDefined();
            (0, vitest_1.expect)(sshConfig?.maxReconnectAttempts).toBeDefined();
        });
    });
    (0, vitest_1.describe)('Default Host Management', () => {
        (0, vitest_1.it)('should set and get the default host', async () => {
            // Arrange
            const testHost1 = {
                id: 'test-host-1',
                name: 'Test Host 1',
                host: 'example1.com',
                port: 22,
                username: 'testuser1',
                authMethod: 'password'
            };
            const testHost2 = {
                id: 'test-host-2',
                name: 'Test Host 2',
                host: 'example2.com',
                port: 22,
                username: 'testuser2',
                authMethod: 'password'
            };
            // Add the hosts
            await configManager.saveHost(testHost1);
            await configManager.saveHost(testHost2);
            // Act
            await configManager.setDefaultHost(testHost2.id);
            const defaultHost = await configManager.getDefaultHost();
            // Assert
            (0, vitest_1.expect)(defaultHost).toBeDefined();
            (0, vitest_1.expect)(defaultHost?.id).toBe(testHost2.id);
            // Verify workspace settings were updated
            (0, vitest_1.expect)(configManager.getWorkspaceSettings().defaultHostId).toBe(testHost2.id);
        });
    });
});
//# sourceMappingURL=configuration-manager.test.js.map