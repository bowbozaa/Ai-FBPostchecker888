"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyMockFileProvider = exports.AbstractMockFileProvider = void 0;
class AbstractMockFileProvider {
    provideFiles(parentFolderId) {
        throw new Error("Method not implemented.");
    }
    createFolder(parentFolderId, folderName) {
        throw new Error("Method not implemented.");
    }
    uploadFile(parentFolderId, fullFilePath, basename, mimeType) {
        throw new Error("Method not implemented.");
    }
    retrieveFileContentStream(fileId) {
        throw new Error("Method not implemented.");
    }
    renameFile(fileId, newName) {
        throw new Error("Method not implemented.");
    }
}
exports.AbstractMockFileProvider = AbstractMockFileProvider;
class EmptyMockFileProvider extends AbstractMockFileProvider {
}
exports.EmptyMockFileProvider = EmptyMockFileProvider;
//# sourceMappingURL=abstractFileProvider.test.js.map