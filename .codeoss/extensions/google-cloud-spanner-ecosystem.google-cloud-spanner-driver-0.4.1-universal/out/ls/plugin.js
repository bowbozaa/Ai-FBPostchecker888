"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const driver_1 = __importDefault(require("./driver"));
const constants_1 = require("./../constants");
const CloudSpannerDriverPlugin = {
    register(server) {
        constants_1.DRIVER_ALIASES.forEach(({ value }) => {
            server.getContext().drivers.set(value, driver_1.default);
        });
    }
};
exports.default = CloudSpannerDriverPlugin;
//# sourceMappingURL=plugin.js.map