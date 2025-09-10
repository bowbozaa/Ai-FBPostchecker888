"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadSupport = void 0;
class UploadSupport {
    constructor(fullFileName) {
        this.fullFileName = fullFileName;
    }
    fireCommand(model, view, fileId) {
        const uploadPromise = this.createUploadPromise(model, view, fileId);
        view.showProgressMessage('Uploading file to Google Drive. Please wait...', uploadPromise);
    }
    createUploadPromise(model, view, parentID) {
        return new Promise((resolve, reject) => {
            model.uploadFile(parentID, this.fullFileName)
                .then((basename) => {
                view.showInformationMessage(`File '${basename}' successfully uploaded to Drive.`);
                view.refresh();
                resolve();
            }).catch(err => {
                view.showWarningMessage(err === null || err === void 0 ? void 0 : err.message);
                reject(err);
            });
        });
    }
}
exports.UploadSupport = UploadSupport;
//# sourceMappingURL=uploadSupport.js.map