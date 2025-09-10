"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SSHErrorClassifier = void 0;
exports.classifySSHError = classifySSHError;
exports.createFileSystemError = createFileSystemError;
exports.classifyAndCreateFileSystemError = classifyAndCreateFileSystemError;
exports.getTroubleshootingSteps = getTroubleshootingSteps;
const ssh_1 = require("../interfaces/ssh");
/**
 * Classifies SSH errors based on error messages and codes
 * @param error The error to classify
 * @returns Classified SSH error type
 */
function classifySSHError(error) {
    if (!error) {
        return ssh_1.SSHErrorType.Unknown;
    }
    const errorMessage = error.message.toLowerCase();
    const errorCode = error.code;
    // Connection errors
    if (errorMessage.includes('connection refused') || errorCode === 'ECONNREFUSED') {
        return ssh_1.SSHErrorType.ConnectionRefused;
    }
    if (errorMessage.includes('host unreachable') || errorCode === 'EHOSTUNREACH') {
        return ssh_1.SSHErrorType.HostUnreachable;
    }
    if (errorMessage.includes('timeout') || errorCode === 'ETIMEDOUT') {
        return ssh_1.SSHErrorType.NetworkTimeout;
    }
    if (errorMessage.includes('dns') || errorCode === 'ENOTFOUND') {
        return ssh_1.SSHErrorType.DNSResolutionFailed;
    }
    if (errorMessage.includes('network') || errorMessage.includes('connection reset') ||
        errorCode === 'ENETUNREACH' || errorCode === 'ECONNRESET') {
        return ssh_1.SSHErrorType.NetworkTimeout;
    }
    // Authentication errors
    if (errorMessage.includes('authentication failed') || errorMessage.includes('auth failed')) {
        return ssh_1.SSHErrorType.AuthenticationFailed;
    }
    if (errorMessage.includes('permission denied') || errorCode === 'EACCES') {
        return ssh_1.SSHErrorType.PermissionDenied;
    }
    if (errorMessage.includes('key rejected')) {
        return ssh_1.SSHErrorType.KeyRejected;
    }
    if (errorMessage.includes('password rejected') || errorMessage.includes('incorrect password')) {
        return ssh_1.SSHErrorType.PasswordRejected;
    }
    // SSH protocol errors
    if (errorMessage.includes('protocol error')) {
        return ssh_1.SSHErrorType.ProtocolError;
    }
    if (errorMessage.includes('version mismatch')) {
        return ssh_1.SSHErrorType.VersionMismatch;
    }
    // File system errors
    if (errorMessage.includes('no such file') || errorCode === 'ENOENT') {
        return ssh_1.SSHErrorType.FileNotFound;
    }
    if (errorMessage.includes('permission denied') || errorCode === 'EACCES' || errorCode === 'EPERM') {
        return ssh_1.SSHErrorType.PermissionDenied;
    }
    if (errorMessage.includes('directory not empty') || errorCode === 'ENOTEMPTY') {
        return ssh_1.SSHErrorType.FilePermissionDenied;
    }
    if (errorMessage.includes('file exists') || errorCode === 'EEXIST') {
        return ssh_1.SSHErrorType.SFTPError;
    }
    if (errorMessage.includes('disk quota') || errorCode === 'EDQUOT') {
        return ssh_1.SSHErrorType.SFTPError;
    }
    if (errorMessage.includes('disk full') || errorCode === 'ENOSPC') {
        return ssh_1.SSHErrorType.SFTPError;
    }
    if (errorMessage.includes('operation not permitted') || errorCode === 'EPERM') {
        return ssh_1.SSHErrorType.PermissionDenied;
    }
    if (errorMessage.includes('read-only file system') || errorCode === 'EROFS') {
        return ssh_1.SSHErrorType.FilePermissionDenied;
    }
    if (errorMessage.includes('too many open files') || errorCode === 'EMFILE' || errorCode === 'ENFILE') {
        return ssh_1.SSHErrorType.SFTPError;
    }
    if (errorMessage.includes('file too large') || errorCode === 'EFBIG') {
        return ssh_1.SSHErrorType.SFTPError;
    }
    if (errorMessage.includes('broken pipe') || errorCode === 'EPIPE') {
        return ssh_1.SSHErrorType.NetworkTimeout;
    }
    if (errorMessage.includes('invalid argument') || errorCode === 'EINVAL') {
        return ssh_1.SSHErrorType.SFTPError;
    }
    // SFTP errors
    if (errorMessage.includes('sftp')) {
        return ssh_1.SSHErrorType.SFTPError;
    }
    return ssh_1.SSHErrorType.Unknown;
}
/**
 * Creates a standardized file system error with appropriate code and message
 * @param code Error code
 * @param uri The URI that caused the error
 * @param message Error message
 * @returns FileSystemError
 */
