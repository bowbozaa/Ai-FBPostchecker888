"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriveView = void 0;
const vscode_1 = require("vscode");
const folderSelector_1 = require("./folderSelector");
const vscodePickProvider_1 = require("./vscodePickProvider");
const driveTreeDataProvider_1 = require("./driveTreeDataProvider");
const vscodeNotificator_1 = require("./vscodeNotificator");
class DriveView {
    constructor(model) {
        this.model = model;
        this.folderSelector = new folderSelector_1.FolderSelector(this.model, new vscodePickProvider_1.VSCodePickProvider());
        this.notificator = new vscodeNotificator_1.VSCodeNotificator();
        this.driveTreeViewProvider = new driveTreeDataProvider_1.DriveTreeDataProvider(this.model, this.notificator);
    }
    askForRemoteDestinationFolder() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.folderSelector.askForDestinationFolder();
        });
    }
    askForLocalDestinationFolder(suggestedPath) {
        return new Promise((resolve, reject) => {
            const defaultUri = suggestedPath ? vscode_1.Uri.parse(suggestedPath) : undefined;
            const saveOptions = { defaultUri: defaultUri };
            vscode_1.window.showSaveDialog(saveOptions).then(uri => {
                uri ? resolve(uri.fsPath) : reject('No destination selected');
            });
        });
    }
    openFile(fullPath) {
        const options = this.defaultOpenOptions();
        vscode_1.commands.executeCommand('vscode.open', vscode_1.Uri.file(fullPath), options);
    }
    openUri(targetUri) {
        const options = this.defaultOpenOptions();
        vscode_1.commands.executeCommand('vscode.open', vscode_1.Uri.parse(targetUri), options);
    }
    defaultOpenOptions() {
        const options = {
            viewColumn: vscode_1.ViewColumn.Active,
            preview: false
        };
        return options;
    }
    refresh() {
        this.driveTreeViewProvider.refresh();
    }
    showProgressMessage(message, task) {
        this.notificator.showProgressMessage(message, task);
    }
    showInputBox(message, value) {
        const params = {
            placeHolder: message,
            value: value
        };
        return vscode_1.window.showInputBox(params);
    }
    showInformationMessage(message, ...items) {
        return this.notificator.showInformationMessage(message, ...items);
    }
    showWarningMessage(message) {
        this.notificator.showWarningMessage(message);
    }
}
exports.DriveView = DriveView;
//# sourceMappingURL=driveView.js.map