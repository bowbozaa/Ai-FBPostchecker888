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
const chai_1 = require("chai");
require("mocha");
const credentialsManager_1 = require("../../../drive/credentials/credentialsManager");
const envCredentialsProvider_1 = require("../../../drive/credentials/envCredentialsProvider");
describe('Credentials manager', () => {
    it('Checks password resolution', () => __awaiter(void 0, void 0, void 0, function* () {
        // Prepares manager and env variables to return proper credentials
        process.env['DRIVE_CREDENTIALS'] = 'bXkgZHVtbXkgY3JlZGVudGlhbHM=';
        process.env['DRIVE_TOKEN'] = 'dGhlIGR1bW15IHRva2Vu=';
        const manager = new credentialsManager_1.CredentialsManager(new envCredentialsProvider_1.EnvCredentialsProvider());
        // Checks pass credentials
        const credentials = yield manager.retrievePassword(credentialsManager_1.CREDENTIALS_JSON_SERVICE);
        (0, chai_1.expect)('my dummy credentials').to.equal(credentials);
        // Checks pass token
        const token = yield manager.retrievePassword(credentialsManager_1.TOKENS_JSON_SERVICE);
        (0, chai_1.expect)('the dummy token').to.equal(token);
    }));
});
//# sourceMappingURL=credentialsManager.test.js.map