function createFileSystemError(code, uri, message) {
    const error = new Error(message);
    error.code = code;
    error.uri = uri;
    return error;
}
/**
 * Classifies an error and converts it to a FileSystemError
 * @param error Original error
 * @param uri URI of the file or directory
 * @param operation Description of the operation being performed
 * @returns FileSystemError
 */
function classifyAndCreateFileSystemError(error, uri, operation) {
    // If it's already a FileSystemError, just return it
    if (error.code && error.uri) {
        return error;
    }
    const errorMessage = error.message.toLowerCase();
    const errorCode = error.code;
    const errorType = classifySSHError(error);
    const troubleshootingSteps = getTroubleshootingSteps(errorType);
    const troubleshootingText = troubleshootingSteps.length > 0
        ? `\n\nTroubleshooting:\n- ${troubleshootingSteps.join('\n- ')}`
        : '';
    // Permission errors
    if (errorMessage.includes('permission denied') ||
        errorMessage.includes('access denied') ||
        errorMessage.includes('operation not permitted') ||
        errorCode === 'EACCES' ||
        errorCode === 'EPERM') {
        return createFileSystemError('NoPermissions', uri, `Permission denied: Cannot ${operation}. You may not have the required permissions.${troubleshootingText}`);
    }
    // Read-only file system
    if (errorMessage.includes('read-only file system') || errorCode === 'EROFS') {
        return createFileSystemError('NoPermissions', uri, `Read-only file system: Cannot ${operation} because the file system is read-only.${troubleshootingText}`);
    }
    // Directory not empty errors (special case for recursive delete)
    if (errorMessage.includes('directory not empty') || errorCode === 'ENOTEMPTY') {
        return createFileSystemError('NoPermissions', uri, `Cannot delete non-empty directory. Use the recursive option to delete directories with content.${troubleshootingText}`);
    }
    // File not found errors
    if (errorMessage.includes('no such file') ||
        errorMessage.includes('not found') ||
        errorCode === 'ENOENT') {
        return createFileSystemError('FileNotFound', uri, `File not found: The file or directory does not exist.${troubleshootingText}`);
    }
    // File exists errors
    if (errorMessage.includes('already exists') || errorCode === 'EEXIST') {
        return createFileSystemError('FileExists', uri, `File already exists: Cannot create file or directory that already exists.${troubleshootingText}`);
    }
    // Disk quota errors
    if (errorMessage.includes('disk quota') || errorCode === 'EDQUOT') {
        return createFileSystemError('NoPermissions', uri, `Disk quota exceeded: Cannot ${operation} because you've reached your storage limit.${troubleshootingText}`);
    }
    // Disk space errors
    if (errorMessage.includes('disk full') || errorCode === 'ENOSPC') {
        return createFileSystemError('Unavailable', uri, `No space left on device: Cannot ${operation} because the remote disk is full.${troubleshootingText}`);
    }
    // File too large errors
    if (errorMessage.includes('file too large') || errorCode === 'EFBIG') {
        return createFileSystemError('NoPermissions', uri, `File too large: Cannot ${operation} because the file exceeds the maximum allowed size.${troubleshootingText}`);
    }
    // Too many open files
    if (errorMessage.includes('too many open files') || errorCode === 'EMFILE' || errorCode === 'ENFILE') {
        return createFileSystemError('Unavailable', uri, `Too many open files: Cannot ${operation} because the system has reached its limit of open files. Try closing some files or connections.${troubleshootingText}`);
    }
    // Invalid argument errors
    if (errorMessage.includes('invalid argument') || errorCode === 'EINVAL') {
        return createFileSystemError('Unknown', uri, `Invalid argument: Cannot ${operation} due to an invalid parameter or path.${troubleshootingText}`);
    }
    // Connection/availability errors
    if (errorMessage.includes('connection') ||
        errorMessage.includes('timeout') ||
        errorMessage.includes('network') ||
        errorMessage.includes('reset') ||
        errorMessage.includes('broken pipe') ||
        errorCode === 'ECONNREFUSED' ||
        errorCode === 'ETIMEDOUT' ||
        errorCode === 'ENETUNREACH' ||
        errorCode === 'ECONNRESET' ||
        errorCode === 'EPIPE') {
        return createFileSystemError('Unavailable', uri, `Connection error: The remote server is unavailable or the connection was lost. The operation will be retried when the connection is restored.${troubleshootingText}`);
    }
    // SFTP protocol errors
    if (errorMessage.includes('sftp') || errorMessage.includes('protocol')) {
        return createFileSystemError('Unavailable', uri, `SFTP protocol error: Failed to ${operation} due to an SFTP protocol issue.${troubleshootingText}`);
    }
    // Default to unknown error
    return createFileSystemError('Unknown', uri, `Failed to ${operation}: ${error.message}${troubleshootingText}`);
}
/**
 * Generates user-friendly troubleshooting steps based on error type
 * @param errorType The type of error
 * @returns Array of troubleshooting steps
 */
