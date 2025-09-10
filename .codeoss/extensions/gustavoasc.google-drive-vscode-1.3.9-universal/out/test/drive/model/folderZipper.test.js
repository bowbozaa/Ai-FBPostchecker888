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
const folderZipper_1 = require("../../../drive/model/folderZipper");
describe('Zip operations', () => {
    it('Builds zip basename', () => __awaiter(void 0, void 0, void 0, function* () {
        const date = new Date(2020, 8, 4, 10, 45);
        const result = new folderZipper_1.FolderZipper().buildZipName('/tmp/dummy/', date);
        (0, chai_1.expect)('dummy_20200904_1045.zip').to.equal(result);
    }));
});
//# sourceMappingURL=folderZipper.test.js.map