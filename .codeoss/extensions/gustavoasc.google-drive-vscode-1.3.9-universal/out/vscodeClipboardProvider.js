"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VscodeClipboardProvider = void 0;
const vscode = require("vscode");
class VscodeClipboardProvider {
    writeToClipboard(text) {
        vscode.env.clipboard.writeText(text);
    }
}
exports.VscodeClipboardProvider = VscodeClipboardProvider;
//# sourceMappingURL=vscodeClipboardProvider.js.map