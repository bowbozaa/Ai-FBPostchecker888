"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SSHErrorType = exports.ConnectionStatus = void 0;
var ConnectionStatus;
(function (ConnectionStatus) {
    ConnectionStatus["Disconnected"] = "disconnected";
    ConnectionStatus["Connecting"] = "connecting";
    ConnectionStatus["Connected"] = "connected";
    ConnectionStatus["Reconnecting"] = "reconnecting";
    ConnectionStatus["Error"] = "error";
})(ConnectionStatus || (exports.ConnectionStatus = ConnectionStatus = {}));
/**
 * SSH Error Types
 */
var SSHErrorType;
(function (SSHErrorType) {
    // Connection errors
    SSHErrorType["ConnectionRefused"] = "connection_refused";
    SSHErrorType["HostUnreachable"] = "host_unreachable";
    SSHErrorType["NetworkTimeout"] = "network_timeout";
    SSHErrorType["DNSResolutionFailed"] = "dns_resolution_failed";
    // Authentication errors
    SSHErrorType["AuthenticationFailed"] = "authentication_failed";
    SSHErrorType["PermissionDenied"] = "permission_denied";
    SSHErrorType["KeyRejected"] = "key_rejected";
    SSHErrorType["PasswordRejected"] = "password_rejected";
    // SSH protocol errors
    SSHErrorType["ProtocolError"] = "protocol_error";
    SSHErrorType["VersionMismatch"] = "version_mismatch";
    // File system errors
    SSHErrorType["FileNotFound"] = "file_not_found";
    SSHErrorType["FilePermissionDenied"] = "file_permission_denied";
    // Command execution errors
    SSHErrorType["CommandExecutionFailed"] = "command_execution_failed";
    // SFTP errors
    SSHErrorType["SFTPError"] = "sftp_error";
    // Configuration errors
    SSHErrorType["ConfigurationError"] = "configuration_error";
    // Unknown errors
    SSHErrorType["Unknown"] = "unknown";
})(SSHErrorType || (exports.SSHErrorType = SSHErrorType = {}));
//# sourceMappingURL=ssh.js.map