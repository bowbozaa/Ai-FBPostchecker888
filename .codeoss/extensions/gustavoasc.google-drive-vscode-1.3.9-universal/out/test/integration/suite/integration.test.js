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
// import { controller, credentialsManager } from '../../../extension';
const envCredentialsProvider_1 = require("../../../drive/credentials/envCredentialsProvider");
const abstractDriveView_test_1 = require("../../drive/view/abstractDriveView.test");
const credentialsManager_1 = require("../../../drive/credentials/credentialsManager");
const driveAuthenticator_1 = require("../../../auth/driveAuthenticator");
const googleDriveFileProvider_1 = require("../../../drive/model/googleDriveFileProvider");
const driveModel_1 = require("../../../drive/model/driveModel");
const driveController_1 = require("../../../drive/controller/driveController");
const extension_1 = require("../../../extension");
const fs = require("fs");
const TIMEOUT_BETWEEN_STEPS = 10000;
// Create a folder on drive root, with current timestamp
// The timestamp will be folder name
const rootTestFolderName = new Date().getMilliseconds().toString();
let openedUri;
suite('Operations on real Google Drive API', () => {
    test('General operations on extension', () => __awaiter(void 0, void 0, void 0, function* () {
        // Only run tests when specific credentials account are configured on env variables
        // to prevent trash files on Drive
        const envProvider = process.env.DRIVE_CREDENTIALS && process.env.DRIVE_TOKEN;
        if (envProvider) {
            const credentialsManager = new credentialsManager_1.CredentialsManager(new envCredentialsProvider_1.EnvCredentialsProvider());
            // Prepares the file provider to fetch and manipulate information from Google Drive
            const driveAuthenticator = new driveAuthenticator_1.DriveAuthenticator(credentialsManager);
            const googleFileProvider = new googleDriveFileProvider_1.GoogleDriveFileProvider(driveAuthenticator);
            const model = new driveModel_1.DriveModel(googleFileProvider);
            let controller;
            console.log(`Creating folder ${rootTestFolderName} on root...`);
            controller = new driveController_1.DriveController(model, new CreateRootFolderView());
            controller.createFolder('root');
            yield sleep(TIMEOUT_BETWEEN_STEPS);
            console.log(`Fetching/listing files from root folder on drive...`);
            controller.listFiles('root');
            yield sleep(TIMEOUT_BETWEEN_STEPS);
            console.log(`From fetched files, discovering the ID of the folder created moments ago...`);
            const folderId = model.getDriveFileFromName(rootTestFolderName).id;
            console.log(`Created folder ${rootTestFolderName} with ID ${folderId} on root`);
            controller = new driveController_1.DriveController(model, new UploadFileView(folderId));
            ['dummyText.txt', 'dog.jpg', 'helloworld.cpp'].forEach((res) => __awaiter(void 0, void 0, void 0, function* () {
                const uri = vscode.Uri.file(__dirname + '/../../../../src/test/integration/suite/res/' + res);
                console.log(`Uploading ${res} to folder created moments ago...`);
                (0, extension_1.uploadSelectedFile)(uri, controller);
            }));
            yield sleep(TIMEOUT_BETWEEN_STEPS);
            console.log(`Fetching/listing files from folder with ID ${folderId} on drive...`);
            controller.listFiles(folderId);
            yield sleep(TIMEOUT_BETWEEN_STEPS);
            const testFileName = 'dummyText.txt';
            console.log(`Discovering the ID of ${testFileName} on drive...`);
            const dummyTextId = model.getDriveFileFromName(testFileName).id;
            console.log(`ID: ${dummyTextId}`);
            console.log('Downloading dummyText.txt on drive...');
            controller = new driveController_1.DriveController(model, new DownloadFileView());
            controller.downloadFile(dummyTextId);
            yield sleep(TIMEOUT_BETWEEN_STEPS);
            const destination = vscode.Uri.file(__dirname + '/../../../../src/test/integration/suite/downloaded-dummyText.txt').path;
            fs.readFile(destination, (err, data) => {
                assert.equal(data.length, 3750);
                fs.unlinkSync(destination);
            });
            yield sleep(TIMEOUT_BETWEEN_STEPS);
            const uri = vscode.Uri.file(__dirname + '/../../../../src/test/integration/suite/res/updatedRes/dummyText.txt');
            console.log('Replacing dummyText.txt ...');
            controller = new driveController_1.DriveController(model, new UploadFileView(folderId));
            (0, extension_1.uploadSelectedFile)(uri, controller);
            yield sleep(TIMEOUT_BETWEEN_STEPS);
            console.log('Downloading replaced dummyText.txt on drive...');
            controller = new driveController_1.DriveController(model, new DownloadFileView());
            controller.downloadFile(dummyTextId);
            yield sleep(TIMEOUT_BETWEEN_STEPS);
            fs.readFile(destination, (err, data) => {
                assert.equal(data.length, 400);
                fs.unlinkSync(destination);
            });
            yield sleep(TIMEOUT_BETWEEN_STEPS);
            console.log(`Renaming ${testFileName} on drive...`);
            controller = new driveController_1.DriveController(model, new RenameFileView());
            controller.renameFile(dummyTextId);
            yield sleep(TIMEOUT_BETWEEN_STEPS);
            console.log(`Opening the remote file with ID ${dummyTextId} on VSCode tab...`);
            controller.openRemoteFile(dummyTextId);
            yield sleep(TIMEOUT_BETWEEN_STEPS);
            console.log(`Checking whether opened the right file...`);
            assert.equal(`googledrive:///${rootTestFolderName}/renamed-file.txt#${dummyTextId}`, openedUri);
        }
        else {
            // When it's CI execution this should never happen!
            // On CI we have credentials configured on env variables
            if (process.env.CI_EXECUTION) {
                assert.fail('CI should always run integration tests!');
            }
        }
    }));
});
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
// ------- Mock view implementations
// -------
// ------- We create mock view implementations because on automated tests we don't
// ------- have anyone to interact with windows
class CreateRootFolderView extends abstractDriveView_test_1.AbstractDriveView {
    refresh() {
    }
    showInputBox(message, value) {
        return new Promise(resolve => {
            return resolve(rootTestFolderName);
        });
    }
    showInformationMessage(message, ...items) {
        return new Promise(resolve => resolve(undefined));
    }
    showWarningMessage(message) {
    }
    showProgressMessage(message, task) {
    }
}
class UploadFileView extends abstractDriveView_test_1.AbstractDriveView {
    constructor(id) {
        super();
        this.id = id;
    }
    askForRemoteDestinationFolder() {
        return new Promise(resolve => resolve(this.id));
    }
    refresh() {
    }
    showInputBox(message, value) {
        return new Promise(resolve => {
            return resolve(rootTestFolderName);
        });
    }
    showInformationMessage(message, ...items) {
        return new Promise(resolve => resolve(undefined));
    }
    showWarningMessage(message) {
    }
    showProgressMessage(message, task) {
    }
    openUri(targetUri) {
        const options = this.defaultOpenOptions();
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(targetUri), options);
    }
    defaultOpenOptions() {
        const options = {
            viewColumn: vscode.ViewColumn.Active,
            preview: false
        };
        return options;
    }
}
class DownloadFileView extends abstractDriveView_test_1.AbstractDriveView {
    refresh() {
    }
    showInputBox(message, value) {
        return new Promise(resolve => {
            return resolve('dummyText.txt');
        });
    }
    showInformationMessage(message, ...items) {
        return new Promise(resolve => resolve(undefined));
    }
    showWarningMessage(message) {
    }
    showProgressMessage(message, task) {
    }
    openUri(targetUri) {
        openedUri = targetUri;
    }
    askForLocalDestinationFolder(suggestedPath) {
        const path = vscode.Uri.file(__dirname + '/../../../../src/test/integration/suite/downloaded-dummyText.txt').path;
        return new Promise(resolve => resolve(path));
    }
}
class RenameFileView extends abstractDriveView_test_1.AbstractDriveView {
    refresh() {
    }
    showInputBox(message, value) {
        return new Promise(resolve => {
            return resolve('renamed-file.txt');
        });
    }
    showInformationMessage(message, ...items) {
        return new Promise(resolve => resolve(undefined));
    }
    showWarningMessage(message) {
    }
    showProgressMessage(message, task) {
    }
    openUri(targetUri) {
        openedUri = targetUri;
    }
}
//# sourceMappingURL=integration.test.js.map