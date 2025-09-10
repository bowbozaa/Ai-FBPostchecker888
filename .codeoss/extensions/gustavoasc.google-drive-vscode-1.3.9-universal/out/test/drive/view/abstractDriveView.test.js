"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractDriveView = void 0;
class AbstractDriveView {
    askForRemoteDestinationFolder() {
        throw new Error("Method not implemented.");
    }
    askForLocalDestinationFolder(suggestedPath) {
        throw new Error("Method not implemented.");
    }
    openFile(fullPath) {
        throw new Error("Method not implemented.");
    }
    openUri(targetUri) {
        throw new Error("Method not implemented.");
    }
    refresh() {
        throw new Error("Method not implemented.");
    }
    showInputBox(message, value) {
        throw new Error("Method not implemented.");
    }
    showProgressMessage(message, task) {
        throw new Error("Method not implemented.");
    }
    showInformationMessage(message, ...items) {
        throw new Error("Method not implemented.");
    }
    showWarningMessage(message) {
        throw new Error("Method not implemented.");
    }
}
exports.AbstractDriveView = AbstractDriveView;
//# sourceMappingURL=abstractDriveView.test.js.map