"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriveFileSystemProvider = void 0;
const vscode_1 = require("vscode");
const driveTypes_1 = require("../model/driveTypes");
class DriveFileSystemProvider {
    constructor(model) {
        this.model = model;
        this._emitter = new vscode_1.EventEmitter();
        this.onDidChangeFile = this._emitter.event;
    }
    watch(uri, options) {
        return new vscode_1.Disposable(() => { });
    }
    stat(uri) {
        return new Promise((resolve, reject) => {
            const fileId = uri.fragment;
            const driveFile = this.model.getDriveFile(fileId);
            if (driveFile) {
                const fileStat = this.buildFileStat(driveFile);
                resolve(fileStat);
            }
            else {
                reject('File not found');
            }
        });
    }
    buildFileStat(driveFile) {
        const vscodeType = this.detectFileType(driveFile);
        const fileStat = {
            type: vscodeType,
            ctime: driveFile.createdTime,
            mtime: driveFile.modifiedTime,
            size: driveFile.size,
        };
        return fileStat;
    }
    detectFileType(driveFile) {
        const driveType = driveFile.type;
        const vsType = driveType == driveTypes_1.FileType.DIRECTORY ? vscode_1.FileType.Directory : vscode_1.FileType.File;
        return vsType;
    }
    readDirectory(uri) {
        throw new Error("Method not implemented.");
    }
    createDirectory(uri) {
        throw new Error("Method not implemented.");
    }
    readFile(uri) {
        return new Promise((resolve, reject) => {
            const fileId = uri.fragment;
            this.model.retrieveFileContentStream(fileId)
                .then(contentStream => {
                const byteArray = [];
                contentStream.on('data', d => byteArray.push(d));
                contentStream.on('end', () => {
                    const result = Buffer.concat(byteArray);
                    resolve(result);
                });
            }).catch(err => reject(err));
        });
    }
    writeFile(uri, content, options) {
        throw new Error("Method not implemented.");
    }
    delete(uri, options) {
        throw new Error("Method not implemented.");
    }
    rename(oldUri, newUri, options) {
        throw new Error("Method not implemented.");
    }
}
exports.DriveFileSystemProvider = DriveFileSystemProvider;
//# sourceMappingURL=driveFileSystemProvider.js.map