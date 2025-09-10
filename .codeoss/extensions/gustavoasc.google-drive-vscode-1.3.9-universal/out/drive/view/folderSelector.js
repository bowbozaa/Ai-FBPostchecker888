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
exports.FolderSelector = void 0;
const FOLDER_DESCRIPTION_TEXT = 'Folder ID: ';
const FOLDER_SYMBOL_TEXT = '$(file-directory) ';
const UPLOAD_TEXT = 'Upload to current folder: ';
class FolderSelector {
    constructor(model, provider) {
        this.model = model;
        this.provider = provider;
    }
    askForDestinationFolder() {
        return __awaiter(this, void 0, void 0, function* () {
            // Information about selected folders (to navigate between previously
            // selected folders)
            const selectionStack = [];
            // Fetch data from root folder on Google Drive
            let currentSelection = { label: 'root', description: 'root' };
            let items = yield this.createPickItems(currentSelection, false);
            // Controls whether user has selected the folder or canceled folder selection
            let hasSelected = false;
            let hasCancelled = false;
            // Keeps asking user to select folder
            while (!hasSelected && !hasCancelled) {
                const selectedItem = yield this.provider.showQuickPick(items);
                if (selectedItem) {
                    const label = selectedItem.label;
                    const description = selectedItem.description;
                    // Only folders contain description, so we know we
                    // need to retrieve the subfolders of the selected folder
                    if (description) {
                        // Saves data from current folder to restore in case of
                        // user wants to go back to previous folder level
                        selectionStack.push(currentSelection);
                        // Extracts information about the selected item
                        currentSelection = {
                            label: description.substring(FOLDER_DESCRIPTION_TEXT.length),
                            description: label.substring(FOLDER_SYMBOL_TEXT.length)
                        };
                        items = yield this.createPickItems(currentSelection, true);
                    }
                    else {
                        // Checks whether user chose the current folder or wants to
                        // go back to previous folder level
                        if (label.includes(UPLOAD_TEXT)) {
                            hasSelected = true;
                        }
                        else {
                            // User wants to go back to previous folder
                            currentSelection = selectionStack.pop();
                            const allowGoBack = selectionStack.length > 0;
                            items = yield this.createPickItems(currentSelection, allowGoBack);
                        }
                    }
                }
                else {
                    hasCancelled = true;
                }
            }
            return hasCancelled ? '' : currentSelection.label;
        });
    }
    createPickItems(currentSelection, allowGoBack) {
        return __awaiter(this, void 0, void 0, function* () {
            const allItems = [];
            allItems.push(this.createItemToSelectCurrent(currentSelection.description));
            if (allowGoBack) {
                allItems.push(this.createItemToGoBack());
            }
            const foldersItems = yield this.createFoldersItems(currentSelection.label);
            allItems.push(...foldersItems);
            return allItems;
        });
    }
    createItemToSelectCurrent(name) {
        const selectCurrentItem = { label: `$(cloud-upload) ${UPLOAD_TEXT}'${name}'`, description: '' };
        return selectCurrentItem;
    }
    createItemToGoBack() {
        const goBackItem = { label: `$(arrow-left) Go back to previous folder`, description: '' };
        return goBackItem;
    }
    createFoldersItems(parentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const folders = yield this.model.listOnlyFolders(parentId);
            const foldersItems = folders.map(f => {
                return {
                    label: `${FOLDER_SYMBOL_TEXT}${f.name}`,
                    description: `${FOLDER_DESCRIPTION_TEXT}${f.id}`
                };
            });
            return foldersItems;
        });
    }
}
exports.FolderSelector = FolderSelector;
//# sourceMappingURL=folderSelector.js.map