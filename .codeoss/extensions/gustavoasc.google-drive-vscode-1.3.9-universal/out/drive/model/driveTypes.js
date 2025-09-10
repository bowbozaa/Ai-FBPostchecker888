"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileType = exports.DriveFileUtils = void 0;
class DriveFileUtils {
    static extractTextFromType(fileType) {
        const textType = fileType == FileType.DIRECTORY ? 'folder' : 'file';
        return textType;
    }
}
exports.DriveFileUtils = DriveFileUtils;
var FileType;
(function (FileType) {
    FileType[FileType["FILE"] = 0] = "FILE";
    FileType[FileType["DIRECTORY"] = 1] = "DIRECTORY";
})(FileType = exports.FileType || (exports.FileType = {}));
//# sourceMappingURL=driveTypes.js.map