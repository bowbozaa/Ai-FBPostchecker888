"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemotePathBuilder = void 0;
const fileSystemConstants_1 = require("./fileSystemConstants");
class RemotePathBuilder {
    buildRemotePathFromId(model, fileId) {
        const file = model.getDriveFile(fileId);
        if (file) {
            return this.buildRemotePathFromFile(file);
        }
        return undefined;
    }
    buildRemotePathFromFile(file) {
        let currentFile = file;
        let remotePath = currentFile.name;
        while (currentFile.parent) {
            const parent = currentFile.parent;
            remotePath = parent.name + fileSystemConstants_1.DRIVE_SEPARATOR + remotePath;
            currentFile = parent;
        }
        const fullPath = fileSystemConstants_1.DRIVE_SCHEME + '://' + '/' + remotePath;
        const pathUriId = fullPath + '#' + file.id;
        return pathUriId;
    }
}
exports.RemotePathBuilder = RemotePathBuilder;
//# sourceMappingURL=remotePathBuilder.js.map