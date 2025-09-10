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
const envCredentialsProvider_1 = require("../../../drive/credentials/envCredentialsProvider");
const credentialsManager_1 = require("../../../drive/credentials/credentialsManager");
describe('Environment credentials provider', () => {
    it('Check credentials name resolution', () => __awaiter(void 0, void 0, void 0, function* () {
        const provider = new envCredentialsProvider_1.EnvCredentialsProvider();
        (0, chai_1.expect)('DRIVE_CREDENTIALS').to.equal(provider.resolveEnvName(credentialsManager_1.CREDENTIALS_JSON_SERVICE));
        (0, chai_1.expect)('DRIVE_TOKEN').to.equal(provider.resolveEnvName(credentialsManager_1.TOKENS_JSON_SERVICE));
        (0, chai_1.expect)('invalid').to.equal(provider.resolveEnvName('invalid-service'));
    }));
});
//# sourceMappingURL=envCredentialsProvider.test.js.map