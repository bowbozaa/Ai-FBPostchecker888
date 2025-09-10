"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialsManager = exports.TOKENS_JSON_SERVICE = exports.CREDENTIALS_JSON_SERVICE = void 0;
const os = require("os");
exports.CREDENTIALS_JSON_SERVICE = 'Google Drive for VSCode - Credentials';
exports.TOKENS_JSON_SERVICE = 'Google Drive for VSCode - Token';
class CredentialsManager {
    constructor(credentialsProvider) {
        this.credentialsProvider = credentialsProvider;
    }
    storePassword(passContent, serviceName) {
        return new Promise((resolve, reject) => {
            const base64Json = Buffer.from(passContent, 'ascii').toString('base64');
            const username = os.userInfo().username;
            this.credentialsProvider.setPassword(serviceName, username, base64Json)
                .then(() => resolve())
                .catch(err => reject(err));
        });
    }
    retrievePassword(serviceName) {
        return new Promise((resolve, reject) => {
            const username = os.userInfo().username;
            this.credentialsProvider.getPassword(serviceName, username)
                .then(pass => {
                if (pass) {
                    const originalJsonContent = Buffer.from(pass, 'base64').toString('ascii');
                    resolve(originalJsonContent);
                }
                else {
                    reject();
                }
            }).catch(err => reject(err));
        });
    }
    removePassword(serviceName) {
        return new Promise((resolve, reject) => {
            const username = os.userInfo().username;
            this.credentialsProvider.deletePassword(serviceName, username)
                .then(pass => {
                if (pass) {
                    resolve();
                }
                else {
                    reject();
                }
            }).catch(err => reject(err));
        });
    }
}
exports.CredentialsManager = CredentialsManager;
//# sourceMappingURL=credentialsManager.js.map