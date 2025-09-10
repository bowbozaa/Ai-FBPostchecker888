"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadFolderSupport = void 0;
class UploadFolderSupport {
    constructor(fullFileName) {
        this.fullFileName = fullFileName;
    }
    fireCommand(model, view, fileId) {
        const uploadPromise = this.createUploadPromise(model, view, fileId);
        view.showProgressMessage('Zipping folder and uploading to Google Drive. Please wait...', uploadPromise);
    }
    createUploadPromise(model, view, parentID) {
        return new Promise((resolve, reject) => {
            model.uploadFolder(parentID, this.fullFileName)
                .then((basename) => {
                view.showInformationMessage(`Folder '${basename}' successfully zipped and uploaded to Drive.`);
                view.refresh();
                resolve();
            }).catch(err => {
                view.showWarningMessage(err);
                reject(err);
            });
        });
    }
}
exports.UploadFolderSupport = UploadFolderSupport;
//# sourceMappingURL=uploadFolderSupport.js.map