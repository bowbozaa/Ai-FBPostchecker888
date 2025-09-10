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
const driveModel_1 = require("../../../drive/model/driveModel");
const driveTypes_1 = require("../../../drive/model/driveTypes");
const remotePathBuilder_1 = require("../../../drive/fileSystem/remotePathBuilder");
const abstractFileProvider_test_1 = require("../model/abstractFileProvider.test");
describe('Remote path manipulation', () => {
    it('Checks remote path building', () => __awaiter(void 0, void 0, void 0, function* () {
        const model = new driveModel_1.DriveModel(new MockFileProvider());
        yield model.listFiles('root');
        const pathBuilder = new remotePathBuilder_1.RemotePathBuilder();
        (0, chai_1.expect)('googledrive:///VSCode/subFolder/thirdFolder/myFile.txt#1Cdffsdfsdfsdfdfocz').to.equal(pathBuilder.buildRemotePathFromId(model, '1Cdffsdfsdfsdfdfocz'));
        (0, chai_1.expect)(undefined).to.equal(pathBuilder.buildRemotePathFromId(model, 'xxxxxx'));
    }));
});
class MockFileProvider extends abstractFileProvider_test_1.AbstractMockFileProvider {
    provideFiles(parentFolderId) {
        return new Promise((resolve) => {
            const firstFolder = { iconLink: 'http://www.mylink.com/folder', id: '1C7udIKXadsdssdsadsadsddsocz', name: 'VSCode', type: driveTypes_1.FileType.DIRECTORY, size: 0, createdTime: 1341393000000, modifiedTime: 1341393000000 };
            const secondFolder = { iconLink: 'http://www.mylink.com/folder', id: '1C7udIKXCkxsvXO37gvfbfbdfbHihn9wocz', name: 'subFolder', type: driveTypes_1.FileType.DIRECTORY, parent: firstFolder, size: 0, createdTime: 1341393000000, modifiedTime: 1341393000000 };
            const thirdFolder = { iconLink: 'http://www.mylink.com/folder', id: '1C7udIKXCkxsvXO37gCBpfaasqn9wocz', name: 'thirdFolder', type: driveTypes_1.FileType.DIRECTORY, parent: secondFolder, size: 0, createdTime: 1341393000000, modifiedTime: 1341393000000 };
            const finalFile = { iconLink: 'http://www.mylink.com/file', id: '1Cdffsdfsdfsdfdfocz', name: 'myFile.txt', type: driveTypes_1.FileType.FILE, parent: thirdFolder, size: 1325, createdTime: 1341393000000, modifiedTime: 1341393000000 };
            resolve([finalFile]);
        });
    }
}
//# sourceMappingURL=remotePathBuilder.test.js.map