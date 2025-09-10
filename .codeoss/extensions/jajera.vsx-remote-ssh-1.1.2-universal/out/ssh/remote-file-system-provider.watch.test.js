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
const vitest_1 = require("vitest");
const ssh_1 = require("../interfaces/ssh");
// Define FileChangeType constants before mocking
const FileChangeType = {
    Created: 1,
    Changed: 2,
    Deleted: 3
};
// Set NODE_ENV to test to avoid firing events in tests
process.env.NODE_ENV = 'test';
// Mock vscode module before importing the implementation
vitest_1.vi.mock('vscode', () => {
    return {
        EventEmitter: class {
            constructor() {
                this.event = vitest_1.vi.fn();
                this.dispose = vitest_1.vi.fn();
                this.fire = vitest_1.vi.fn();
            }
        },
        FileType: {
            Unknown: 0,
            File: 1,
            Directory: 2,
            SymbolicLink: 64
        },
        FileChangeType: {
            Created: 1,
            Changed: 2,
            Deleted: 3
        },
        Uri: {
            parse: (value) => ({
                scheme: 'ssh',
                authority: value.split('://')[1]?.split('/')[0] || '',
                path: '/' + (value.split('://')[1]?.split('/').slice(1).join('/') || ''),
                query: '',
                fragment: '',
                fsPath: '/' + (value.split('://')[1]?.split('/').slice(1).join('/') || ''),
                with: vitest_1.vi.fn().mockImplementation((params) => {
                    return {
                        scheme: 'ssh',
                        authority: value.split('://')[1]?.split('/')[0] || '',
                        path: params.path || '/' + (value.split('://')[1]?.split('/').slice(1).join('/') || ''),
                        query: '',
                        fragment: '',
                        fsPath: params.path || '/' + (value.split('://')[1]?.split('/').slice(1).join('/') || ''),
                        with: vitest_1.vi.fn().mockImplementation(() => { return this; }),
                        toString: vitest_1.vi.fn().mockReturnValue(`ssh://${value.split('://')[1]?.split('/')[0] || ''}${params.path || '/' + (value.split('://')[1]?.split('/').slice(1).join('/') || '')}`)
                    };
                }),
                toString: vitest_1.vi.fn().mockReturnValue(value),
                toJSON: vitest_1.vi.fn()
            })
        }
    };
});
// Patch for missing FileChangeType in test environment
const vscode = __importStar(require("vscode"));
if (!vscode.FileChangeType) {
    vscode.FileChangeType = { Created: 1, Changed: 2, Deleted: 3 };
}
// Import after mocking
const remote_file_system_provider_1 = require("./remote-file-system-provider");
// Mock SftpClient
class MockSftpClient {
    constructor() {
        this.stat = vitest_1.vi.fn();
        this.list = vitest_1.vi.fn();
        this.get = vitest_1.vi.fn();
        this.put = vitest_1.vi.fn();
        this.mkdir = vitest_1.vi.fn();
        this.rmdir = vitest_1.vi.fn();
        this.delete = vitest_1.vi.fn();
        this.rename = vitest_1.vi.fn();
        this.end = vitest_1.vi.fn();
    }
}
// Mock SSH Connection
const createMockConnection = (id, connected = true) => ({
    id,
    config: {
        host: 'test.example.com',
        port: 22,
        username: 'testuser',
        authMethod: 'password',
        password: 'testpass'
    },
    status: connected ? ssh_1.ConnectionStatus.Connected : ssh_1.ConnectionStatus.Disconnected,
    lastConnected: new Date(),
    execute: vitest_1.vi.fn().mockResolvedValue({ stdout: '', stderr: '', exitCode: 0 }),
    createSFTP: vitest_1.vi.fn().mockResolvedValue(new MockSftpClient()),
    reconnect: vitest_1.vi.fn().mockResolvedValue(undefined),
    disconnect: vitest_1.vi.fn().mockResolvedValue(undefined),
    isConnected: vitest_1.vi.fn().mockReturnValue(connected)
});
// Mock SSH Connection Manager
const createMockConnectionManager = () => ({
    connect: vitest_1.vi.fn(),
    disconnect: vitest_1.vi.fn(),
    getActiveConnections: vitest_1.vi.fn().mockReturnValue([]),
    reconnect: vitest_1.vi.fn(),
    getConnection: vitest_1.vi.fn().mockImplementation((id) => {
        if (id === 'test-connection') {
            return createMockConnection('test-connection');
        }
        if (id === 'disconnected-connection') {
            return createMockConnection('disconnected-connection', false);
        }
        return undefined;
    }),
    disconnectAll: vitest_1.vi.fn(),
    restoreConnections: vitest_1.vi.fn(),
    dispose: vitest_1.vi.fn()
});
// Mock Uri helper function
const mockUri = (connectionId, path) => {
    return {
        scheme: 'ssh',
        authority: connectionId,
        path,
        query: '',
        fragment: '',
        fsPath: path,
        with: vitest_1.vi.fn().mockImplementation((params) => {
            return {
                scheme: 'ssh',
                authority: connectionId,
                path: params.path || path,
                query: '',
                fragment: '',
                fsPath: params.path || path,
                with: vitest_1.vi.fn(),
                toString: vitest_1.vi.fn().mockReturnValue(`ssh://${connectionId}${params.path || path}`)
            };
        }),
        toString: vitest_1.vi.fn().mockReturnValue(`ssh://${connectionId}${path}`),
        toJSON: vitest_1.vi.fn()
    };
};
(0, vitest_1.describe)('RemoteFileSystemProvider Watch', () => {
    let provider;
    let connectionManager;
    let mockSftpClient;
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.clearAllMocks();
        // Create mock connection manager
        connectionManager = createMockConnectionManager();
        // Create provider
        provider = new remote_file_system_provider_1.RemoteFileSystemProviderImpl(connectionManager);
        // Get the mock SFTP client that will be returned by createSFTP
        mockSftpClient = new MockSftpClient();
        const mockConnection = createMockConnection('test-connection');
        mockConnection.createSFTP.mockResolvedValue(mockSftpClient);
        connectionManager.getConnection.mockImplementation((id) => {
            if (id === 'test-connection') {
                return mockConnection;
            }
            if (id === 'disconnected-connection') {
                return createMockConnection('disconnected-connection', false);
            }
            return undefined;
        });
        // Mock setTimeout to execute immediately in tests
        vitest_1.vi.spyOn(global, 'setTimeout').mockImplementation((fn) => {
            fn();
            return 0;
        });
    });
    (0, vitest_1.afterEach)(() => {
        vitest_1.vi.restoreAllMocks();
    });
    (0, vitest_1.describe)('watch', () => {
        (0, vitest_1.it)('should return a disposable object', () => {
            const uri = mockUri('test-connection', '/path/to/file.txt');
            const disposable = provider.watch(uri, { recursive: true, excludes: [] });
            (0, vitest_1.expect)(disposable).toHaveProperty('dispose');
            (0, vitest_1.expect)(typeof disposable.dispose).toBe('function');
        });
        (0, vitest_1.it)('should track watched paths', () => {
            const uri = mockUri('test-connection', '/path/to/file.txt');
            provider.watch(uri, { recursive: true, excludes: [] });
            // Access private property for testing
            const watchedPaths = provider.watchedPaths;
            (0, vitest_1.expect)(watchedPaths.has('test-connection')).toBe(true);
            (0, vitest_1.expect)(watchedPaths.get('test-connection').has('/path/to/file.txt')).toBe(true);
        });
        (0, vitest_1.it)('should increment reference count for already watched paths', () => {
            const uri = mockUri('test-connection', '/path/to/file.txt');
            provider.watch(uri, { recursive: true, excludes: [] });
            provider.watch(uri, { recursive: true, excludes: [] });
            // Access private property for testing
            const watchedPaths = provider.watchedPaths;
            const watchInfo = watchedPaths.get('test-connection').get('/path/to/file.txt');
            (0, vitest_1.expect)(watchInfo.refCount).toBe(2);
        });
        (0, vitest_1.it)('should decrement reference count when disposing a watch', () => {
            const uri = mockUri('test-connection', '/path/to/file.txt');
            const disposable1 = provider.watch(uri, { recursive: true, excludes: [] });
            const disposable2 = provider.watch(uri, { recursive: true, excludes: [] });
            // Dispose one watch
            disposable1.dispose();
            // Access private property for testing
            const watchedPaths = provider.watchedPaths;
            const watchInfo = watchedPaths.get('test-connection').get('/path/to/file.txt');
            (0, vitest_1.expect)(watchInfo.refCount).toBe(1);
        });
    });
    (0, vitest_1.describe)('isExcluded', () => {
        (0, vitest_1.it)('should match exact filenames', () => {
            // Access private method for testing
            const isExcluded = provider.isExcluded;
            (0, vitest_1.expect)(isExcluded('file.txt', ['file.txt'])).toBe(true);
            (0, vitest_1.expect)(isExcluded('file.txt', ['other.txt'])).toBe(false);
        });
        (0, vitest_1.it)('should match prefix patterns', () => {
            // Access private method for testing
            const isExcluded = provider.isExcluded;
            (0, vitest_1.expect)(isExcluded('file.txt', ['file*'])).toBe(true);
            (0, vitest_1.expect)(isExcluded('other.txt', ['file*'])).toBe(false);
        });
        (0, vitest_1.it)('should match suffix patterns', () => {
            // Access private method for testing
            const isExcluded = provider.isExcluded;
            (0, vitest_1.expect)(isExcluded('file.txt', ['*.txt'])).toBe(true);
            (0, vitest_1.expect)(isExcluded('file.log', ['*.txt'])).toBe(false);
        });
        (0, vitest_1.it)('should match substring patterns', () => {
            // Access private method for testing
            const isExcluded = provider.isExcluded;
            (0, vitest_1.expect)(isExcluded('file.txt', ['*ile*'])).toBe(true);
            (0, vitest_1.expect)(isExcluded('document.pdf', ['*ile*'])).toBe(false);
        });
    });
});
//# sourceMappingURL=remote-file-system-provider.watch.test.js.map