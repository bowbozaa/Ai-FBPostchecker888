"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const secure_storage_1 = require("./secure-storage");
// Mock VS Code API
const mockSecretStorage = {
    store: vitest_1.vi.fn(),
    get: vitest_1.vi.fn(),
    delete: vitest_1.vi.fn()
};
const mockContext = {
    secrets: mockSecretStorage
};
(0, vitest_1.describe)('VSCodeSecureStorage', () => {
    let secureStorage;
    (0, vitest_1.beforeEach)(() => {
        // Reset mocks
        vitest_1.vi.resetAllMocks();
        // Create a new secure storage for each test
        secureStorage = new secure_storage_1.VSCodeSecureStorage(mockContext);
    });
    (0, vitest_1.it)('should store a value securely', async () => {
        // Arrange
        const key = 'test-key';
        const value = 'test-value';
        mockSecretStorage.store.mockResolvedValue(undefined);
        // Act
        await secureStorage.store(key, value);
        // Assert
        (0, vitest_1.expect)(mockSecretStorage.store).toHaveBeenCalledWith('vsx-remote-ssh-test-key', value);
    });
    (0, vitest_1.it)('should retrieve a stored value', async () => {
        // Arrange
        const key = 'test-key';
        const value = 'test-value';
        mockSecretStorage.get.mockResolvedValue(value);
        // Act
        const result = await secureStorage.retrieve(key);
        // Assert
        (0, vitest_1.expect)(mockSecretStorage.get).toHaveBeenCalledWith('vsx-remote-ssh-test-key');
        (0, vitest_1.expect)(result).toBe(value);
    });
    (0, vitest_1.it)('should delete a stored value', async () => {
        // Arrange
        const key = 'test-key';
        mockSecretStorage.delete.mockResolvedValue(undefined);
        // Act
        await secureStorage.delete(key);
        // Assert
        (0, vitest_1.expect)(mockSecretStorage.delete).toHaveBeenCalledWith('vsx-remote-ssh-test-key');
    });
    (0, vitest_1.it)('should handle undefined when retrieving non-existent value', async () => {
        // Arrange
        const key = 'non-existent-key';
        mockSecretStorage.get.mockResolvedValue(undefined);
        // Act
        const result = await secureStorage.retrieve(key);
        // Assert
        (0, vitest_1.expect)(result).toBeUndefined();
    });
});
//# sourceMappingURL=secure-storage.test.js.map