"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FolderZipper = void 0;
const os = require("os");
const fs = require("fs");
const path = require("path");
const archiver = require("archiver");
class FolderZipper {
    zipToTemp(folderToZip) {
        const tempDir = os.tmpdir();
        const zipName = this.buildZipName(folderToZip, new Date());
        const zipFullName = path.join(tempDir, zipName);
        return new Promise((resolve, reject) => {
            const archive = archiver('zip');
            const options = { cwd: folderToZip, dot: true };
            archive.on('error', err => {
                reject(err);
            });
            archive.on('end', function () {
                resolve(zipFullName);
            });
            archive.pipe(fs.createWriteStream(zipFullName));
            archive.glob('**/*', options);
            archive.finalize().then().catch();
        });
    }
    buildZipName(folderToZip, date) {
        const zipBaseName = path.basename(folderToZip);
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Month starts at zero
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const hhmm = pad(hours, 2) + pad(minutes, 2);
        const yyyymmdd = pad(year, 4) + pad(month, 2) + pad(day, 2);
        const zipName = zipBaseName + '_' + yyyymmdd + '_' + hhmm + '.zip';
        return zipName;
    }
}
exports.FolderZipper = FolderZipper;
function pad(num, size) {
    let s = num + "";
    while (s.length < size)
        s = "0" + s;
    return s;
}
//# sourceMappingURL=folderZipper.js.map