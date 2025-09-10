"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecretStorageCredentialsProvider = void 0;
class SecretStorageCredentialsProvider {
    constructor(secretStorage) {
        this.secretStorage = secretStorage;
    }
    getPassword(service, _) {
        return new Promise((resolve) => {
            this.secretStorage.get(service)
                .then(value => resolve(value));
        });
    }
    setPassword(service, _, password) {
        return new Promise((resolve) => {
            resolve(this.secretStorage.store(service, password));
        });
    }
    deletePassword(service, _) {
        return new Promise((resolve) => {
            this.secretStorage.delete(service)
                .then(_ => resolve(true));
        });
    }
}
exports.SecretStorageCredentialsProvider = SecretStorageCredentialsProvider;
//# sourceMappingURL=keytarCredentialsProvider.js.map