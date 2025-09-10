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
                this.fire = vitest_1.vi.fn();
                this.dispose = vitest_1.vi.fn();
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
                with: vitest_1.vi.fn().mockReturnThis(),
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
        with: vitest_1.vi.fn().mockReturnThis(),
        toString: vitest_1.vi.fn().mockReturnValue(`ssh://${connectionId}${path}`),
        toJSON: vitest_1.vi.fn()
    };
};
(0, vitest_1.describe)('RemoteFileSystemProvider', () => {
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
    });
    (0, vitest_1.afterEach)(() => {
        vitest_1.vi.restoreAllMocks();
    });
    (0, vitest_1.describe)('readFile', () => {
        (0, vitest_1.it)('should read a file successfully', async () => {
            // Setup mock responses
            const fileContent = Buffer.from('file content');
            mockSftpClient.stat.mockResolvedValue({ isDirectory: false, isFile: true, size: fileContent.length, mtime: Date.now() / 1000 });
            mockSftpClient.get.mockResolvedValue(fileContent);
            // Call the method
            const uri = mockUri('test-connection', '/path/to/file.txt');
            const result = await provider.readFile(uri);
            // Verify results
            (0, vitest_1.expect)(mockSftpClient.stat).toHaveBeenCalledWith('/path/to/file.txt');
            (0, vitest_1.expect)(mockSftpClient.get).toHaveBeenCalledWith('/path/to/file.txt');
            (0, vitest_1.expect)(result).toEqual(new Uint8Array(fileContent));
        });
        (0, vitest_1.it)('should throw FileNotFound for non-existent files', async () => {
            // Setup mock responses
            mockSftpClient.stat.mockRejectedValue({ code: 'ENOENT' });
            // Call the method and expect error
            const uri = mockUri('test-connection', '/path/to/nonexistent.txt');
            await (0, vitest_1.expect)(provider.readFile(uri)).rejects.toMatchObject({
                code: 'FileNotFound',
                message: vitest_1.expect.stringContaining('File not found')
            });
        });
        (0, vitest_1.it)('should throw error when trying to read a directory as file', async () => {
            // Setup mock responses
            mockSftpClient.stat.mockResolvedValue({ isDirectory: true, isFile: false, size: 0, mtime: Date.now() / 1000 });
            // Call the method and expect error
            const uri = mockUri('test-connection', '/path/to/directory');
            await (0, vitest_1.expect)(provider.readFile(uri)).rejects.toMatchObject({
                code: 'FileNotFound',
                message: vitest_1.expect.stringContaining('Cannot read directory as file')
            });
        });
    });
    (0, vitest_1.describe)('writeFile', () => {
        (0, vitest_1.it)('should write a file successfully', async () => {
            // Setup mock responses
            mockSftpClient.stat.mockRejectedValue({ code: 'ENOENT' }); // File doesn't exist
            mockSftpClient.put.mockResolvedValue(undefined);
            mockSftpClient.mkdir.mockResolvedValue(undefined);
            // Call the method
            const uri = mockUri('test-connection', '/path/to/file.txt');
            const content = new Uint8Array(Buffer.from('new content'));
            await provider.writeFile(uri, content, { create: true, overwrite: false });
            // Verify results
            (0, vitest_1.expect)(mockSftpClient.put).toHaveBeenCalledWith(vitest_1.expect.any(Buffer), '/path/to/file.txt');
        });
        (0, vitest_1.it)('should overwrite an existing file when overwrite is true', async () => {
            // Setup mock responses
            mockSftpClient.stat.mockResolvedValue({ isDirectory: false, isFile: true, size: 100, mtime: Date.now() / 1000 });
            mockSftpClient.put.mockResolvedValue(undefined);
            // Call the method
            const uri = mockUri('test-connection', '/path/to/file.txt');
            const content = new Uint8Array(Buffer.from('updated content'));
            await provider.writeFile(uri, content, { create: true, overwrite: true });
            // Verify results
            (0, vitest_1.expect)(mockSftpClient.put).toHaveBeenCalledWith(vitest_1.expect.any(Buffer), '/path/to/file.txt');
        });
        (0, vitest_1.it)('should throw FileExists when overwrite is false and file exists', async () => {
            // Setup mock responses
            mockSftpClient.stat.mockResolvedValue({ isDirectory: false, isFile: true, size: 100, mtime: Date.now() / 1000 });
            // Call the method and expect error
            const uri = mockUri('test-connection', '/path/to/file.txt');
            const content = new Uint8Array(Buffer.from('updated content'));
            await (0, vitest_1.expect)(provider.writeFile(uri, content, { create: false, overwrite: false })).rejects.toMatchObject({
                code: 'FileExists',
                message: vitest_1.expect.stringContaining('File already exists')
            });
            // Verify put was not called
            (0, vitest_1.expect)(mockSftpClient.put).not.toHaveBeenCalled();
        });
        (0, vitest_1.it)('should throw FileNotFound when create is false and file does not exist', async () => {
            // Setup mock responses
            mockSftpClient.stat.mockRejectedValue({ code: 'ENOENT' }); // File doesn't exist
            // Call the method and expect error
            const uri = mockUri('test-connection', '/path/to/nonexistent.txt');
            const content = new Uint8Array(Buffer.from('new content'));
            await (0, vitest_1.expect)(provider.writeFile(uri, content, { create: false, overwrite: false })).rejects.toMatchObject({
                code: 'FileNotFound',
                message: vitest_1.expect.stringContaining('File not found')
            });
            // Verify put was not called
            (0, vitest_1.expect)(mockSftpClient.put).not.toHaveBeenCalled();
        });
    });
    (0, vitest_1.describe)('createDirectory', () => {
        (0, vitest_1.it)('should create a directory successfully', async () => {
            // Setup mock responses
            mockSftpClient.stat.mockRejectedValue({ code: 'ENOENT' }); // Directory doesn't exist
            mockSftpClient.mkdir.mockResolvedValue(undefined);
            // Call the method
            const uri = mockUri('test-connection', '/path/to/new-directory');
            await provider.createDirectory(uri);
            // Verify results
            (0, vitest_1.expect)(mockSftpClient.mkdir).toHaveBeenCalledWith('/path/to/new-directory', true);
        });
        (0, vitest_1.it)('should do nothing if directory already exists', async () => {
            // Setup mock responses
            mockSftpClient.stat.mockResolvedValue({ isDirectory: true, isFile: false, size: 0, mtime: Date.now() / 1000 });
            // Call the method
            const uri = mockUri('test-connection', '/path/to/existing-directory');
            await provider.createDirectory(uri);
            // Verify mkdir was not called
            (0, vitest_1.expect)(mockSftpClient.mkdir).not.toHaveBeenCalled();
        });
        (0, vitest_1.it)('should throw FileExists if path exists but is not a directory', async () => {
            // Setup mock responses
            mockSftpClient.stat.mockResolvedValue({ isDirectory: false, isFile: true, size: 100, mtime: Date.now() / 1000 });
            // Call the method and expect error
            const uri = mockUri('test-connection', '/path/to/file.txt');
            await (0, vitest_1.expect)(provider.createDirectory(uri)).rejects.toMatchObject({
                code: 'FileExists',
                message: vitest_1.expect.stringContaining('Path exists but is not a directory')
            });
            // Verify mkdir was not called
            (0, vitest_1.expect)(mockSftpClient.mkdir).not.toHaveBeenCalled();
        });
    });
    (0, vitest_1.describe)('readDirectory', () => {
        (0, vitest_1.it)('should read directory contents successfully', async () => {
            // Setup mock responses
            mockSftpClient.stat.mockResolvedValue({ isDirectory: true, isFile: false, size: 0, mtime: Date.now() / 1000 });
            mockSftpClient.list.mockResolvedValue([
                { name: 'file1.txt', type: '-', size: 100, mtime: Date.now() / 1000 },
                { name: 'subdir', type: 'd', size: 0, mtime: Date.now() / 1000 },
                { name: 'symlink', type: 'l', size: 0, mtime: Date.now() / 1000 }
            ]);
            // Call the method
            const uri = mockUri('test-connection', '/path/to/directory');
            const result = await provider.readDirectory(uri);
            // Verify results
            (0, vitest_1.expect)(mockSftpClient.stat).toHaveBeenCalledWith('/path/to/directory');
            (0, vitest_1.expect)(mockSftpClient.list).toHaveBeenCalledWith('/path/to/directory');
            (0, vitest_1.expect)(result).toEqual([
                ['file1.txt', vscode.FileType.File],
                ['subdir', vscode.FileType.Directory],
                ['symlink', vscode.FileType.SymbolicLink]
            ]);
        });
        (0, vitest_1.it)('should throw FileNotFound if directory does not exist', async () => {
            // Setup mock responses
            mockSftpClient.stat.mockRejectedValue({ code: 'ENOENT' });
            // Call the method and expect error
            const uri = mockUri('test-connection', '/path/to/nonexistent-directory');
            await (0, vitest_1.expect)(provider.readDirectory(uri)).rejects.toMatchObject({
                code: 'FileNotFound',
                message: vitest_1.expect.stringContaining('Directory not found')
            });
            // Verify list was not called
            (0, vitest_1.expect)(mockSftpClient.list).not.toHaveBeenCalled();
        });
        (0, vitest_1.it)('should throw FileNotFound if path is not a directory', async () => {
            // Setup mock responses
            mockSftpClient.stat.mockResolvedValue({ isDirectory: false, isFile: true, size: 100, mtime: Date.now() / 1000 });
            // Call the method and expect error
            const uri = mockUri('test-connection', '/path/to/file.txt');
            await (0, vitest_1.expect)(provider.readDirectory(uri)).rejects.toMatchObject({
                code: 'FileNotFound',
                message: vitest_1.expect.stringContaining('Path is not a directory')
            });
            // Verify list was not called
            (0, vitest_1.expect)(mockSftpClient.list).not.toHaveBeenCalled();
        });
    });
    (0, vitest_1.describe)('delete', () => {
        (0, vitest_1.it)('should delete a file successfully', async () => {
            // Setup mock responses
            mockSftpClient.stat.mockResolvedValue({ isDirectory: false, isFile: true, size: 100, mtime: Date.now() / 1000 });
            mockSftpClient.delete.mockResolvedValue(undefined);
            // Call the method
            const uri = mockUri('test-connection', '/path/to/file.txt');
            await provider.delete(uri, { recursive: false });
            // Verify results
            (0, vitest_1.expect)(mockSftpClient.stat).toHaveBeenCalledWith('/path/to/file.txt');
            (0, vitest_1.expect)(mockSftpClient.delete).toHaveBeenCalledWith('/path/to/file.txt');
        });
        (0, vitest_1.it)('should delete an empty directory successfully', async () => {
            // Setup mock responses
            mockSftpClient.stat.mockResolvedValue({ isDirectory: true, isFile: false, size: 0, mtime: Date.now() / 1000 });
            mockSftpClient.list.mockResolvedValue([]); // Empty directory
            mockSftpClient.rmdir.mockResolvedValue(undefined);
            // Call the method
            const uri = mockUri('test-connection', '/path/to/empty-directory');
            await provider.delete(uri, { recursive: false });
            // Verify results
            (0, vitest_1.expect)(mockSftpClient.stat).toHaveBeenCalledWith('/path/to/empty-directory');
            (0, vitest_1.expect)(mockSftpClient.list).toHaveBeenCalledWith('/path/to/empty-directory');
            (0, vitest_1.expect)(mockSftpClient.rmdir).toHaveBeenCalledWith('/path/to/empty-directory');
        });
        (0, vitest_1.it)('should delete a non-empty directory when recursive is true', async () => {
            // Setup mock responses
            mockSftpClient.stat.mockResolvedValue({ isDirectory: true, isFile: false, size: 0, mtime: Date.now() / 1000 });
            mockSftpClient.rmdir.mockResolvedValue(undefined);
            // Call the method
            const uri = mockUri('test-connection', '/path/to/non-empty-directory');
            await provider.delete(uri, { recursive: true });
            // Verify results
            (0, vitest_1.expect)(mockSftpClient.stat).toHaveBeenCalledWith('/path/to/non-empty-directory');
            (0, vitest_1.expect)(mockSftpClient.rmdir).toHaveBeenCalledWith('/path/to/non-empty-directory', true);
        });
        (0, vitest_1.it)('should throw NoPermissions when trying to delete a non-empty directory without recursive option', async () => {
            // Setup mock responses
            mockSftpClient.stat.mockResolvedValue({ isDirectory: true, isFile: false, size: 0, mtime: Date.now() / 1000 });
            mockSftpClient.list.mockResolvedValue([
                { name: 'file1.txt', type: '-', size: 100, mtime: Date.now() / 1000 }
            ]); // Non-empty directory
            // Call the method and expect error
            const uri = mockUri('test-connection', '/path/to/non-empty-directory');
            await (0, vitest_1.expect)(provider.delete(uri, { recursive: false })).rejects.toMatchObject({
                code: 'NoPermissions',
                message: vitest_1.expect.stringContaining('Cannot delete non-empty directory without recursive option')
            });
            // Verify rmdir was not called
            (0, vitest_1.expect)(mockSftpClient.rmdir).not.toHaveBeenCalled();
        });
        (0, vitest_1.it)('should throw FileNotFound if path does not exist', async () => {
            // Setup mock responses
            mockSftpClient.stat.mockRejectedValue({ code: 'ENOENT' });
            // Call the method and expect error
            const uri = mockUri('test-connection', '/path/to/nonexistent');
            await (0, vitest_1.expect)(provider.delete(uri, { recursive: false })).rejects.toMatchObject({
                code: 'FileNotFound',
                message: vitest_1.expect.stringContaining('Path not found')
            });
            // Verify delete and rmdir were not called
            (0, vitest_1.expect)(mockSftpClient.delete).not.toHaveBeenCalled();
            (0, vitest_1.expect)(mockSftpClient.rmdir).not.toHaveBeenCalled();
        });
    });
    (0, vitest_1.describe)('rename', () => {
        (0, vitest_1.it)('should rename a file successfully', async () => {
            // Setup mock responses
            mockSftpClient.stat.mockImplementation(async (path) => {
                if (path === '/path/to/old-file.txt') {
                    return { isDirectory: false, isFile: true, size: 100, mtime: Date.now() / 1000 };
                }
                const error = new Error('ENOENT');
                error.code = 'ENOENT';
                throw error; // New path doesn't exist
            });
            mockSftpClient.rename.mockResolvedValue(undefined);
            // Call the method
            const oldUri = mockUri('test-connection', '/path/to/old-file.txt');
            const newUri = mockUri('test-connection', '/path/to/new-file.txt');
            await provider.rename(oldUri, newUri, { overwrite: false });
            // Verify results
            (0, vitest_1.expect)(mockSftpClient.stat).toHaveBeenCalledWith('/path/to/old-file.txt');
            (0, vitest_1.expect)(mockSftpClient.stat).toHaveBeenCalledWith('/path/to/new-file.txt');
            (0, vitest_1.expect)(mockSftpClient.rename).toHaveBeenCalledWith('/path/to/old-file.txt', '/path/to/new-file.txt');
        });
        (0, vitest_1.it)('should overwrite destination when overwrite is true', async () => {
            // Setup mock responses
            mockSftpClient.stat.mockImplementation(async (path) => {
                if (path === '/path/to/old-file.txt' || path === '/path/to/existing-file.txt') {
                    return { isDirectory: false, isFile: true, size: 100, mtime: Date.now() / 1000 };
                }
                const error = new Error('ENOENT');
                error.code = 'ENOENT';
                throw error;
            });
            mockSftpClient.delete.mockResolvedValue(undefined);
            mockSftpClient.rename.mockResolvedValue(undefined);
            // Call the method
            const oldUri = mockUri('test-connection', '/path/to/old-file.txt');
            const newUri = mockUri('test-connection', '/path/to/existing-file.txt');
            await provider.rename(oldUri, newUri, { overwrite: true });
            // Verify results
            (0, vitest_1.expect)(mockSftpClient.stat).toHaveBeenCalledWith('/path/to/old-file.txt');
            (0, vitest_1.expect)(mockSftpClient.stat).toHaveBeenCalledWith('/path/to/existing-file.txt');
            (0, vitest_1.expect)(mockSftpClient.delete).toHaveBeenCalledWith('/path/to/existing-file.txt');
            (0, vitest_1.expect)(mockSftpClient.rename).toHaveBeenCalledWith('/path/to/old-file.txt', '/path/to/existing-file.txt');
        });
        (0, vitest_1.it)('should throw FileExists when overwrite is false and destination exists', async () => {
            // Setup mock responses
            mockSftpClient.stat.mockResolvedValue({ isDirectory: false, isFile: true, size: 100, mtime: Date.now() / 1000 });
            // Call the method and expect error
            const oldUri = mockUri('test-connection', '/path/to/old-file.txt');
            const newUri = mockUri('test-connection', '/path/to/existing-file.txt');
            await (0, vitest_1.expect)(provider.rename(oldUri, newUri, { overwrite: false })).rejects.toMatchObject({
                code: 'FileExists',
                message: vitest_1.expect.stringContaining('Destination already exists')
            });
            // Verify rename was not called
            (0, vitest_1.expect)(mockSftpClient.rename).not.toHaveBeenCalled();
        });
        (0, vitest_1.it)('should throw FileNotFound when source does not exist', async () => {
            // Setup mock responses
            mockSftpClient.stat.mockImplementation(async (path) => {
                if (path === '/path/to/nonexistent.txt') {
                    const error = new Error('ENOENT');
                    error.code = 'ENOENT';
                    throw error;
                }
                return { isDirectory: false, isFile: true, size: 100, mtime: Date.now() / 1000 };
            });
            // Call the method and expect error
            const oldUri = mockUri('test-connection', '/path/to/nonexistent.txt');
            const newUri = mockUri('test-connection', '/path/to/new-file.txt');
            await (0, vitest_1.expect)(provider.rename(oldUri, newUri, { overwrite: false })).rejects.toMatchObject({
                code: 'FileNotFound',
                message: vitest_1.expect.stringContaining('Source path not found')
            });
            // Verify rename was not called
            (0, vitest_1.expect)(mockSftpClient.rename).not.toHaveBeenCalled();
        });
        (0, vitest_1.it)('should throw Unavailable when trying to rename across different connections', async () => {
            // Call the method and expect error
            const oldUri = mockUri('test-connection', '/path/to/file.txt');
            const newUri = mockUri('other-connection', '/path/to/new-file.txt');
            await (0, vitest_1.expect)(provider.rename(oldUri, newUri, { overwrite: false })).rejects.toMatchObject({
                code: 'Unavailable',
                message: vitest_1.expect.stringContaining('Cannot rename across different connections')
            });
            // Verify stat and rename were not called
            (0, vitest_1.expect)(mockSftpClient.stat).not.toHaveBeenCalled();
            (0, vitest_1.expect)(mockSftpClient.rename).not.toHaveBeenCalled();
        });
    });
    (0, vitest_1.describe)('stat', () => {
        (0, vitest_1.it)('should get file stats successfully', async () => {
            // Setup mock responses
            const now = Date.now() / 1000; // Current time in seconds
            mockSftpClient.stat.mockResolvedValue({
                isDirectory: false,
                isFile: true,
                isSymbolicLink: false,
                size: 1024,
                mtime: now
            });
            // Call the method
            const uri = mockUri('test-connection', '/path/to/file.txt');
            const result = await provider.stat(uri);
            // Verify results
            (0, vitest_1.expect)(mockSftpClient.stat).toHaveBeenCalledWith('/path/to/file.txt');
            (0, vitest_1.expect)(result).toEqual({
                type: vscode.FileType.File,
                ctime: now * 1000, // Convert to milliseconds
                mtime: now * 1000,
                size: 1024
            });
        });
        (0, vitest_1.it)('should get directory stats successfully', async () => {
            // Setup mock responses
            const now = Date.now() / 1000; // Current time in seconds
            mockSftpClient.stat.mockResolvedValue({
                isDirectory: true,
                isFile: false,
                isSymbolicLink: false,
                size: 0,
                mtime: now
            });
            // Call the method
            const uri = mockUri('test-connection', '/path/to/directory');
            const result = await provider.stat(uri);
            // Verify results
            (0, vitest_1.expect)(mockSftpClient.stat).toHaveBeenCalledWith('/path/to/directory');
            (0, vitest_1.expect)(result).toEqual({
                type: vscode.FileType.Directory,
                ctime: now * 1000, // Convert to milliseconds
                mtime: now * 1000,
                size: 0
            });
        });
        (0, vitest_1.it)('should get symbolic link stats successfully', async () => {
            // Setup mock responses
            const now = Date.now() / 1000; // Current time in seconds
            mockSftpClient.stat.mockResolvedValue({
                isDirectory: false,
                isFile: false,
                isSymbolicLink: true,
                size: 0,
                mtime: now
            });
            // Call the method
            const uri = mockUri('test-connection', '/path/to/symlink');
            const result = await provider.stat(uri);
            // Verify results
            (0, vitest_1.expect)(mockSftpClient.stat).toHaveBeenCalledWith('/path/to/symlink');
            (0, vitest_1.expect)(result).toEqual({
                type: vscode.FileType.SymbolicLink,
                ctime: now * 1000, // Convert to milliseconds
                mtime: now * 1000,
                size: 0
            });
        });
        (0, vitest_1.it)('should throw FileNotFound for non-existent paths', async () => {
            // Setup mock responses
            mockSftpClient.stat.mockRejectedValue({ code: 'ENOENT' });
            // Call the method and expect error
            const uri = mockUri('test-connection', '/path/to/nonexistent');
            try {
                await provider.stat(uri);
                // If we get here, the test should fail
                (0, vitest_1.expect)(true).toBe(false); // This should not be reached
            }
            catch (error) {
                (0, vitest_1.expect)(error).toMatchObject({
                    code: 'FileNotFound',
                    message: vitest_1.expect.stringContaining('Path not found')
                });
            }
        });
    });
    (0, vitest_1.describe)('watch', () => {
        (0, vitest_1.it)('should return a disposable that does nothing', () => {
            // Call the method
            const uri = mockUri('test-connection', '/path/to/file.txt');
            const disposable = provider.watch(uri, { recursive: true, excludes: [] });
            // Verify it's a disposable
            (0, vitest_1.expect)(disposable).toHaveProperty('dispose');
            (0, vitest_1.expect)(typeof disposable.dispose).toBe('function');
            // Call dispose (should not throw)
            (0, vitest_1.expect)(() => disposable.dispose()).not.toThrow();
        });
    });
    (0, vitest_1.describe)('error handling', () => {
        (0, vitest_1.it)('should handle connection not found error', async () => {
            // Setup mock responses
            const originalGetConnection = connectionManager.getConnection;
            connectionManager.getConnection.mockImplementation((id) => {
                if (id === 'nonexistent-connection') {
                    return undefined;
                }
                return originalGetConnection(id);
            });
            // Call the method and expect error
            const uri = mockUri('nonexistent-connection', '/path/to/file.txt');
            try {
                await provider.readFile(uri);
                // If we get here, the test should fail
                (0, vitest_1.expect)(true).toBe(false); // This should not be reached
            }
            catch (error) {
                (0, vitest_1.expect)(error).toMatchObject({
                    code: 'Unavailable',
                    message: vitest_1.expect.stringContaining('SSH connection not found')
                });
            }
        });
        (0, vitest_1.it)('should handle inactive connection error', async () => {
            // Call the method and expect error
            const uri = mockUri('disconnected-connection', '/path/to/file.txt');
            await (0, vitest_1.expect)(provider.readFile(uri)).rejects.toMatchObject({
                code: 'Unavailable',
                message: vitest_1.expect.stringContaining('SSH connection is not active')
            });
        });
        (0, vitest_1.it)('should handle permission denied errors', async () => {
            // Enable permission testing
            process.env.TEST_PERMISSIONS = 'true';
            // Setup mock responses
            mockSftpClient.stat.mockResolvedValue({ isDirectory: false, isFile: true, size: 100, mtime: Date.now() / 1000 });
            mockSftpClient.get.mockRejectedValue(new Error('Permission denied'));
            // Call the method and expect error
            const uri = mockUri('test-connection', '/path/to/file.txt');
            try {
                await provider.readFile(uri);
                vitest_1.expect.fail('Expected an error to be thrown');
            }
            catch (error) {
                (0, vitest_1.expect)(error.code).toBe('NoPermissions');
                (0, vitest_1.expect)(error.message).toContain('Permission denied');
            }
            // Clean up
            delete process.env.TEST_PERMISSIONS;
        });
    });
    (0, vitest_1.describe)('dispose', () => {
        (0, vitest_1.it)('should close all SFTP clients', async () => {
            // Setup by accessing an SFTP client first
            const uri = mockUri('test-connection', '/path/to/file.txt');
            mockSftpClient.stat.mockResolvedValue({ isDirectory: false, isFile: true, size: 100, mtime: Date.now() / 1000 });
            mockSftpClient.get.mockResolvedValue(Buffer.from('test'));
            // First make a call to ensure the SFTP client is created
            await provider.readFile(uri);
            // Call dispose
            provider.dispose();
            // Verify all SFTP clients were closed
            (0, vitest_1.expect)(mockSftpClient.end).toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=remote-file-system-provider.test.js.map