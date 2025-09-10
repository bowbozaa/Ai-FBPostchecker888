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
const folderSelector_1 = require("../../../drive/view/folderSelector");
const driveModel_1 = require("../../../drive/model/driveModel");
const driveTypes_1 = require("../../../drive/model/driveTypes");
const assert_1 = require("assert");
const abstractFileProvider_test_1 = require("../model/abstractFileProvider.test");
describe('Folder selection operations', () => {
    it('Test navigation through folders and select root', () => __awaiter(void 0, void 0, void 0, function* () {
        const pickProvider = new SelectSubFolderProvider();
        const model = new driveModel_1.DriveModel(new MockFileProvider());
        const folderSelector = new folderSelector_1.FolderSelector(model, pickProvider);
        const selection = yield folderSelector.askForDestinationFolder();
        (0, chai_1.expect)(selection).to.be.equal('sub-folder-id');
    }));
    it('Test cancel selection', () => __awaiter(void 0, void 0, void 0, function* () {
        const pickProvider = new CancelFirstFolderProvider();
        const model = new driveModel_1.DriveModel(new MockFileProvider());
        const folderSelector = new folderSelector_1.FolderSelector(model, pickProvider);
        const selection = yield folderSelector.askForDestinationFolder();
        (0, chai_1.expect)(selection).to.be.equal('');
    }));
});
class SelectSubFolderProvider {
    constructor() {
        this.count = 0;
    }
    showQuickPick(items) {
        return new Promise((resolve) => {
            switch (this.count++) {
                case 0:
                    // Go to subfolder
                    resolve(items[1]);
                    break;
                case 1:
                    // Go back to previous folder
                    resolve(items[1]);
                    break;
                case 2:
                    // Go again to subfolder
                    resolve(items[1]);
                    break;
                case 3:
                    // Select subfolder
                    resolve(items[0]);
                    break;
            }
        });
    }
}
class CancelFirstFolderProvider {
    constructor() {
        this.count = 0;
    }
    showQuickPick(items) {
        return new Promise((resolve) => {
            // Cancel selection
            resolve(undefined);
        });
    }
}
class MockFileProvider extends abstractFileProvider_test_1.AbstractMockFileProvider {
    provideFiles(parentFolderId) {
        return new Promise((resolve) => {
            const files = [];
            switch (parentFolderId) {
                case 'root':
                    files.push({ iconLink: 'http://www.mylink.com/folder', id: 'sub-folder-id', name: 'My Nice subfolder', type: driveTypes_1.FileType.DIRECTORY, size: 0, createdTime: 1341393000000, modifiedTime: 1341393000000 });
                    files.push({ iconLink: 'http://www.mylink.com/folder', id: '1C7udIKXCkxsvXO37gCBpfzrHihn7777z', name: 'Other folder', type: driveTypes_1.FileType.DIRECTORY, size: 0, createdTime: 1341393000000, modifiedTime: 1341393000000 });
                    files.push({ iconLink: 'http://www.mylink.com/csv', id: '1C7udIKXLkxsvXO37gCBpfzrHihn9wocz', name: 'myTable.csv', type: driveTypes_1.FileType.FILE, size: 1226, createdTime: 1341393000000, modifiedTime: 1341393000000 });
                    break;
                case 'sub-folder-id':
                    files.push({ iconLink: 'http://www.mylink.com/jpg', id: '1C7udIKXCkxsvjO37gCBpfzrHihn9wocz', name: 'myPicture.jpg', type: driveTypes_1.FileType.FILE, size: 17864, createdTime: 1341393000000, modifiedTime: 1341393000000 });
                    files.push({ iconLink: 'http://www.mylink.com/png', id: '1C7udIKXCkxsvXO47gCBpfzrHihn9wocz', name: 'myOtherPicture.png', type: driveTypes_1.FileType.FILE, size: 2145, createdTime: 1341393000000, modifiedTime: 1341393000000 });
                    files.push({ iconLink: 'http://www.mylink.com/bmp', id: '1C7udIKXCkxsvXO37gCBpfzDHihn9wocz', name: 'myThirdPicture.bmp', type: driveTypes_1.FileType.FILE, size: 8912674, createdTime: 1341393000000, modifiedTime: 1341393000000 });
                    break;
                default:
                    (0, assert_1.fail)('Invalid parent folder');
            }
            resolve(files);
        });
    }
}
//# sourceMappingURL=folderSelector.test.js.map