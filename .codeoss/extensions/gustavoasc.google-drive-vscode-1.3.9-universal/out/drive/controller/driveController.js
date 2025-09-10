"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriveController = void 0;
const downloadSupport_1 = require("./downloadSupport");
const renameSupport_1 = require("./renameSupport");
const uploadSupport_1 = require("./uploadSupport");
const folderSupport_1 = require("./folderSupport");
const openRemoteFileSupport_1 = require("./openRemoteFileSupport");
const fileSystemConstants_1 = require("../fileSystem/fileSystemConstants");
const uploadFolderSupport_1 = require("./uploadFolderSupport");
const CopyToClipboardSupport_1 = require("./CopyToClipboardSupport");
class DriveController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        // Support controllers
        this.downloadSupport = new downloadSupport_1.DownloadSupport();
        this.renameSupport = new renameSupport_1.RenameSupport();
        this.folderSupport = new folderSupport_1.FolderSupport();
        this.openSupport = new openRemoteFileSupport_1.OpenRemoteFileSupport();
    }
    listFiles(parentFolderId) {
        this.model.listFiles(parentFolderId)
            .then(_files => this.view.refresh())
            .catch(err => this.view.showWarningMessage(err));
    }
    createFolder(parentFolderId) {
        const finalId = parentFolderId ? parentFolderId : 'root';
        this.fireCommand(this.folderSupport, finalId);
    }
    uploadFileAndAskFolder(scheme, fullFileName) {
        if (scheme === fileSystemConstants_1.DRIVE_SCHEME) {
            this.view.showWarningMessage(`It's not possible to proceed with upload operation since file is already on Google Drive.`);
        }
        else {
            this.view.askForRemoteDestinationFolder()
                .then(parentId => {
                if (parentId) {
                    this.uploadFileToFolder(fullFileName, parentId);
                }
                else {
                    this.view.showWarningMessage(`'Upload file' process canceled by user.`);
                }
            }).catch(err => this.view.showWarningMessage(err));
        }
    }
    uploadFileToFolder(fullFileName, folderId) {
        const uploadSupport = new uploadSupport_1.UploadSupport(fullFileName);
        this.fireCommand(uploadSupport, folderId);
    }
    uploadFolder(folderPath) {
        this.view.askForRemoteDestinationFolder()
            .then(parentId => {
            if (parentId) {
                const uploadSupport = new uploadFolderSupport_1.UploadFolderSupport(folderPath);
                this.fireCommand(uploadSupport, parentId);
            }
            else {
                this.view.showWarningMessage(`'Upload folder' process canceled by user.`);
            }
        }).catch(err => this.view.showWarningMessage(err));
    }
    downloadFile(fileId) {
        this.fireCommand(this.downloadSupport, fileId);
    }
    renameFile(fileId) {
        this.fireCommand(this.renameSupport, fileId);
    }
    copyUrlToClipboard(clipboardProvider, fileId) {
        const copyToClipboardSupport = new CopyToClipboardSupport_1.CopyToClipboardSupport(clipboardProvider);
        this.fireCommand(copyToClipboardSupport, fileId);
    }
    openRemoteFile(fileId) {
        this.fireCommand(this.openSupport, fileId);
    }
    fireCommand(support, fileId) {
        support.fireCommand(this.model, this.view, fileId);
    }
}
exports.DriveController = DriveController;
//# sourceMappingURL=driveController.js.map