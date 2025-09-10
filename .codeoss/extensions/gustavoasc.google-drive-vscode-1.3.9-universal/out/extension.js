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
exports.deactivate = exports.uploadSelectedFile = exports.activate = exports.CREATE_FOLDER_COMMAND = exports.CONFIGURE_CREDENTIALS_COMMAND = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const driveController_1 = require("./drive/controller/driveController");
const driveModel_1 = require("./drive/model/driveModel");
const googleDriveFileProvider_1 = require("./drive/model/googleDriveFileProvider");
const driveAuthenticator_1 = require("./auth/driveAuthenticator");
const credentialsConfigurator_1 = require("./credentialsConfigurator");
const driveFileSystemProvider_1 = require("./drive/fileSystem/driveFileSystemProvider");
const fileSystemConstants_1 = require("./drive/fileSystem/fileSystemConstants");
const driveView_1 = require("./drive/view/driveView");
const credentialsManager_1 = require("./drive/credentials/credentialsManager");
const vscodeClipboardProvider_1 = require("./vscodeClipboardProvider");
const secretStorageCredentialsProvider_1 = require("./drive/credentials/secretStorageCredentialsProvider");
exports.CONFIGURE_CREDENTIALS_COMMAND = 'google.drive.configureCredentials';
exports.CREATE_FOLDER_COMMAND = 'google.drive.createFolder';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate({ subscriptions, secrets }) {
    const credentialsManager = new credentialsManager_1.CredentialsManager(new secretStorageCredentialsProvider_1.SecretStorageCredentialsProvider(secrets));
    const driveAuthenticator = new driveAuthenticator_1.DriveAuthenticator(credentialsManager);
    const credentialsConfigurator = new credentialsConfigurator_1.CredentialsConfigurator(driveAuthenticator);
    const googleFileProvider = new googleDriveFileProvider_1.GoogleDriveFileProvider(driveAuthenticator);
    const model = new driveModel_1.DriveModel(googleFileProvider);
    const driveView = new driveView_1.DriveView(model);
    const controller = new driveController_1.DriveController(model, driveView);
    vscode.workspace.registerFileSystemProvider(fileSystemConstants_1.DRIVE_SCHEME, new driveFileSystemProvider_1.DriveFileSystemProvider(model), { isReadonly: true });
    subscriptions.push(vscode.commands.registerCommand(exports.CONFIGURE_CREDENTIALS_COMMAND, () => {
        credentialsConfigurator.configureCredentials();
    }));
    subscriptions.push(vscode.commands.registerCommand('google.drive.fetchFiles', () => {
        controller.listFiles('root');
    }));
    subscriptions.push(vscode.commands.registerCommand('google.drive.uploadOpenFile', () => {
        uploadOpenFile(controller);
    }));
    subscriptions.push(vscode.commands.registerCommand(exports.CREATE_FOLDER_COMMAND, (parentId) => __awaiter(this, void 0, void 0, function* () {
        controller.createFolder(parentId);
    })));
    subscriptions.push(vscode.commands.registerCommand('google.drive.uploadSelectedFile', (selectedFile) => {
        uploadSelectedFile(selectedFile, controller);
    }));
    subscriptions.push(vscode.commands.registerCommand('google.drive.uploadToFolderSelectedOnView', (selectedFolderId) => {
        uploadToFolderSelectedOnView(selectedFolderId, controller);
    }));
    subscriptions.push(vscode.commands.registerCommand('google.drive.download', (selectedFileId) => {
        downloadSelectedFile(selectedFileId, controller);
    }));
    subscriptions.push(vscode.commands.registerCommand('google.drive.rename', (selectedFileId) => {
        renameSelectedFile(selectedFileId, controller);
    }));
    subscriptions.push(vscode.commands.registerCommand('google.drive.copyurl', (selectedFileId) => {
        copyUrlToClipboard(selectedFileId, controller);
    }));
    subscriptions.push(vscode.commands.registerCommand('google.drive.openFile', (selectedFileId) => {
        openRemoteFile(selectedFileId, controller);
    }));
    subscriptions.push(vscode.commands.registerCommand('google.drive.uploadWorkspace', () => {
        uploadWorkspace(controller);
    }));
    credentialsConfigurator.checkCredentialsConfigured();
}
exports.activate = activate;
function uploadOpenFile(controller) {
    var _a;
    const fileUri = (_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document.uri;
    if (fileUri) {
        controller.uploadFileAndAskFolder(fileUri.scheme, fileUri.fsPath);
    }
    else {
        vscode.window.showWarningMessage('There is no file open to upload to Drive.');
    }
}
function uploadSelectedFile(selectedFile, controller) {
    if (selectedFile && selectedFile.scheme && selectedFile.fsPath) {
        controller.uploadFileAndAskFolder(selectedFile.scheme, selectedFile.fsPath);
    }
    else {
        vscode.window.showInformationMessage('Please select a file on Explorer view, which will be uploaded to Google Drive.');
    }
}
exports.uploadSelectedFile = uploadSelectedFile;
function uploadToFolderSelectedOnView(selectedFolderId, controller) {
    if (selectedFolderId) {
        return vscode.window.showOpenDialog({}).then(files => {
            if (files && files.length > 0) {
                const selectedFile = files[0].fsPath;
                controller.uploadFileToFolder(selectedFile, selectedFolderId);
            }
        });
    }
}
function downloadSelectedFile(selectedFile, controller) {
    // Checks whether the command was fired from editor/title bar, once file preview is open
    if (selectedFile instanceof vscode.Uri) {
        controller.downloadFile(selectedFile.fragment);
    }
    else {
        // Checks whether the command was fired with the file ID, from tree view
        if (selectedFile) {
            controller.downloadFile(selectedFile);
        }
        else {
            vscode.window.showWarningMessage('This command can only be directly used from Google Drive view.');
        }
    }
}
function renameSelectedFile(selectedFileId, controller) {
    if (selectedFileId) {
        controller.renameFile(selectedFileId);
    }
    else {
        vscode.window.showWarningMessage('This command can only be directly used from Google Drive view.');
    }
}
function copyUrlToClipboard(selectedFileId, controller) {
    if (selectedFileId) {
        controller.copyUrlToClipboard(new vscodeClipboardProvider_1.VscodeClipboardProvider(), selectedFileId);
    }
    else {
        vscode.window.showWarningMessage('This command can only be directly used from Google Drive view.');
    }
}
function openRemoteFile(selectedFileId, controller) {
    if (selectedFileId) {
        controller.openRemoteFile(selectedFileId);
    }
    else {
        vscode.window.showWarningMessage('This command can only be directly used from Google Drive view.');
    }
}
function uploadWorkspace(controller) {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders && workspaceFolders[0]) {
        const workspace = workspaceFolders[0];
        controller.uploadFolder(workspace.uri.fsPath);
    }
    else {
        vscode.window.showWarningMessage('Please open a Workspace before using this command.');
    }
}
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map