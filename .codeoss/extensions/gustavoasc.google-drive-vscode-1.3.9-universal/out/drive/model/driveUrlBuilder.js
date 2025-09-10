"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriveUrlBuilder = void 0;
const driveTypes_1 = require("./driveTypes");
const DRIVE_WEBSITE = 'https://drive.google.com';
class DriveUrlBuilder {
    buildUrlFromId(model, fileId) {
        const file = model.getDriveFile(fileId);
        if (file) {
            return this.buildUrlFromFile(file);
        }
        return undefined;
    }
    buildUrlFromFile(file) {
        const location = this.getFileTypeLocation(file.type);
        const finalUrl = DRIVE_WEBSITE + location + file.id;
        return finalUrl;
    }
    getFileTypeLocation(type) {
        return type == driveTypes_1.FileType.DIRECTORY
            ? '/drive/folders/'
            : '/file/d/';
    }
}
exports.DriveUrlBuilder = DriveUrlBuilder;
//# sourceMappingURL=driveUrlBuilder.js.map