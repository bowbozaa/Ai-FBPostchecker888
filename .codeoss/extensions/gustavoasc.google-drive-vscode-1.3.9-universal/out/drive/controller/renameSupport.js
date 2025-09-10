"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenameSupport = void 0;
const driveTypes_1 = require("../model/driveTypes");
class RenameSupport {
    fireCommand(model, view, fileId) {
        const driveFile = model.getDriveFile(fileId);
        if (driveFile) {
            const typeText = driveTypes_1.DriveFileUtils.extractTextFromType(driveFile.type);
            const oldName = driveFile.name;
            view.showInputBox(`Please type the new ${typeText} name`, oldName)
                .then((newName) => {
                if (newName && newName !== oldName) {
                    const renamePromise = this.createRenamePromise(model, view, fileId, oldName, newName);
                    view.showProgressMessage('Renaming file on Google Drive. Please wait...', renamePromise);
                }
            });
        }
    }
    createRenamePromise(model, view, fileId, oldName, newName) {
        return new Promise((resolve, reject) => {
            model.renameFile(fileId, newName)
                .then(() => {
                view.showInformationMessage(`'${oldName}' successfully renamed to '${newName}' on Drive.`);
                view.refresh();
                resolve();
            }).catch((err) => {
                view.showWarningMessage(err === null || err === void 0 ? void 0 : err.message);
                reject();
            });
        });
    }
}
exports.RenameSupport = RenameSupport;
//# sourceMappingURL=renameSupport.js.map