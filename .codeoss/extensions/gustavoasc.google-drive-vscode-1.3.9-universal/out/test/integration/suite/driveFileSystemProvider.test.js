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
const assert = require("assert");
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require("vscode");
const driveModel_1 = require("../../../drive/model/driveModel");
const driveTypes_1 = require("../../../drive/model/driveTypes");
const abstractFileProvider_test_1 = require("../../drive/model/abstractFileProvider.test");
const driveFileSystemProvider_1 = require("../../../drive/fileSystem/driveFileSystemProvider");
const fs = require("fs");
suite('Drive file system manipulation', () => {
    test('Checks retrieving file content from file system', () => __awaiter(void 0, void 0, void 0, function* () {
        const model = new driveModel_1.DriveModel(new MockFileProvider());
        yield model.listFiles('root');
        const uri = vscode.Uri.parse('googledrive:///VSCode/subFolder/thirdFolder/myFile.txt#1Cdffsdfsdfsdfdfocz');
        const driveFs = new driveFileSystemProvider_1.DriveFileSystemProvider(model);
        const content = yield driveFs.readFile(uri);
        assert.strictEqual('this is my content', content.toString());
    }));
    test('Checks file status from file system', () => __awaiter(void 0, void 0, void 0, function* () {
        const model = new driveModel_1.DriveModel(new MockFileProvider());
        yield model.listFiles('root');
        const uri = vscode.Uri.parse('googledrive:///VSCode/subFolder/thirdFolder/myFile.txt#1Cdffsdfsdfsdfdfocz');
        const driveFs = new driveFileSystemProvider_1.DriveFileSystemProvider(model);
        const fsStat = yield driveFs.stat(uri);
        assert.strictEqual(vscode.FileType.File, fsStat.type);
        assert.strictEqual(1361393000000, fsStat.ctime);
        assert.strictEqual(7341393000000, fsStat.mtime);
        assert.strictEqual(274, fsStat.size);
    }));
});
class MockFileProvider extends abstractFileProvider_test_1.AbstractMockFileProvider {
    provideFiles(parentFolderId) {
        return new Promise((resolve) => {
            const firstFolder = { iconLink: 'http://www.mylink.com/folder', id: '1C7udIKXadsdssdsadsadsddsocz', name: 'VSCode', type: driveTypes_1.FileType.DIRECTORY, size: 0, createdTime: 1341393000000, modifiedTime: 1341393000000 };
            const secondFolder = { iconLink: 'http://www.mylink.com/folder', id: '1C7udIKXCkxsvXO37gvfbfbdfbHihn9wocz', name: 'subFolder', type: driveTypes_1.FileType.DIRECTORY, parent: firstFolder, size: 0, createdTime: 1341393000000, modifiedTime: 1341393000000 };
            const thirdFolder = { iconLink: 'http://www.mylink.com/folder', id: '1C7udIKXCkxsvXO37gCBpfaasqn9wocz', name: 'thirdFolder', type: driveTypes_1.FileType.DIRECTORY, parent: secondFolder, size: 0, createdTime: 1341393000000, modifiedTime: 1341393000000 };
            const finalFile = { iconLink: 'http://www.mylink.com/file', id: '1Cdffsdfsdfsdfdfocz', name: 'myFile.txt', type: driveTypes_1.FileType.FILE, parent: thirdFolder, size: 274, createdTime: 1361393000000, modifiedTime: 7341393000000 };
            resolve([finalFile]);
        });
    }
    retrieveFileContentStream(fileId) {
        return new Promise((resolve, reject) => {
            assert.equal('1Cdffsdfsdfsdfdfocz', fileId);
            const contentStream = fs.createReadStream(__dirname + '/../../../../src/test/integration/suite/dummyText.txt');
            contentStream ? resolve(contentStream) : reject();
        });
    }
}
//# sourceMappingURL=driveFileSystemProvider.test.js.map