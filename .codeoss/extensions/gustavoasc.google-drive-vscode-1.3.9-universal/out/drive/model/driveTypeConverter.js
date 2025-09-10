"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriveTypeConverter = exports.FOLDER_MIME_TYPE = void 0;
const driveTypes_1 = require("./driveTypes");
exports.FOLDER_MIME_TYPE = 'application/vnd.google-apps.folder';
class DriveTypeConverter {
    fromApiToTypescript(apiFiles) {
        const finalFiles = [];
        apiFiles.map((file) => {
            const fileType = this.detectFileType(file);
            const size = this.detectSize(file);
            const ctime = this.convertRfc3339ToTimestamp(file.createdTime);
            const mtime = this.convertRfc3339ToTimestamp(file.modifiedTime);
            finalFiles.push({
                id: file.id,
                name: file.name,
                iconLink: file.iconLink,
                type: fileType,
                createdTime: ctime,
                modifiedTime: mtime,
                size: size,
            });
        });
        return finalFiles;
    }
    detectFileType(apiFile) {
        const mimeType = apiFile === null || apiFile === void 0 ? void 0 : apiFile.mimeType;
        const fileType = mimeType == exports.FOLDER_MIME_TYPE ? driveTypes_1.FileType.DIRECTORY : driveTypes_1.FileType.FILE;
        return fileType;
    }
    detectSize(apiFile) {
        const size = apiFile === null || apiFile === void 0 ? void 0 : apiFile.size;
        return isNaN(size) ? 0 : +size;
    }
    convertRfc3339ToTimestamp(time) {
        const timeInMillis = Date.parse(time);
        return isNaN(timeInMillis) ? 0 : timeInMillis;
    }
}
exports.DriveTypeConverter = DriveTypeConverter;
//# sourceMappingURL=driveTypeConverter.js.map