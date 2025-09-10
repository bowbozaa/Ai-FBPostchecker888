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
exports.VSCodePickProvider = void 0;
const vscode_1 = require("vscode");
class VSCodePickProvider {
    showQuickPick(items) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const vscodeItems = this.convertItemsToVSCodeApi(items);
            const selectedItem = yield vscode_1.window.showQuickPick(vscodeItems, {
                placeHolder: 'Destination folder on Google Drive',
                ignoreFocusOut: true
            });
            const result = selectedItem ? this.convertVSCodeApiToItem(selectedItem) : undefined;
            resolve(result);
        }));
    }
    convertItemsToVSCodeApi(items) {
        const vscodeItems = [];
        items.forEach(i => {
            vscodeItems.push({
                label: i.label,
                description: i.description
            });
        });
        return vscodeItems;
    }
    convertVSCodeApiToItem(vscodeItem) {
        const item = {
            label: vscodeItem.label,
            description: vscodeItem.description
        };
        return item;
    }
}
exports.VSCodePickProvider = VSCodePickProvider;
//# sourceMappingURL=vscodePickProvider.js.map