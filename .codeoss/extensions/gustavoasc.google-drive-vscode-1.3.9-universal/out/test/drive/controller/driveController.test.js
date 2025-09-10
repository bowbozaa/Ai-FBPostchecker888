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
const driveController_1 = require("../../../drive/controller/driveController");
const abstractFileProvider_test_1 = require("../model/abstractFileProvider.test");
const fileSystemConstants_1 = require("../../../drive/fileSystem/fileSystemConstants");
const abstractDriveView_test_1 = require("../view/abstractDriveView.test");
const driveTypes_1 = require("../../../drive/model/driveTypes");
const abstractFileProvider_test_2 = require("../model/abstractFileProvider.test");
describe('Drive controller operations', () => {
    it('Uploads file with invalid scheme', () => {
        const model = new driveModel_1.DriveModel(new abstractFileProvider_test_1.EmptyMockFileProvider());
        const view = new WrongSchemeDriveView();
        const controller = new driveController_1.DriveController(model, view);
        controller.uploadFileAndAskFolder(fileSystemConstants_1.DRIVE_SCHEME, './extension.ts');
        (0, chai_1.expect)(true).to.equal(view.warningShown);
    });
    it('Uploads file with valid scheme but user canceled', () => {
        const model = new driveModel_1.DriveModel(new abstractFileProvider_test_1.EmptyMockFileProvider());
        const view = new UploadCanceledDriveView();
        const controller = new driveController_1.DriveController(model, view);
        controller.uploadFileAndAskFolder('file://', './extension.ts');
    });
    it('Copies URL to clipboard', () => __awaiter(void 0, void 0, void 0, function* () {
        const model = new driveModel_1.DriveModel(new MockFileProvider());
        yield model.listFiles('root');
        const view = new UrlCopiedView();
        const controller = new driveController_1.DriveController(model, view);
        const clipboardProvider = new DummyClipboardProvider();
        view.viewMessage = '';
        controller.copyUrlToClipboard(clipboardProvider, '1Cdffsdfsdfsdfdfocz');
        (0, chai_1.expect)('Remote URL copied to clipboard.').to.equal(view.viewMessage);
        (0, chai_1.expect)('https://drive.google.com/file/d/1Cdffsdfsdfsdfdfocz').to.equal(clipboardProvider.clipboard);
        view.viewMessage = '';
        controller.copyUrlToClipboard(clipboardProvider, '1C7udIKXCkxsvXO37gCBpfaasqn9wocz');
        (0, chai_1.expect)('Remote URL copied to clipboard.').to.equal(view.viewMessage);
        (0, chai_1.expect)('https://drive.google.com/drive/folders/1C7udIKXCkxsvXO37gCBpfaasqn9wocz').to.equal(clipboardProvider.clipboard);
    }));
});
class UrlCopiedView extends abstractDriveView_test_1.AbstractDriveView {
    constructor() {
        super(...arguments);
        this.viewMessage = "";
    }
    showInformationMessage(message, ...items) {
        return new Promise((resolve, reject) => {
            this.viewMessage = message;
            resolve('test');
        });
    }
}
class DummyClipboardProvider {
    constructor() {
        this.clipboard = "";
    }
    writeToClipboard(text) {
        this.clipboard = text;
    }
}
class MockFileProvider extends abstractFileProvider_test_2.AbstractMockFileProvider {
    provideFiles(parentFolderId) {
        return new Promise((resolve) => {
            const firstFolder = { iconLink: 'http://www.mylink.com/folder', id: '1C7udIKXadsdssdsadsadsddsocz', name: 'VSCode', type: driveTypes_1.FileType.DIRECTORY, size: 0, createdTime: 1341393000000, modifiedTime: 1341393000000 };
            const secondFolder = { iconLink: 'http://www.mylink.com/folder', id: '1C7udIKXCkxsvXO37gvfbfbdfbHihn9wocz', name: 'subFolder', type: driveTypes_1.FileType.DIRECTORY, parent: firstFolder, size: 0, createdTime: 1341393000000, modifiedTime: 1341393000000 };
            const thirdFolder = { iconLink: 'http://www.mylink.com/folder', id: '1C7udIKXCkxsvXO37gCBpfaasqn9wocz', name: 'thirdFolder', type: driveTypes_1.FileType.DIRECTORY, parent: secondFolder, size: 0, createdTime: 1341393000000, modifiedTime: 1341393000000 };
            const finalFile = { iconLink: 'http://www.mylink.com/file', id: '1Cdffsdfsdfsdfdfocz', name: 'myFile.txt', type: driveTypes_1.FileType.FILE, parent: secondFolder, size: 1325, createdTime: 1341393000000, modifiedTime: 1341393000000 };
            resolve([thirdFolder, finalFile]);
        });
    }
}
class WrongSchemeDriveView extends abstractDriveView_test_1.AbstractDriveView {
    constructor() {
        super(...arguments);
        this.warningShown = false;
    }
    showWarningMessage(message) {
        this.warningShown = true;
        (0, chai_1.expect)(`It's not possible to proceed with upload operation since file is already on Google Drive.`).to.equal(message);
    }
}
class UploadCanceledDriveView extends abstractDriveView_test_1.AbstractDriveView {
    constructor() {
        super(...arguments);
        this.warningShown = false;
    }
    askForRemoteDestinationFolder() {
        return new Promise(resolve => {
            resolve(undefined);
        });
    }
    showWarningMessage(message) {
        this.warningShown = true;
        (0, chai_1.expect)(`'Upload file' process canceled by user.`).to.equal(message);
    }
}
//# sourceMappingURL=driveController.test.js.map