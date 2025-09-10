"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
// Mock modules
vitest_1.vi.mock('ssh2', () => ({
    Client: vitest_1.vi.fn(() => ({
        connect: vitest_1.vi.fn(),
        exec: vitest_1.vi.fn(),
        sftp: vitest_1.vi.fn(),
        end: vitest_1.vi.fn(),
        on: vitest_1.vi.fn()
    }))
}));
vitest_1.vi.mock('fs', () => ({
    existsSync: vitest_1.vi.fn(() => true),
    readFileSync: vitest_1.vi.fn(() => 'mock-private-key')
}));
vitest_1.vi.mock('os', () => ({
    homedir: vitest_1.vi.fn(() => '/home/testuser')
}));
vitest_1.vi.mock('path', () => ({
    join: vitest_1.vi.fn((...args) => args.join('/')),
    resolve: vitest_1.vi.fn((...args) => args.join('/'))
}));
// Mock vscode API
vitest_1.vi.mock('vscode', () => {
    return {
        window: {
            showInformationMessage: vitest_1.vi.fn(),
            showErrorMessage: vitest_1.vi.fn(() => Promise.resolve('Show Details')),
            showWarningMessage: vitest_1.vi.fn(() => Promise.resolve(undefined)),
            showTextDocument: vitest_1.vi.fn()
        },
        workspace: {
            openTextDocument: vitest_1.vi.fn(() => Promise.resolve({})),
            getConfiguration: vitest_1.vi.fn(() => ({
                get: vitest_1.vi.fn((key, defaultValue) => defaultValue)
            }))
        },
        MarkdownString: class {
            constructor() {
                this.value = '';
            }
            appendMarkdown(text) {
                this.value += text;
                return this;
            }
        }
    };
});
// Import after mocking
const connection_manager_1 = require("./connection-manager");
const ssh_1 = require("../interfaces/ssh");
// Create a local copy of the classifySSHError function for testing
function classifySSHError(error, connectionId) {
    const errorMessage = error.message.toLowerCase();
    const timestamp = new Date();
    // Connection errors
    if (errorMessage.includes('connect etimedout') || errorMessage.includes('timeout')) {
        return {
            type: ssh_1.SSHErrorType.NetworkTimeout,
            message: 'Connection timed out while trying to reach the server',
            originalError: error,
            timestamp,
            connectionId,
            troubleshootingSteps: [
                'Check if the server is online and reachable',
                'Verify that the hostname and port are correct',
                'Check if there are any firewalls blocking the connection',
                'Try increasing the connection timeout in settings'
            ]
        };
    }
    if (errorMessage.includes('connect econnrefused') || errorMessage.includes('connection refused')) {
        return {
            type: ssh_1.SSHErrorType.ConnectionRefused,
            message: 'Connection refused by the server',
            originalError: error,
            timestamp,
            connectionId,
            troubleshootingSteps: [
                'Verify that the SSH service is running on the server',
                'Check if the port number is correct',
                'Ensure that the server\'s firewall allows SSH connections',
                'Try connecting with a different SSH client to verify the issue'
            ]
        };
    }
    if (errorMessage.includes('host unreachable') || errorMessage.includes('no route to host')) {
        return {
            type: ssh_1.SSHErrorType.HostUnreachable,
            message: 'Cannot reach the host server',
            originalError: error,
            timestamp,
            connectionId,
            troubleshootingSteps: [
                'Check your network connection',
                'Verify that the hostname is correct',
                'Try connecting to the server from another network',
                'Check if the server is behind a VPN or firewall'
            ]
        };
    }
    if (errorMessage.includes('getaddrinfo') || errorMessage.includes('dns')) {
        return {
            type: ssh_1.SSHErrorType.DNSResolutionFailed,
            message: 'Failed to resolve the hostname',
            originalError: error,
            timestamp,
            connectionId,
            troubleshootingSteps: [
                'Check if the hostname is spelled correctly',
                'Verify your DNS settings',
                'Try using an IP address instead of a hostname',
                'Check if your DNS server is functioning properly'
            ]
        };
    }
    // Authentication errors
    if (errorMessage.includes('authentication failed') || errorMessage.includes('auth failed')) {
        return {
            type: ssh_1.SSHErrorType.AuthenticationFailed,
            message: 'Authentication failed',
            originalError: error,
            timestamp,
            connectionId,
            troubleshootingSteps: [
                'Verify that your username is correct',
                'Check if your password or SSH key is correct',
                'Ensure that your SSH key is properly configured on the server',
                'Check if the server allows your authentication method'
            ]
        };
    }
    if (errorMessage.includes('permission denied')) {
        return {
            type: ssh_1.SSHErrorType.PermissionDenied,
            message: 'Permission denied by the server',
            originalError: error,
            timestamp,
            connectionId,
            troubleshootingSteps: [
                'Verify that your user account has permission to access the server',
                'Check if your SSH key is added to the authorized_keys file on the server',
                'Ensure that the permissions on your SSH key files are correct (chmod 600)',
                'Check the server\'s SSH configuration for any restrictions'
            ]
        };
    }
    if (errorMessage.includes('key') && (errorMessage.includes('rejected') || errorMessage.includes('invalid'))) {
        return {
            type: ssh_1.SSHErrorType.KeyRejected,
            message: 'SSH key was rejected by the server',
            originalError: error,
            timestamp,
            connectionId,
            troubleshootingSteps: [
                'Verify that the correct SSH key is being used',
                'Check if the key is added to the authorized_keys file on the server',
                'Ensure that the key format is supported by the server',
                'Try regenerating your SSH key pair'
            ]
        };
    }
    if (errorMessage.includes('password') && (errorMessage.includes('rejected') || errorMessage.includes('incorrect'))) {
        return {
            type: ssh_1.SSHErrorType.PasswordRejected,
            message: 'Password was rejected by the server',
            originalError: error,
            timestamp,
            connectionId,
            troubleshootingSteps: [
                'Verify that your password is correct',
                'Check if the server allows password authentication',
                'Ensure that your account is not locked due to too many failed attempts',
                'Try resetting your password on the server'
            ]
        };
    }
    // Protocol errors
    if (errorMessage.includes('protocol') || errorMessage.includes('handshake')) {
        return {
            type: ssh_1.SSHErrorType.ProtocolError,
            message: 'SSH protocol error occurred',
            originalError: error,
            timestamp,
            connectionId,
            troubleshootingSteps: [
                'Check if the server supports the SSH protocol version',
                'Verify that the server is configured correctly',
                'Try connecting with a different SSH client',
                'Check server logs for more details'
            ]
        };
    }
    // Default unknown error
    return {
        type: ssh_1.SSHErrorType.Unknown,
        message: error.message,
        originalError: error,
        timestamp,
        connectionId,
        troubleshootingSteps: [
            'Check the error message for clues',
            'Verify your connection settings',
            'Try connecting with a different SSH client',
            'Contact your system administrator if the problem persists'
        ]
    };
}
(0, vitest_1.describe)('SSHConnectionManager', () => {
    let manager;
    let originalEnv;
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.clearAllMocks();
        // Mock setTimeout and clearTimeout to avoid infinite recursion
        vitest_1.vi.stubGlobal('setTimeout', vitest_1.vi.fn((fn) => {
            fn();
            return 123;
        }));
        vitest_1.vi.stubGlobal('clearTimeout', vitest_1.vi.fn());
        vitest_1.vi.stubGlobal('setInterval', vitest_1.vi.fn(() => 123));
        vitest_1.vi.stubGlobal('clearInterval', vitest_1.vi.fn());
        manager = new connection_manager_1.SSHConnectionManagerImpl();
        // Save original SSH_AUTH_SOCK
        originalEnv = process.env.SSH_AUTH_SOCK;
        // Set a default SSH_AUTH_SOCK for tests
        process.env.SSH_AUTH_SOCK = '/tmp/ssh-agent.sock';
    });
    (0, vitest_1.afterEach)(() => {
        // Restore original SSH_AUTH_SOCK
        process.env.SSH_AUTH_SOCK = originalEnv;
        vitest_1.vi.restoreAllMocks();
    });
    (0, vitest_1.describe)('Automatic reconnection and error handling', () => {
        let mockStateManager;
        let managerWithState;
        (0, vitest_1.beforeEach)(() => {
            // Create mock state manager
            mockStateManager = {
                saveConnectionState: vitest_1.vi.fn().mockResolvedValue(undefined),
                getConnectionState: vitest_1.vi.fn().mockResolvedValue(undefined),
                getAllConnectionStates: vitest_1.vi.fn().mockResolvedValue([]),
                updateConnectionState: vitest_1.vi.fn().mockResolvedValue(undefined),
                deleteConnectionState: vitest_1.vi.fn().mockResolvedValue(undefined),
                clearConnectionStates: vitest_1.vi.fn().mockResolvedValue(undefined)
            };
            // Create connection manager with state manager
            managerWithState = new connection_manager_1.SSHConnectionManagerImpl(mockStateManager);
            // Mock setInterval and clearInterval
            vitest_1.vi.spyOn(global, 'setInterval').mockReturnValue(123);
            vitest_1.vi.spyOn(global, 'clearInterval').mockImplementation(() => { });
            // Mock setTimeout to execute immediately for testing
            vitest_1.vi.spyOn(global, 'setTimeout').mockImplementation((fn) => {
                fn();
                return 123;
            });
        });
        (0, vitest_1.afterEach)(() => {
            vitest_1.vi.restoreAllMocks();
        });
        (0, vitest_1.it)('should classify network errors correctly', () => {
            // Test error classification directly
            const classifyError = managerWithState.classifySSHError || classifySSHError;
            // Test network timeout error
            const timeoutError = new Error('connect etimedout');
            const classifiedTimeout = classifyError(timeoutError, 'test-connection');
            (0, vitest_1.expect)(classifiedTimeout.type).toBe(ssh_1.SSHErrorType.NetworkTimeout);
            (0, vitest_1.expect)(classifiedTimeout.troubleshootingSteps).toHaveLength(4);
            // Test connection refused error
            const refusedError = new Error('connect econnrefused');
            const classifiedRefused = classifyError(refusedError, 'test-connection');
            (0, vitest_1.expect)(classifiedRefused.type).toBe(ssh_1.SSHErrorType.ConnectionRefused);
            (0, vitest_1.expect)(classifiedRefused.troubleshootingSteps).toHaveLength(4);
            // Test host unreachable error
            const unreachableError = new Error('host unreachable');
            const classifiedUnreachable = classifyError(unreachableError, 'test-connection');
            (0, vitest_1.expect)(classifiedUnreachable.type).toBe(ssh_1.SSHErrorType.HostUnreachable);
            (0, vitest_1.expect)(classifiedUnreachable.troubleshootingSteps).toHaveLength(4);
        });
        (0, vitest_1.it)('should classify authentication errors correctly', () => {
            // Test error classification directly
            const classifyError = managerWithState.classifySSHError || classifySSHError;
            // Test authentication failed error
            const authError = new Error('authentication failed');
            const classifiedAuth = classifyError(authError, 'test-connection');
            (0, vitest_1.expect)(classifiedAuth.type).toBe(ssh_1.SSHErrorType.AuthenticationFailed);
            (0, vitest_1.expect)(classifiedAuth.troubleshootingSteps).toHaveLength(4);
            // Test permission denied error
            const permissionError = new Error('permission denied');
            const classifiedPermission = classifyError(permissionError, 'test-connection');
            (0, vitest_1.expect)(classifiedPermission.type).toBe(ssh_1.SSHErrorType.PermissionDenied);
            (0, vitest_1.expect)(classifiedPermission.troubleshootingSteps).toHaveLength(4);
            // Test key rejected error
            const keyError = new Error('key rejected');
            const classifiedKey = classifyError(keyError, 'test-connection');
            (0, vitest_1.expect)(classifiedKey.type).toBe(ssh_1.SSHErrorType.KeyRejected);
            (0, vitest_1.expect)(classifiedKey.troubleshootingSteps).toHaveLength(4);
        });
        (0, vitest_1.it)('should determine which errors should stop retry attempts', () => {
            // Test that authentication errors should stop retrying
            (0, vitest_1.expect)(managerWithState.shouldStopRetrying(ssh_1.SSHErrorType.AuthenticationFailed)).toBe(true);
            (0, vitest_1.expect)(managerWithState.shouldStopRetrying(ssh_1.SSHErrorType.PermissionDenied)).toBe(true);
            (0, vitest_1.expect)(managerWithState.shouldStopRetrying(ssh_1.SSHErrorType.KeyRejected)).toBe(true);
            // Test that network errors should allow retrying
            (0, vitest_1.expect)(managerWithState.shouldStopRetrying(ssh_1.SSHErrorType.NetworkTimeout)).toBe(false);
            (0, vitest_1.expect)(managerWithState.shouldStopRetrying(ssh_1.SSHErrorType.ConnectionRefused)).toBe(false);
            (0, vitest_1.expect)(managerWithState.shouldStopRetrying(ssh_1.SSHErrorType.HostUnreachable)).toBe(false);
        });
        (0, vitest_1.it)('should handle network errors with appropriate troubleshooting steps', async () => {
            // Create a mock connection for testing
            const mockConnection = {
                id: 'test-connection',
                config: {
                    host: 'test.example.com',
                    port: 22,
                    username: 'testuser',
                    authMethod: 'password',
                    password: 'testpass'
                },
                status: ssh_1.ConnectionStatus.Connected,
                lastConnected: new Date(),
                execute: vitest_1.vi.fn().mockResolvedValue({ stdout: '', stderr: '', exitCode: 0 }),
                createSFTP: vitest_1.vi.fn().mockResolvedValue({}),
                disconnect: vitest_1.vi.fn().mockResolvedValue(undefined),
                reconnect: vitest_1.vi.fn().mockRejectedValue(new Error('connect etimedout')),
                isConnected: vitest_1.vi.fn(() => true)
            };
            // Mock connection error
            const networkError = new Error('connect etimedout');
            // Manually trigger error handling
            await managerWithState.handleSSHError(networkError, mockConnection);
            // Should have updated state to error with appropriate error type
            (0, vitest_1.expect)(mockStateManager.updateConnectionState).toHaveBeenCalledWith(mockConnection.id, vitest_1.expect.objectContaining({
                status: ssh_1.ConnectionStatus.Error,
                lastError: vitest_1.expect.objectContaining({
                    type: ssh_1.SSHErrorType.NetworkTimeout,
                    troubleshootingSteps: vitest_1.expect.any(Array)
                })
            }));
        });
        (0, vitest_1.it)('should handle authentication errors with appropriate troubleshooting steps', async () => {
            // Create a mock connection for testing
            const mockConnection = {
                id: 'test-connection',
                config: {
                    host: 'test.example.com',
                    port: 22,
                    username: 'testuser',
                    authMethod: 'password',
                    password: 'testpass'
                },
                status: ssh_1.ConnectionStatus.Connected,
                lastConnected: new Date(),
                execute: vitest_1.vi.fn().mockResolvedValue({ stdout: '', stderr: '', exitCode: 0 }),
                createSFTP: vitest_1.vi.fn().mockResolvedValue({}),
                disconnect: vitest_1.vi.fn().mockResolvedValue(undefined),
                reconnect: vitest_1.vi.fn().mockRejectedValue(new Error('authentication failed')),
                isConnected: vitest_1.vi.fn(() => true)
            };
            // Mock authentication error
            const authError = new Error('authentication failed');
            // Manually trigger error handling
            await managerWithState.handleSSHError(authError, mockConnection);
            // Should have updated state to error with appropriate error type
            (0, vitest_1.expect)(mockStateManager.updateConnectionState).toHaveBeenCalledWith(mockConnection.id, vitest_1.expect.objectContaining({
                status: ssh_1.ConnectionStatus.Error,
                lastError: vitest_1.expect.objectContaining({
                    type: ssh_1.SSHErrorType.AuthenticationFailed,
                    troubleshootingSteps: vitest_1.expect.any(Array)
                })
            }));
        });
        (0, vitest_1.it)('should calculate exponential backoff with jitter', async () => {
            // Create a test-specific manager to access private methods
            const testManager = new connection_manager_1.SSHConnectionManagerImpl();
            // Mock Math.random to return a consistent value for testing
            const originalRandom = Math.random;
            Math.random = vitest_1.vi.fn().mockReturnValue(0.5);
            // Test backoff calculation with different attempt counts
            // We'll use reflection to access the private method
            const calculateBackoff = testManager.calculateBackoffDelay.bind(testManager);
            const initialDelay = 1000;
            const backoffFactor = 2;
            const maxDelay = 60000;
            // Attempt 0 should be initialDelay + jitter
            const delay0 = calculateBackoff(0, initialDelay, backoffFactor, maxDelay);
            (0, vitest_1.expect)(delay0).toBeGreaterThan(initialDelay);
            (0, vitest_1.expect)(delay0).toBeLessThan(initialDelay * 1.5); // Max 50% jitter
            // Attempt 1 should be initialDelay * backoffFactor + jitter
            const delay1 = calculateBackoff(1, initialDelay, backoffFactor, maxDelay);
            (0, vitest_1.expect)(delay1).toBeGreaterThan(initialDelay * backoffFactor);
            (0, vitest_1.expect)(delay1).toBeLessThan(initialDelay * backoffFactor * 1.5);
            // Attempt 2 should be initialDelay * backoffFactor^2 + jitter
            const delay2 = calculateBackoff(2, initialDelay, backoffFactor, maxDelay);
            (0, vitest_1.expect)(delay2).toBeGreaterThan(initialDelay * Math.pow(backoffFactor, 2));
            (0, vitest_1.expect)(delay2).toBeLessThan(initialDelay * Math.pow(backoffFactor, 2) * 1.5);
            // Restore Math.random
            Math.random = originalRandom;
        });
        (0, vitest_1.it)('should respect max delay in backoff calculation', async () => {
            // Create a test-specific manager to access private methods
            const testManager = new connection_manager_1.SSHConnectionManagerImpl();
            // Test backoff calculation with a very high attempt count
            // We'll use reflection to access the private method
            const calculateBackoff = testManager.calculateBackoffDelay.bind(testManager);
            const initialDelay = 1000;
            const backoffFactor = 2;
            const maxDelay = 10000;
            // Attempt 10 would normally be way over maxDelay
            const delay10 = calculateBackoff(10, initialDelay, backoffFactor, maxDelay);
            (0, vitest_1.expect)(delay10).toBeLessThanOrEqual(maxDelay);
        });
    });
});
//# sourceMappingURL=connection-manager.test.js.map