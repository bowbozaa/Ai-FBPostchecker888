"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CopyToClipboardSupport = void 0;
const driveUrlBuilder_1 = require("../model/driveUrlBuilder");
class CopyToClipboardSupport {
    constructor(provider) {
        this.provider = provider;
        this.builder = new driveUrlBuilder_1.DriveUrlBuilder();
    }
    ;
    fireCommand(model, view, fileId) {
        const url = this.builder.buildUrlFromId(model, fileId);
        if (url) {
            this.provider.writeToClipboard(url);
            view.showInformationMessage('Remote URL copied to clipboard.');
        }
    }
}
exports.CopyToClipboardSupport = CopyToClipboardSupport;
//# sourceMappingURL=CopyToClipboardSupport.js.map