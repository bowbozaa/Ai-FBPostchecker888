"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VSCodeNotificator = void 0;
const vscode_1 = require("vscode");
class VSCodeNotificator {
    showProgressMessage(message, task) {
        vscode_1.window.withProgress({
            location: vscode_1.ProgressLocation.Notification,
            title: message,
        }, () => {
            const p = new Promise((resolve, reject) => {
                task.then(() => resolve())
                    .catch(err => reject(err));
            });
            return p;
        });
    }
    showInformationMessage(message, ...items) {
        return vscode_1.window.showInformationMessage(message, { modal: false }, ...items);
    }
    showWarningMessage(message) {
        vscode_1.window.showWarningMessage(message);
    }
}
exports.VSCodeNotificator = VSCodeNotificator;
//# sourceMappingURL=vscodeNotificator.js.map