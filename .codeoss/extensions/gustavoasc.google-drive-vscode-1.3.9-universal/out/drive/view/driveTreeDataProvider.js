"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriveTreeDataProvider = void 0;
const vscode_1 = require("vscode");
const driveTypes_1 = require("../model/driveTypes");
const extension_1 = require("../../extension");
class DriveTreeDataProvider {
    constructor(model, notificator) {
        this.model = model;
        this.notificator = notificator;
        /** Helper objects to refresh UI when a new monitor is added */
        this._onDidChangeTreeData = new vscode_1.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        vscode_1.window.registerTreeDataProvider('driveView', this);
    }
    refresh() {
        this._onDidChangeTreeData.fire('');
    }
    askToCreateFolderOnRoot() {
        const yesButton = 'Yes';
        this.notificator.showInformationMessage(`It looks like you don't have any folder on Google Drive accessible from this extension. Do you want to create a folder on Google Drive now?`, yesButton, 'No')
            .then(selectedButton => {
            if (selectedButton === yesButton) {
                vscode_1.commands.executeCommand(extension_1.CREATE_FOLDER_COMMAND);
            }
        });
    }
    extractFileIds(files) {
        const result = files.map(f => f.id);
        return result;
    }
    buildItemFromDriveFile(currentFile) {
        const iconUri = vscode_1.Uri.parse(currentFile.iconLink);
        const collapsible = this.detectCollapsibleState(currentFile);
        const contextValue = driveTypes_1.DriveFileUtils.extractTextFromType(currentFile.type);
        return {
            iconPath: iconUri,
            label: currentFile.name,
            collapsibleState: collapsible,
            contextValue: contextValue
        };
    }
    detectCollapsibleState(currentFile) {
        const collapsible = currentFile.type == driveTypes_1.FileType.DIRECTORY ?
            vscode_1.TreeItemCollapsibleState.Collapsed :
            vscode_1.TreeItemCollapsibleState.None;
        return collapsible;
    }
    //------- Interface methods
    getTreeItem(id) {
        const currentFile = this.model.getDriveFile(id);
        return currentFile ? this.buildItemFromDriveFile(currentFile) : {};
    }
    getChildren(id) {
        return new Promise((resolve, reject) => {
            const currentFileId = id ? id : 'root';
            this.model.listFiles(currentFileId)
                .then(files => {
                if (currentFileId === 'root' && files.length === 0) {
                    this.askToCreateFolderOnRoot();
                }
                resolve(this.extractFileIds(files));
            }).catch(err => reject(err));
        });
    }
}
exports.DriveTreeDataProvider = DriveTreeDataProvider;
//# sourceMappingURL=driveTreeDataProvider.js.map