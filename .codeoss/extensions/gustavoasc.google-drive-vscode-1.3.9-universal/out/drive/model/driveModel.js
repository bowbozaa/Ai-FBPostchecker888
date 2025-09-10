"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriveModel = void 0;
const driveTypes_1 = require("./driveTypes");
const mime = require("mime-types");
const path = require("path");
const fs = require("fs");
const folderZipper_1 = require("./folderZipper");
class DriveModel {
    constructor(fileProvider) {
        this.fileProvider = fileProvider;
        this.cachedFiles = new Map();
    }
    listOnlyFolders(parentFolderId) {
        return new Promise((resolve, reject) => {
            this.listFiles(parentFolderId).then(allFilesFromParent => {
                const onlyFolders = allFilesFromParent.filter(f => f.type == driveTypes_1.FileType.DIRECTORY);
                resolve(onlyFolders);
            }).catch(err => reject(err));
        });
    }
    listFiles(parentFolderId) {
        return new Promise((resolve, reject) => {
            this.fileProvider.provideFiles(parentFolderId).then(files => {
                this.defineParentForFiles(parentFolderId, files);
                this.updateCurrentInfo(files);
                resolve(files);
            }).catch(err => reject(err));
        });
    }
    defineParentForFiles(parentFolderId, files) {
        const parentFolder = this.getDriveFile(parentFolderId);
        if (parentFolder) {
            files.forEach(f => f.parent = parentFolder);
        }
    }
    updateCurrentInfo(files) {
        files.forEach((file) => this.cachedFiles.set(file.id, file));
    }
    createFolder(parentFolderId, folderName) {
        return new Promise((resolve, reject) => {
            this.fileProvider.createFolder(parentFolderId, folderName)
                .then(() => resolve())
                .catch((err) => reject(err));
        });
    }
    uploadFolder(parentFolderId, folderPath) {
        return new Promise((resolve, reject) => {
            const basename = path.basename(folderPath);
            if (!fs.existsSync(folderPath)) {
                return reject(`Folder '${basename}' does not exist. Impossible to proceed with upload operation.`);
            }
            new folderZipper_1.FolderZipper().zipToTemp(folderPath)
                .then(zipFullName => {
                // Uploads the temp zip file and deletes it at the end
                this.uploadFile(parentFolderId, zipFullName)
                    .then(() => {
                    fs.unlinkSync(zipFullName);
                    resolve(basename);
                }).catch(err => {
                    fs.unlinkSync(zipFullName);
                    reject(err);
                });
            }).catch(err => reject(err));
        });
    }
    uploadFile(parentFolderId, fullFileName) {
        return new Promise((resolve, reject) => {
            const basename = path.basename(fullFileName);
            const mimeType = mime.lookup(fullFileName) || 'text/plain';
            if (!fs.existsSync(fullFileName)) {
                return reject(`File '${basename}' does not exist. Impossible to proceed with upload operation.`);
            }
            if (fs.statSync(fullFileName).isDirectory()) {
                return reject(`'${basename}' is a directory. This extension currently does not support uploading directories to Google Drive.`);
            }
            this.fileProvider.uploadFile(parentFolderId, fullFileName, basename, mimeType)
                .then(() => resolve(basename))
                .catch(err => reject(err));
        });
    }
    retrieveFileContentStream(fileId) {
        return new Promise((resolve, reject) => {
            this.fileProvider.retrieveFileContentStream(fileId)
                .then(contentStream => resolve(contentStream))
                .catch(err => reject(err));
        });
    }
    downloadFile(fileId, destionationPath) {
        return new Promise((resolve, reject) => {
            this.fileProvider.retrieveFileContentStream(fileId)
                .then(contentStream => {
                // Prepares the stream to write data on disk
                const writeStream = fs.createWriteStream(destionationPath)
                    .on('error', (err) => {
                    const message = err === null || err === void 0 ? void 0 : err.message;
                    const finalMessage = message ? message : 'Unknown error';
                    reject(finalMessage);
                })
                    .on('close', () => resolve());
                // Flushes the input data to disk
                contentStream.pipe(writeStream);
            })
                .catch(err => reject(err));
        });
    }
    renameFile(fileId, newName) {
        return new Promise((resolve, reject) => {
            this.fileProvider.renameFile(fileId, newName)
                .then(() => {
                const driveFile = this.getDriveFile(fileId);
                if (driveFile) {
                    driveFile.name = newName;
                }
                resolve();
            }).catch(err => reject(err));
        });
    }
    getDriveFile(id) {
        return this.cachedFiles.get(id);
    }
    getDriveFileFromName(name) {
        let driveFile;
        this.cachedFiles.forEach((value, key) => {
            if (!driveFile && value.name === name) {
                driveFile = value;
            }
        });
        return driveFile;
    }
}
exports.DriveModel = DriveModel;
//# sourceMappingURL=driveModel.js.map