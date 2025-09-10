"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const error_classifier_1 = require("./error-classifier");
const ssh_1 = require("../interfaces/ssh");
// Mock vscode module
vitest_1.vi.mock('vscode', () => {
    return {
        FileType: {
            Unknown: 0,
            File: 1,
            Directory: 2,
            SymbolicLink: 64
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
                    const parsedValue = typeof value === 'string' ? value : '';
                    return {
                        scheme: 'ssh',
                        authority: parsedValue.split('://')[1]?.split('/')[0] || '',
                        path: params.path || parsedValue.split('://')[1]?.split('/').slice(1).join('/') || '',
                        query: '',
                        fragment: '',
                        fsPath: params.path || parsedValue.split('://')[1]?.split('/').slice(1).join('/') || '',
                        with: vitest_1.vi.fn(),
                        toString: vitest_1.vi.fn().mockReturnValue(`ssh://${parsedValue.split('://')[1]?.split('/')[0] || ''}${params.path || parsedValue.split('://')[1]?.split('/').slice(1).join('/') || ''}`),
                        toJSON: vitest_1.vi.fn()
                    };
                }),
                toString: vitest_1.vi.fn().mockReturnValue(value),
                toJSON: vitest_1.vi.fn()
            })
        }
    };
});
// Helper function to create mock URIs
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
(0, vitest_1.describe)('Error Classifier', () => {
    (0, vitest_1.describe)('classifySSHError', () => {
        (0, vitest_1.it)('should classify connection refused errors', () => {
            const error = new Error('Connection refused');
            (0, vitest_1.expect)((0, error_classifier_1.classifySSHError)(error)).toBe(ssh_1.SSHErrorType.ConnectionRefused);
            const errorWithCode = new Error('Some error');
            errorWithCode.code = 'ECONNREFUSED';
            (0, vitest_1.expect)((0, error_classifier_1.classifySSHError)(errorWithCode)).toBe(ssh_1.SSHErrorType.ConnectionRefused);
        });
        (0, vitest_1.it)('should classify host unreachable errors', () => {
            const error = new Error('Host unreachable');
            (0, vitest_1.expect)((0, error_classifier_1.classifySSHError)(error)).toBe(ssh_1.SSHErrorType.HostUnreachable);
            const errorWithCode = new Error('Some error');
            errorWithCode.code = 'EHOSTUNREACH';
            (0, vitest_1.expect)((0, error_classifier_1.classifySSHError)(errorWithCode)).toBe(ssh_1.SSHErrorType.HostUnreachable);
        });
        (0, vitest_1.it)('should classify timeout errors', () => {
            const error = new Error('Connection timeout');
            (0, vitest_1.expect)((0, error_classifier_1.classifySSHError)(error)).toBe(ssh_1.SSHErrorType.NetworkTimeout);
            const errorWithCode = new Error('Some error');
            errorWithCode.code = 'ETIMEDOUT';
            (0, vitest_1.expect)((0, error_classifier_1.classifySSHError)(errorWithCode)).toBe(ssh_1.SSHErrorType.NetworkTimeout);
        });
        (0, vitest_1.it)('should classify network errors', () => {
            const error = new Error('Network unreachable');
            (0, vitest_1.expect)((0, error_classifier_1.classifySSHError)(error)).toBe(ssh_1.SSHErrorType.NetworkTimeout);
            const resetError = new Error('Connection reset by peer');
            (0, vitest_1.expect)((0, error_classifier_1.classifySSHError)(resetError)).toBe(ssh_1.SSHErrorType.NetworkTimeout);
            const errorWithCode = new Error('Some error');
            errorWithCode.code = 'ENETUNREACH';
            (0, vitest_1.expect)((0, error_classifier_1.classifySSHError)(errorWithCode)).toBe(ssh_1.SSHErrorType.NetworkTimeout);
            const resetErrorWithCode = new Error('Some error');
            resetErrorWithCode.code = 'ECONNRESET';
            (0, vitest_1.expect)((0, error_classifier_1.classifySSHError)(resetErrorWithCode)).toBe(ssh_1.SSHErrorType.NetworkTimeout);
        });
        (0, vitest_1.it)('should classify authentication errors', () => {
            const error = new Error('Authentication failed');
            (0, vitest_1.expect)((0, error_classifier_1.classifySSHError)(error)).toBe(ssh_1.SSHErrorType.AuthenticationFailed);
            const passwordError = new Error('Password rejected');
            (0, vitest_1.expect)((0, error_classifier_1.classifySSHError)(passwordError)).toBe(ssh_1.SSHErrorType.PasswordRejected);
            const keyError = new Error('Key rejected');
            (0, vitest_1.expect)((0, error_classifier_1.classifySSHError)(keyError)).toBe(ssh_1.SSHErrorType.KeyRejected);
        });
        (0, vitest_1.it)('should classify file system errors', () => {
            const notFoundError = new Error('No such file or directory');
            (0, vitest_1.expect)((0, error_classifier_1.classifySSHError)(notFoundError)).toBe(ssh_1.SSHErrorType.FileNotFound);
            const notFoundWithCode = new Error('Some error');
            notFoundWithCode.code = 'ENOENT';
            (0, vitest_1.expect)((0, error_classifier_1.classifySSHError)(notFoundWithCode)).toBe(ssh_1.SSHErrorType.FileNotFound);
            const permissionError = new Error('Permission denied');
            (0, vitest_1.expect)((0, error_classifier_1.classifySSHError)(permissionError)).toBe(ssh_1.SSHErrorType.PermissionDenied);
            const permissionWithCode = new Error('Some error');
            permissionWithCode.code = 'EACCES';
            (0, vitest_1.expect)((0, error_classifier_1.classifySSHError)(permissionWithCode)).toBe(ssh_1.SSHErrorType.PermissionDenied);
            const permWithCode = new Error('Some error');
            permWithCode.code = 'EPERM';
            (0, vitest_1.expect)((0, error_classifier_1.classifySSHError)(permWithCode)).toBe(ssh_1.SSHErrorType.PermissionDenied);
        });
        (0, vitest_1.it)('should classify directory not empty errors', () => {
            const dirNotEmptyError = new Error('Directory not empty');
            (0, vitest_1.expect)((0, error_classifier_1.classifySSHError)(dirNotEmptyError)).toBe(ssh_1.SSHErrorType.FilePermissionDenied);
            const dirNotEmptyWithCode = new Error('Some error');
            dirNotEmptyWithCode.code = 'ENOTEMPTY';
            (0, vitest_1.expect)((0, error_classifier_1.classifySSHError)(dirNotEmptyWithCode)).toBe(ssh_1.SSHErrorType.FilePermissionDenied);
        });
        (0, vitest_1.it)('should classify disk quota and space errors', () => {
            const quotaError = new Error('Disk quota exceeded');
            (0, vitest_1.expect)((0, error_classifier_1.classifySSHError)(quotaError)).toBe(ssh_1.SSHErrorType.SFTPError);
            const quotaWithCode = new Error('Some error');
            quotaWithCode.code = 'EDQUOT';
            (0, vitest_1.expect)((0, error_classifier_1.classifySSHError)(quotaWithCode)).toBe(ssh_1.SSHErrorType.SFTPError);
            const spaceError = new Error('Disk full');
            (0, vitest_1.expect)((0, error_classifier_1.classifySSHError)(spaceError)).toBe(ssh_1.SSHErrorType.SFTPError);
            const spaceWithCode = new Error('Some error');
            spaceWithCode.code = 'ENOSPC';
            (0, vitest_1.expect)((0, error_classifier_1.classifySSHError)(spaceWithCode)).toBe(ssh_1.SSHErrorType.SFTPError);
        });
        (0, vitest_1.it)('should return Unknown for unrecognized errors', () => {
            const error = new Error('Some unknown error');
            (0, vitest_1.expect)((0, error_classifier_1.classifySSHError)(error)).toBe(ssh_1.SSHErrorType.Unknown);
        });
    });
    (0, vitest_1.describe)('createFileSystemError', () => {
        (0, vitest_1.it)('should create a FileSystemError with the specified code and message', () => {
            const uri = mockUri('test-connection', '/path/to/file.txt');
            const error = (0, error_classifier_1.createFileSystemError)('FileNotFound', uri, 'File not found');
            (0, vitest_1.expect)(error).toBeInstanceOf(Error);
            (0, vitest_1.expect)(error.code).toBe('FileNotFound');
            (0, vitest_1.expect)(error.message).toBe('File not found');
            (0, vitest_1.expect)(error.uri).toBe(uri);
        });
    });
    (0, vitest_1.describe)('classifyAndCreateFileSystemError', () => {
        (0, vitest_1.it)('should return the original error if it is already a FileSystemError', () => {
            const uri = mockUri('test-connection', '/path/to/file.txt');
            const originalError = (0, error_classifier_1.createFileSystemError)('FileNotFound', uri, 'Original error');
            const result = (0, error_classifier_1.classifyAndCreateFileSystemError)(originalError, uri, 'read file');
            (0, vitest_1.expect)(result).toBe(originalError);
        });
        (0, vitest_1.it)('should classify permission errors', () => {
            const uri = mockUri('test-connection', '/path/to/file.txt');
            const error = new Error('Permission denied');
            const result = (0, error_classifier_1.classifyAndCreateFileSystemError)(error, uri, 'read file');
            (0, vitest_1.expect)(result.code).toBe('NoPermissions');
            (0, vitest_1.expect)(result.message).toContain('Permission denied');
        });
        (0, vitest_1.it)('should classify directory not empty errors', () => {
            const uri = mockUri('test-connection', '/path/to/directory');
            const error = new Error('Directory not empty');
            const result = (0, error_classifier_1.classifyAndCreateFileSystemError)(error, uri, 'delete directory');
            (0, vitest_1.expect)(result.code).toBe('NoPermissions');
            (0, vitest_1.expect)(result.message).toContain('Cannot delete non-empty directory');
        });
        (0, vitest_1.it)('should classify file not found errors', () => {
            const uri = mockUri('test-connection', '/path/to/file.txt');
            const error = new Error('No such file or directory');
            const result = (0, error_classifier_1.classifyAndCreateFileSystemError)(error, uri, 'read file');
            (0, vitest_1.expect)(result.code).toBe('FileNotFound');
            (0, vitest_1.expect)(result.message).toContain('File not found');
        });
        (0, vitest_1.it)('should classify file exists errors', () => {
            const uri = mockUri('test-connection', '/path/to/file.txt');
            const error = new Error('File already exists');
            const result = (0, error_classifier_1.classifyAndCreateFileSystemError)(error, uri, 'create file');
            (0, vitest_1.expect)(result.code).toBe('FileExists');
            (0, vitest_1.expect)(result.message).toContain('already exists');
        });
        (0, vitest_1.it)('should classify disk quota errors', () => {
            const uri = mockUri('test-connection', '/path/to/file.txt');
            const error = new Error('Disk quota exceeded');
            const result = (0, error_classifier_1.classifyAndCreateFileSystemError)(error, uri, 'write file');
            (0, vitest_1.expect)(result.code).toBe('NoPermissions');
            (0, vitest_1.expect)(result.message).toContain('Disk quota exceeded');
        });
        (0, vitest_1.it)('should classify disk space errors', () => {
            const uri = mockUri('test-connection', '/path/to/file.txt');
            const error = new Error('No space left on device');
            error.code = 'ENOSPC';
            const result = (0, error_classifier_1.classifyAndCreateFileSystemError)(error, uri, 'write file');
            (0, vitest_1.expect)(result.code).toBe('Unavailable');
            (0, vitest_1.expect)(result.message).toContain('No space left on device');
        });
        (0, vitest_1.it)('should classify connection errors', () => {
            const uri = mockUri('test-connection', '/path/to/file.txt');
            const error = new Error('Connection timeout');
            const result = (0, error_classifier_1.classifyAndCreateFileSystemError)(error, uri, 'read file');
            (0, vitest_1.expect)(result.code).toBe('Unavailable');
            (0, vitest_1.expect)(result.message).toContain('Connection error');
        });
        (0, vitest_1.it)('should classify network errors', () => {
            const uri = mockUri('test-connection', '/path/to/file.txt');
            const error = new Error('Connection reset by peer');
            const result = (0, error_classifier_1.classifyAndCreateFileSystemError)(error, uri, 'read file');
            (0, vitest_1.expect)(result.code).toBe('Unavailable');
            (0, vitest_1.expect)(result.message).toContain('Connection error');
        });
        (0, vitest_1.it)('should classify SFTP protocol errors', () => {
            const uri = mockUri('test-connection', '/path/to/file.txt');
            const error = new Error('SFTP protocol error');
            const result = (0, error_classifier_1.classifyAndCreateFileSystemError)(error, uri, 'read file');
            (0, vitest_1.expect)(result.code).toBe('Unavailable');
            (0, vitest_1.expect)(result.message).toContain('SFTP protocol error');
        });
        (0, vitest_1.it)('should include troubleshooting steps in error messages', () => {
            const uri = mockUri('test-connection', '/path/to/file.txt');
            const error = new Error('Connection refused');
            const result = (0, error_classifier_1.classifyAndCreateFileSystemError)(error, uri, 'read file');
            (0, vitest_1.expect)(result.message).toContain('Troubleshooting');
        });
        (0, vitest_1.it)('should default to Unknown for unrecognized errors', () => {
            const uri = mockUri('test-connection', '/path/to/file.txt');
            const error = new Error('Some unknown error');
            const result = (0, error_classifier_1.classifyAndCreateFileSystemError)(error, uri, 'read file');
            (0, vitest_1.expect)(result.code).toBe('Unknown');
            (0, vitest_1.expect)(result.message).toContain('Failed to read file');
        });
    });
    (0, vitest_1.describe)('getTroubleshootingSteps', () => {
        (0, vitest_1.it)('should return appropriate troubleshooting steps for connection errors', () => {
            const steps = (0, error_classifier_1.getTroubleshootingSteps)(ssh_1.SSHErrorType.ConnectionRefused);
            (0, vitest_1.expect)(steps).toBeInstanceOf(Array);
            (0, vitest_1.expect)(steps.length).toBeGreaterThan(0);
            (0, vitest_1.expect)(steps[0]).toContain('Verify the SSH server is running');
        });
        (0, vitest_1.it)('should return appropriate troubleshooting steps for authentication errors', () => {
            const steps = (0, error_classifier_1.getTroubleshootingSteps)(ssh_1.SSHErrorType.AuthenticationFailed);
            (0, vitest_1.expect)(steps).toBeInstanceOf(Array);
            (0, vitest_1.expect)(steps.length).toBeGreaterThan(0);
            (0, vitest_1.expect)(steps[0]).toContain('Verify your username and password');
        });
        (0, vitest_1.it)('should return appropriate troubleshooting steps for file system errors', () => {
            const steps = (0, error_classifier_1.getTroubleshootingSteps)(ssh_1.SSHErrorType.FilePermissionDenied);
            (0, vitest_1.expect)(steps).toBeInstanceOf(Array);
            (0, vitest_1.expect)(steps.length).toBeGreaterThan(0);
            (0, vitest_1.expect)(steps[0]).toContain('You do not have permission');
        });
        (0, vitest_1.it)('should return appropriate troubleshooting steps for file not found errors', () => {
            const steps = (0, error_classifier_1.getTroubleshootingSteps)(ssh_1.SSHErrorType.FileNotFound);
            (0, vitest_1.expect)(steps).toBeInstanceOf(Array);
            (0, vitest_1.expect)(steps.length).toBeGreaterThan(0);
            (0, vitest_1.expect)(steps[0]).toContain('The specified file or directory does not exist');
        });
        (0, vitest_1.it)('should return generic steps for unknown errors', () => {
            const steps = (0, error_classifier_1.getTroubleshootingSteps)(ssh_1.SSHErrorType.Unknown);
            (0, vitest_1.expect)(steps).toBeInstanceOf(Array);
            (0, vitest_1.expect)(steps.length).toBeGreaterThan(0);
            (0, vitest_1.expect)(steps[0]).toContain('Try reconnecting');
        });
    });
});
//# sourceMappingURL=error-classifier.test.js.map