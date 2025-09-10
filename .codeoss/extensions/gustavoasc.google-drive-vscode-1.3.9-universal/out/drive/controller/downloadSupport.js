"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DownloadSupport = void 0;
class DownloadSupport {
    fireCommand(model, view, fileId) {
        var _a;
        const driveFileName = (_a = model.getDriveFile(fileId)) === null || _a === void 0 ? void 0 : _a.name;
        view.askForLocalDestinationFolder(driveFileName)
            .then(destinationFile => {
            const downloadPromise = this.createDownloadPromise(model, view, fileId, destinationFile);
            view.showProgressMessage('Downloading file from Google Drive. Please wait...', downloadPromise);
        }).catch(() => view.showWarningMessage(`'Download file' process canceled by user.`));
    }
    createDownloadPromise(model, view, fileId, destinationFile) {
        return new Promise((resolve, reject) => {
            model.downloadFile(fileId, destinationFile)
                .then(() => {
                this.showDownloadFinishedMessage(view, destinationFile);
                resolve();
            }).catch(err => {
                const warningMessage = `A problem happened while downloading file. Message: '${err}'`;
                view.showWarningMessage(warningMessage);
                reject(err);
            });
        });
    }
    showDownloadFinishedMessage(view, destinationFile) {
        const openFileButton = 'Open file';
        view.showInformationMessage(`File successfully downloaded from Drive.`, openFileButton)
            .then((selectedButton) => {
            if (selectedButton === openFileButton) {
                view.openFile(destinationFile);
            }
        });
    }
}
exports.DownloadSupport = DownloadSupport;
//# sourceMappingURL=downloadSupport.js.map