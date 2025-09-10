"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FolderSupport = void 0;
class FolderSupport {
    fireCommand(model, view, fileId) {
        view.showInputBox('Please type the folder name')
            .then((folderName) => {
            if (folderName) {
                const createFolderPromise = this.createFolderPromise(model, view, fileId, folderName);
                view.showProgressMessage(`Creating folder '${folderName}' on Google Drive. Please wait...`, createFolderPromise);
            }
            else {
                view.showWarningMessage(`'Create folder' process canceled by user.`);
            }
        });
    }
    createFolderPromise(model, view, fileId, folderName) {
        return new Promise((resolve, reject) => {
            model.createFolder(fileId, folderName)
                .then(_files => {
                view.showInformationMessage(`Folder '${folderName}' successfully created on Drive.`);
                view.refresh();
                resolve();
            })
                .catch(err => {
                view.showWarningMessage(err);
                reject(err);
            });
        });
    }
}
exports.FolderSupport = FolderSupport;
//# sourceMappingURL=folderSupport.js.map