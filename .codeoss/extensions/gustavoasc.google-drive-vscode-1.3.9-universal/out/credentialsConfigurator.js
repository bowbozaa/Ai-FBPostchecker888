"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialsConfigurator = void 0;
const driveExtensionSettings_1 = require("./driveExtensionSettings");
const vscode_1 = require("vscode");
class CredentialsConfigurator {
    constructor(authenticator) {
        this.authenticator = authenticator;
        this.settings = new driveExtensionSettings_1.DriveExtensionSettings();
    }
    checkCredentialsConfigured() {
        if (this.settings.isAlertMissingCredentials()) {
            this.authenticator.checkCredentialsConfigured()
                .then(() => { })
                .catch(() => {
                const yesButton = 'Yes';
                const dontShowAgain = `Don't show again`;
                vscode_1.window.showInformationMessage(`It looks like you don't have Google Drive API credentials configured. Do you want to configure them now?`, yesButton, 'No', dontShowAgain)
                    .then((selectedButton) => {
                    switch (selectedButton) {
                        case yesButton:
                            this.configureCredentials();
                            break;
                        case dontShowAgain:
                            this.settings.updateAlertMissingCredentials(false);
                            break;
                    }
                });
            });
        }
    }
    configureCredentials() {
        vscode_1.window.showInformationMessage('Please select the credentials file previously generated from your Google API Console.');
        vscode_1.window.showOpenDialog({
            filters: {
                'Google credentials (*.json)': ['json']
            }
        }).then(files => {
            if (files && files.length > 0) {
                const selectedCredentialsFile = files[0].fsPath;
                this.authenticator.storeApiCredentials(selectedCredentialsFile)
                    .then(() => vscode_1.window.showInformationMessage('Credentials successfully stored!'))
                    .catch(err => vscode_1.window.showErrorMessage(err));
            }
            else {
                vscode_1.window.showWarningMessage(`'Configure credentials' operation canceled by user.`);
            }
        });
    }
}
exports.CredentialsConfigurator = CredentialsConfigurator;
//# sourceMappingURL=credentialsConfigurator.js.map