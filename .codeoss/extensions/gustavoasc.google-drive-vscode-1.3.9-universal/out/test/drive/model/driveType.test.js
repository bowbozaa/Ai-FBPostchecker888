"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const driveTypes_1 = require("../../../drive/model/driveTypes");
describe('Drive type operations', () => {
    it('Extract text representation from drive file type', () => {
        (0, chai_1.expect)('folder').to.equal(driveTypes_1.DriveFileUtils.extractTextFromType(driveTypes_1.FileType.DIRECTORY));
        (0, chai_1.expect)('file').to.equal(driveTypes_1.DriveFileUtils.extractTextFromType(driveTypes_1.FileType.FILE));
    });
});
//# sourceMappingURL=driveType.test.js.map