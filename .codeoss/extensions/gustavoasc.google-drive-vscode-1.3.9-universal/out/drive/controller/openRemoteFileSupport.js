"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenRemoteFileSupport = void 0;
const remotePathBuilder_1 = require("../fileSystem/remotePathBuilder");
class OpenRemoteFileSupport {
    constructor() {
        this.remotePathBuilder = new remotePathBuilder_1.RemotePathBuilder();
    }
    fireCommand(model, view, fileId) {
        const remotePath = this.remotePathBuilder.buildRemotePathFromId(model, fileId);
        if (remotePath) {
            view.openUri(remotePath);
        }
        else {
            view.showWarningMessage(`An unexpected error happened and the file with ID ${fileId} could not be opened`);
        }
    }
}
exports.OpenRemoteFileSupport = OpenRemoteFileSupport;
//# sourceMappingURL=openRemoteFileSupport.js.map