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
const driveTypes_1 = require("../../../drive/model/driveTypes");
const driveTypeConverter_1 = require("../../../drive/model/driveTypeConverter");
describe('Drive type conversions from Google Drive API', () => {
    it('Empty result', () => __awaiter(void 0, void 0, void 0, function* () {
        const apiFolders = [];
        const converted = new driveTypeConverter_1.DriveTypeConverter().fromApiToTypescript(apiFolders);
        (0, chai_1.expect)(0).to.equal(converted.length);
    }));
    it('Directory missing date', () => __awaiter(void 0, void 0, void 0, function* () {
        const apiFolders = [];
        apiFolders.push({ id: 'ajsbo1j218fmxxnmaiouasion', name: 'foo', iconLink: 'https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.folder', mimeType: driveTypeConverter_1.FOLDER_MIME_TYPE });
        const converted = new driveTypeConverter_1.DriveTypeConverter().fromApiToTypescript(apiFolders);
        (0, chai_1.expect)(1).to.equal(converted.length);
        (0, chai_1.expect)('ajsbo1j218fmxxnmaiouasion').to.equal(converted[0].id);
        (0, chai_1.expect)('foo').to.equal(converted[0].name);
        (0, chai_1.expect)('https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.folder').to.equal(converted[0].iconLink);
        (0, chai_1.expect)(driveTypes_1.FileType.DIRECTORY).to.equal(converted[0].type);
        (0, chai_1.expect)(undefined).to.equal(converted[0].parent);
        (0, chai_1.expect)(0).to.equal(converted[0].size);
        (0, chai_1.expect)(0).to.equal(converted[0].createdTime);
        (0, chai_1.expect)(0).to.equal(converted[0].modifiedTime);
    }));
    it('Contains only folders', () => __awaiter(void 0, void 0, void 0, function* () {
        const apiFolders = [];
        apiFolders.push({ id: 'ajsbo1j218fmxxnmaiouasion', name: 'foo', iconLink: 'https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.folder', mimeType: driveTypeConverter_1.FOLDER_MIME_TYPE, createdTime: '2020-07-16T23:23:40.311Z', modifiedTime: '2020-07-20T22:44:38.263Z' });
        apiFolders.push({ id: 'sdasg32453255gnmaiouasion', name: 'bar', iconLink: 'https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.folder', mimeType: driveTypeConverter_1.FOLDER_MIME_TYPE, createdTime: '2019-06-16T23:23:40.311Z', modifiedTime: '2020-07-20T23:44:38.263Z' });
        const converted = new driveTypeConverter_1.DriveTypeConverter().fromApiToTypescript(apiFolders);
        (0, chai_1.expect)(2).to.equal(converted.length);
        // Check first file information
        (0, chai_1.expect)('ajsbo1j218fmxxnmaiouasion').to.equal(converted[0].id);
        (0, chai_1.expect)('foo').to.equal(converted[0].name);
        (0, chai_1.expect)('https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.folder').to.equal(converted[0].iconLink);
        (0, chai_1.expect)(driveTypes_1.FileType.DIRECTORY).to.equal(converted[0].type);
        (0, chai_1.expect)(undefined).to.equal(converted[0].parent);
        (0, chai_1.expect)(0).to.equal(converted[0].size);
        (0, chai_1.expect)(1594941820311).to.equal(converted[0].createdTime);
        (0, chai_1.expect)(1595285078263).to.equal(converted[0].modifiedTime);
        // Check second file information
        (0, chai_1.expect)('sdasg32453255gnmaiouasion').to.equal(converted[1].id);
        (0, chai_1.expect)('bar').to.equal(converted[1].name);
        (0, chai_1.expect)('https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.folder').to.equal(converted[1].iconLink);
        (0, chai_1.expect)(driveTypes_1.FileType.DIRECTORY).to.equal(converted[1].type);
        (0, chai_1.expect)(undefined).to.equal(converted[1].parent);
        (0, chai_1.expect)(0).to.equal(converted[1].size);
        (0, chai_1.expect)(1560727420311).to.equal(converted[1].createdTime);
        (0, chai_1.expect)(1595288678263).to.equal(converted[1].modifiedTime);
    }));
    it('Contains one folder and one file', () => __awaiter(void 0, void 0, void 0, function* () {
        const apiFolders = [];
        apiFolders.push({ id: 'ajsbo1j218fmxxnmaiouasion', name: 'foo', iconLink: 'https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.folder', mimeType: driveTypeConverter_1.FOLDER_MIME_TYPE, createdTime: '2020-07-16T23:23:40.311Z', modifiedTime: '2020-07-20T22:44:38.263Z' });
        apiFolders.push({ id: 'sdasg32453255gnmaiouasion', name: 'bar.txt', iconLink: 'https://drive-thirdparty.googleusercontent.com/16/type/text/plain', mimeType: 'text/plain', size: '1071', createdTime: '2019-06-16T23:23:40.311Z', modifiedTime: '2020-07-20T23:44:38.263Z' });
        const converted = new driveTypeConverter_1.DriveTypeConverter().fromApiToTypescript(apiFolders);
        (0, chai_1.expect)(2).to.equal(converted.length);
        // Check first file information
        (0, chai_1.expect)('ajsbo1j218fmxxnmaiouasion').to.equal(converted[0].id);
        (0, chai_1.expect)('foo').to.equal(converted[0].name);
        (0, chai_1.expect)('https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.folder').to.equal(converted[0].iconLink);
        (0, chai_1.expect)(driveTypes_1.FileType.DIRECTORY).to.equal(converted[0].type);
        (0, chai_1.expect)(undefined).to.equal(converted[0].parent);
        (0, chai_1.expect)(0).to.equal(converted[0].size);
        (0, chai_1.expect)(1594941820311).to.equal(converted[0].createdTime);
        (0, chai_1.expect)(1595285078263).to.equal(converted[0].modifiedTime);
        // Check second file information
        (0, chai_1.expect)('sdasg32453255gnmaiouasion').to.equal(converted[1].id);
        (0, chai_1.expect)('bar.txt').to.equal(converted[1].name);
        (0, chai_1.expect)('https://drive-thirdparty.googleusercontent.com/16/type/text/plain').to.equal(converted[1].iconLink);
        (0, chai_1.expect)(driveTypes_1.FileType.FILE).to.equal(converted[1].type);
        (0, chai_1.expect)(undefined).to.equal(converted[1].parent);
        (0, chai_1.expect)(1071).to.equal(converted[1].size);
        (0, chai_1.expect)(1560727420311).to.equal(converted[1].createdTime);
        (0, chai_1.expect)(1595288678263).to.equal(converted[1].modifiedTime);
    }));
});
//# sourceMappingURL=driveTypeConverter.test.js.map