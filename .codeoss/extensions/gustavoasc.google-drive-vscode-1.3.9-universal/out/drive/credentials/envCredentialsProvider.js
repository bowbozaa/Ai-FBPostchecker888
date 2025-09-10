"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvCredentialsProvider = void 0;
const credentialsManager_1 = require("./credentialsManager");
class EnvCredentialsProvider {
    getPassword(service, _account) {
        return new Promise((resolve) => {
            const envName = this.resolveEnvName(service);
            const envValue = process.env[envName];
            resolve(envValue);
        });
    }
    resolveEnvName(service) {
        switch (service) {
            case credentialsManager_1.CREDENTIALS_JSON_SERVICE:
                return 'DRIVE_CREDENTIALS';
            case credentialsManager_1.TOKENS_JSON_SERVICE:
                return 'DRIVE_TOKEN';
            default:
                return 'invalid';
        }
    }
    setPassword(service, account, password) {
        // Never sets a password on env variable
        return new Promise(resolve => resolve());
    }
    deletePassword(service, account) {
        // Never deletes a password on env variable
        return new Promise(resolve => resolve(true));
    }
}
exports.EnvCredentialsProvider = EnvCredentialsProvider;
//# sourceMappingURL=envCredentialsProvider.js.map