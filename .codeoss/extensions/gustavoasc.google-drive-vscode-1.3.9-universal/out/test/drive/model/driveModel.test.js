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
const chai_1 = require("chai");
require("mocha");
const assert_1 = require("assert");
const driveModel_1 = require("../../../drive/model/driveModel");
const driveTypes_1 = require("../../../drive/model/driveTypes");
const path = require("path");
const fs = require("fs");
const stream_1 = require("stream");
describe('Drive model operations', () => {
    it('List all files and folders from existing parent', () => __awaiter(void 0, void 0, void 0, function* () {
        const model = new driveModel_1.DriveModel(new MockFileProvider());
        const files = yield model.listFiles('abcdefghi');
        const names = ['VSCode', 'TCC.pdf', 'myFile.txt', 'Other folder', 'myTable.csv', 'myPicture.jpg', 'myOtherPicture.png', 'myThirdPicture.bmp'];
        compareFileNames(files, names);
        compareParent(files, undefined);
        // Lists the subfolder 'VSCode'
        const vscodeFiles = yield model.listFiles('1C7udIKXCkxsvXO37gCBpfzrHihn9wocz');
        const vscodeNames = ['Subfolder', 'A.pdf', 'B.txt'];
        const vscodeFolderItself = model.getDriveFile('1C7udIKXCkxsvXO37gCBpfzrHihn9wocz');
        compareFileNames(vscodeFiles, vscodeNames);
        compareParent(vscodeFiles, vscodeFolderItself);
    }));
    it('List only folders from existing parent', () => __awaiter(void 0, void 0, void 0, function* () {
        const model = new driveModel_1.DriveModel(new MockFileProvider());
        const files = yield model.listOnlyFolders('abcdefghi');
        const names = ['VSCode', 'Other folder'];
        compareFileNames(files, names);
    }));
    it('List all files and folders from inexisting parent', () => __awaiter(void 0, void 0, void 0, function* () {
        const model = new driveModel_1.DriveModel(new MockFileProvider());
        const files = yield model.listFiles('xxxxxx');
        (0, chai_1.expect)(files.length).to.equal(0);
    }));
    it('List only folders from inexisting parent', () => __awaiter(void 0, void 0, void 0, function* () {
        const model = new driveModel_1.DriveModel(new MockFileProvider());
        const files = yield model.listOnlyFolders('xxxxxx');
        (0, chai_1.expect)(files.length).to.equal(0);
    }));
    it('Create folder', () => __awaiter(void 0, void 0, void 0, function* () {
        const model = new driveModel_1.DriveModel(new MockFileProvider());
        yield model.createFolder('abcdefghi', 'Nice folder');
        const fileNames = ['VSCode', 'TCC.pdf', 'myFile.txt', 'Other folder', 'myTable.csv', 'myPicture.jpg', 'myOtherPicture.png', 'myThirdPicture.bmp', 'Nice folder'];
        const files = yield model.listFiles('abcdefghi');
        compareFileNames(files, fileNames);
        const folderNames = ['VSCode', 'Other folder', 'Nice folder'];
        const folders = yield model.listOnlyFolders('abcdefghi');
        compareFileNames(folders, folderNames);
    }));
    it('Upload file', () => __awaiter(void 0, void 0, void 0, function* () {
        const model = new driveModel_1.DriveModel(new MockFileProvider());
        let baseName = yield model.uploadFile('abcdefghi', path.join(__dirname, 'mockFile.txt'));
        (0, chai_1.expect)(baseName).to.equal('mockFile.txt');
        baseName = yield model.uploadFile('abcdefghi', path.join(__dirname, 'mockPdf.pdf'));
        (0, chai_1.expect)(baseName).to.equal('mockPdf.pdf');
        baseName = yield model.uploadFile('abcdefghi', path.join(__dirname, 'mockImage.jpg'));
        (0, chai_1.expect)(baseName).to.equal('mockImage.jpg');
        baseName = yield model.uploadFile('abcdefghi', path.join(__dirname, 'mockImage.png'));
        (0, chai_1.expect)(baseName).to.equal('mockImage.png');
        baseName = yield model.uploadFile('abcdefghi', path.join(__dirname, 'mockWithoutExt'));
        (0, chai_1.expect)(baseName).to.equal('mockWithoutExt');
    }));
    it('Download file', () => __awaiter(void 0, void 0, void 0, function* () {
        const model = new driveModel_1.DriveModel(new MockFileProvider());
        const destination = path.join(__dirname, 'dummyDownloadedFile' + getRandomInt(0, 100) + '.txt');
        yield model.downloadFile('1C7udIKXCkxsvjO37gCBpfzrHihn9wocz', destination);
        fs.readFile(destination, (err, data) => {
            if (err)
                (0, assert_1.fail)(err);
            (0, chai_1.expect)(data.toString()).to.equal('done writing data');
            fs.unlinkSync(destination);
        });
    }));
    it('Download file on invalid location', () => __awaiter(void 0, void 0, void 0, function* () {
        const model = new driveModel_1.DriveModel(new MockFileProvider());
        const destination = '/???????///\\\\////invalid-destination/file.txt';
        try {
            yield model.downloadFile('1C7udIKXCkxsvjO37gCBpfzrHihn9wocz', destination);
            (0, assert_1.fail)('Should have rejected');
        }
        catch (error) {
            (0, chai_1.expect)(error).to.equal(`ENOENT: no such file or directory, open '/???????///\\\\////invalid-destination/file.txt'`);
        }
    }));
    it('Rename file', () => __awaiter(void 0, void 0, void 0, function* () {
        const model = new driveModel_1.DriveModel(new MockFileProvider());
        yield model.listFiles('abcdefghi');
        yield model.renameFile('1C7udIKXCkxsvjO37gCBpfzrHihn9wocz', 'novoNome.png');
        const driveFile = model.getDriveFile('1C7udIKXCkxsvjO37gCBpfzrHihn9wocz');
        (0, chai_1.expect)(driveFile === null || driveFile === void 0 ? void 0 : driveFile.name).to.equal('novoNome.png');
    }));
});
function compareFileNames(files, names) {
    (0, chai_1.expect)(files.length).to.equal(names.length);
    for (let i = 0; i < files.length; i++) {
        (0, chai_1.expect)(files[i].name).to.equal(names[i]);
    }
}
function compareParent(files, parent) {
    for (let i = 0; i < files.length; i++) {
        (0, chai_1.expect)(files[i].parent).to.equal(parent);
    }
}
class MockFileProvider {
    constructor() {
        this.dummyFiles = [];
        this.counter = 0;
        this.dummyFiles.push({ iconLink: 'http://www.mylink.com/folder', id: '1C7udIKXCkxsvXO37gCBpfzrHihn9wocz', name: 'VSCode', type: driveTypes_1.FileType.DIRECTORY, size: 0, createdTime: 1341393000000, modifiedTime: 1341393000000 });
        this.dummyFiles.push({ iconLink: 'http://www.mylink.com/pdf', id: '5C7udIKXCkxsvXO37gCBpfzrHihn9wocz', name: 'TCC.pdf', type: driveTypes_1.FileType.FILE, size: 162, createdTime: 1341393000000, modifiedTime: 1341393000000 });
        this.dummyFiles.push({ iconLink: 'http://www.mylink.com/txt', id: 'sC7udIKxCkxsvXO37gCBpfzrHihn9wocz', name: 'myFile.txt', type: driveTypes_1.FileType.FILE, size: 274, createdTime: 1341393000000, modifiedTime: 1341393000000 });
        this.dummyFiles.push({ iconLink: 'http://www.mylink.com/folder', id: '1C7udIKXCkxsvXO37gCBpfzrHihn7777z', name: 'Other folder', type: driveTypes_1.FileType.DIRECTORY, size: 0, createdTime: 1341393000000, modifiedTime: 1341393000000 });
        this.dummyFiles.push({ iconLink: 'http://www.mylink.com/csv', id: '1C7udIKXLkxsvXO37gCBpfzrHihn9wocz', name: 'myTable.csv', type: driveTypes_1.FileType.FILE, size: 184, createdTime: 1341393000000, modifiedTime: 1341393000000 });
        this.dummyFiles.push({ iconLink: 'http://www.mylink.com/jpg', id: '1C7udIKXCkxsvjO37gCBpfzrHihn9wocz', name: 'myPicture.jpg', type: driveTypes_1.FileType.FILE, size: 155, createdTime: 1341393000000, modifiedTime: 1341393000000 });
        this.dummyFiles.push({ iconLink: 'http://www.mylink.com/png', id: '1C7udIKXCkxsvXO47gCBpfzrHihn9wocz', name: 'myOtherPicture.png', type: driveTypes_1.FileType.FILE, size: 10, createdTime: 1341393000000, modifiedTime: 1341393000000 });
        this.dummyFiles.push({ iconLink: 'http://www.mylink.com/bmp', id: '1C7udIKXCkxsvXO37gCBpfzDHihn9wocz', name: 'myThirdPicture.bmp', type: driveTypes_1.FileType.FILE, size: 27654, createdTime: 1341393000000, modifiedTime: 1341393000000 });
    }
    provideFiles(parentFolderId) {
        return new Promise((resolve, _reject) => {
            if (parentFolderId === 'abcdefghi') {
                resolve(this.dummyFiles);
            }
            else {
                if (parentFolderId === '1C7udIKXCkxsvXO37gCBpfzrHihn9wocz') {
                    const vscodeFiles = [];
                    vscodeFiles.push({ iconLink: 'http://www.mylink.com/folder', id: 'AC7udIKXCkxsvXO37gCBpfzrHihn9wocz', name: 'Subfolder', type: driveTypes_1.FileType.DIRECTORY, size: 0, createdTime: 1341393000000, modifiedTime: 1341393000000 });
                    vscodeFiles.push({ iconLink: 'http://www.mylink.com/pdf', id: 'BC7udIKXCkxsvXO37gCBpfzrHihn9wocz', name: 'A.pdf', type: driveTypes_1.FileType.FILE, size: 124, createdTime: 1341393000000, modifiedTime: 1341393000000 });
                    vscodeFiles.push({ iconLink: 'http://www.mylink.com/txt', id: 'CC7udIKxCkxsvXO37gCBpfzrHihn9wocz', name: 'B.txt', type: driveTypes_1.FileType.FILE, size: 55, createdTime: 1341393000000, modifiedTime: 1341393000000 });
                    resolve(vscodeFiles);
                }
                else {
                    resolve([]);
                }
            }
        });
    }
    createFolder(parentFolderId, folderName) {
        return new Promise((resolve) => {
            (0, chai_1.expect)(parentFolderId).to.equal('abcdefghi');
            this.dummyFiles.push({ iconLink: 'http://www.mylink.com/folder', id: 'dummyFolderId', name: folderName, type: driveTypes_1.FileType.DIRECTORY, size: 0, createdTime: 1341393000000, modifiedTime: 1341393000000 });
            resolve();
        });
    }
    uploadFile(parentFolderId, fullFilePath, basename, mimeType) {
        return new Promise((resolve) => {
            switch (this.counter++) {
                case 0:
                    (0, chai_1.expect)(parentFolderId).to.equal('abcdefghi');
                    (0, chai_1.expect)(fullFilePath).to.equal(path.join(__dirname, 'mockFile.txt'));
                    (0, chai_1.expect)(basename).to.equal('mockFile.txt');
                    (0, chai_1.expect)(mimeType).to.equal('text/plain');
                    break;
                case 1:
                    (0, chai_1.expect)(parentFolderId).to.equal('abcdefghi');
                    (0, chai_1.expect)(fullFilePath).to.equal(path.join(__dirname, 'mockPdf.pdf'));
                    (0, chai_1.expect)(basename).to.equal('mockPdf.pdf');
                    (0, chai_1.expect)(mimeType).to.equal('application/pdf');
                    break;
                case 2:
                    (0, chai_1.expect)(parentFolderId).to.equal('abcdefghi');
                    (0, chai_1.expect)(fullFilePath).to.equal(path.join(__dirname, 'mockImage.jpg'));
                    (0, chai_1.expect)(basename).to.equal('mockImage.jpg');
                    (0, chai_1.expect)(mimeType).to.equal('image/jpeg');
                    break;
                case 3:
                    (0, chai_1.expect)(parentFolderId).to.equal('abcdefghi');
                    (0, chai_1.expect)(fullFilePath).to.equal(path.join(__dirname, 'mockImage.png'));
                    (0, chai_1.expect)(basename).to.equal('mockImage.png');
                    (0, chai_1.expect)(mimeType).to.equal('image/png');
                    break;
                case 4:
                    (0, chai_1.expect)(parentFolderId).to.equal('abcdefghi');
                    (0, chai_1.expect)(fullFilePath).to.equal(path.join(__dirname, 'mockWithoutExt'));
                    (0, chai_1.expect)(basename).to.equal('mockWithoutExt');
                    (0, chai_1.expect)(mimeType).to.equal('text/plain');
                    break;
            }
            resolve();
        });
    }
    retrieveFileContentStream(fileId) {
        return new Promise((resolve, reject) => {
            (0, chai_1.expect)(fileId).to.equal('1C7udIKXCkxsvjO37gCBpfzrHihn9wocz');
            const contentStream = stream_1.Readable.from('done writing data');
            contentStream ? resolve(contentStream) : reject();
        });
    }
    renameFile(fileId, newName) {
        return new Promise((resolve) => {
            (0, chai_1.expect)(fileId).to.equal('1C7udIKXCkxsvjO37gCBpfzrHihn9wocz');
            (0, chai_1.expect)(newName).to.equal('novoNome.png');
            resolve();
        });
    }
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//# sourceMappingURL=driveModel.test.js.map