"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtensionInstallStatus = exports.ExtensionKind = void 0;
/**
 * Extension kind, matching VS Code's ExtensionKind
 */
var ExtensionKind;
(function (ExtensionKind) {
    ExtensionKind["UI"] = "ui";
    ExtensionKind["Workspace"] = "workspace";
    ExtensionKind["Web"] = "web";
})(ExtensionKind || (exports.ExtensionKind = ExtensionKind = {}));
/**
 * Extension installation status
 */
var ExtensionInstallStatus;
(function (ExtensionInstallStatus) {
    ExtensionInstallStatus["Installing"] = "installing";
    ExtensionInstallStatus["Installed"] = "installed";
    ExtensionInstallStatus["Failed"] = "failed";
})(ExtensionInstallStatus || (exports.ExtensionInstallStatus = ExtensionInstallStatus = {}));
//# sourceMappingURL=extension.js.map