function getTroubleshootingSteps(errorType) {
    switch (errorType) {
        case ssh_1.SSHErrorType.ConnectionRefused:
            return [
                'Verify the SSH server is running on the remote host',
                'Check if the port is correct and not blocked by a firewall',
                'Try connecting with a terminal SSH client to verify server availability'
            ];
        case ssh_1.SSHErrorType.HostUnreachable:
            return [
                'Check your network connection',
                'Verify the hostname or IP address is correct',
                'Check if the remote host is online and reachable'
            ];
        case ssh_1.SSHErrorType.NetworkTimeout:
            return [
                'The connection attempt timed out, the server might be slow or unreachable',
                'Check your network connection',
                'Try increasing the connection timeout in settings'
            ];
        case ssh_1.SSHErrorType.DNSResolutionFailed:
            return [
                'The hostname could not be resolved to an IP address',
                'Verify the hostname is spelled correctly',
                'Check your DNS settings'
            ];
        case ssh_1.SSHErrorType.AuthenticationFailed:
            return [
                'Verify your username and password or key are correct',
                'Check if the authentication method is supported by the server',
                'Ensure your SSH key has the correct permissions (chmod 600)'
            ];
        case ssh_1.SSHErrorType.PermissionDenied:
            return [
                'You do not have permission to access this resource',
                'Check file and directory permissions on the remote server',
                'Contact the system administrator for access'
            ];
        case ssh_1.SSHErrorType.KeyRejected:
            return [
                'The server rejected your SSH key',
                'Verify the key is added to authorized_keys on the server',
                'Check if the key format is supported by the server'
            ];
        case ssh_1.SSHErrorType.PasswordRejected:
            return [
                'The password was rejected by the server',
                'Verify your password is correct',
                'Check if password authentication is enabled on the server'
            ];
        case ssh_1.SSHErrorType.FileNotFound:
            return [
                'The specified file or directory does not exist',
                'Check the path and try again',
                'Verify the file has not been moved or deleted'
            ];
        case ssh_1.SSHErrorType.FilePermissionDenied:
            return [
                'You do not have permission to access this file or directory',
                'Check the file permissions on the remote server (use "ls -la" to view permissions)',
                'Try changing the file permissions with "chmod" if you own the file',
                'Contact the system administrator for access if needed'
            ];
        case ssh_1.SSHErrorType.SFTPError:
            return [
                'An SFTP protocol error occurred',
                'Check if the SFTP server is properly configured',
                'Verify the remote file system has sufficient space and resources',
                'Try reconnecting to the server'
            ];
        default:
            return [
                'Try reconnecting to the server',
                'Check the server logs for more information',
                'Verify your connection settings'
            ];
    }
}
/**
 * Class-based interface for SSH error classification
 * Provides a more object-oriented approach to error handling
 */
class SSHErrorClassifier {
    /**
     * Classify an SSH error
     * @param error The error to classify
     * @returns The classified error type
     */
    classifyError(error) {
        return classifySSHError(error);
    }
    /**
     * Create a file system error from a generic error
     * @param error The original error
     * @param uri The URI that caused the error
     * @param operation Description of the operation being performed
     * @returns A FileSystemError
     */
    createFileSystemError(error, uri, operation) {
        return classifyAndCreateFileSystemError(error, uri, operation);
    }
    /**
     * Get troubleshooting steps for an error type
     * @param errorType The type of error
     * @returns Array of troubleshooting steps
     */
    getTroubleshootingSteps(errorType) {
        return getTroubleshootingSteps(errorType);
    }
    /**
     * Check if an error is a network-related error
     * @param error The error to check
     * @returns True if the error is network-related
     */
    isNetworkError(error) {
        const errorType = this.classifyError(error);
        return [
            ssh_1.SSHErrorType.ConnectionRefused,
            ssh_1.SSHErrorType.HostUnreachable,
            ssh_1.SSHErrorType.NetworkTimeout,
            ssh_1.SSHErrorType.DNSResolutionFailed
        ].includes(errorType);
    }
    /**
     * Check if an error is an authentication error
     * @param error The error to check
     * @returns True if the error is authentication-related
     */
    isAuthenticationError(error) {
        const errorType = this.classifyError(error);
        return [
            ssh_1.SSHErrorType.AuthenticationFailed,
            ssh_1.SSHErrorType.KeyRejected,
            ssh_1.SSHErrorType.PasswordRejected
        ].includes(errorType);
    }
    /**
     * Check if an error is a file system error
     * @param error The error to check
     * @returns True if the error is file system-related
     */
    isFileSystemError(error) {
        const errorType = this.classifyError(error);
        return [
            ssh_1.SSHErrorType.FileNotFound,
            ssh_1.SSHErrorType.FilePermissionDenied,
            ssh_1.SSHErrorType.SFTPError
        ].includes(errorType);
    }
}
exports.SSHErrorClassifier = SSHErrorClassifier;
//# sourceMappingURL=error-classifier.js.map