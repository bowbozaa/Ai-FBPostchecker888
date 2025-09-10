"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const constants_1 = require("./constants");
const { publisher, name } = require('../package.json');
const driverName = 'Google Cloud Spanner Driver';
async function activate(extContext) {
    const sqltools = vscode.extensions.getExtension('mtxr.sqltools');
    if (!sqltools) {
        throw new Error('SQLTools not installed');
    }
    await sqltools.activate();
    const api = sqltools.exports;
    const extensionId = `${publisher}.${name}`;
    const plugin = {
        extensionId,
        name: `${driverName} Plugin`,
        type: 'driver',
        async register(extension) {
            extension.resourcesMap().set(`driver/${constants_1.DRIVER_ALIASES[0].value}/icons`, {
                active: extContext.asAbsolutePath('icons/active.png'),
                default: extContext.asAbsolutePath('icons/default.png'),
                inactive: extContext.asAbsolutePath('icons/inactive.png'),
            });
            constants_1.DRIVER_ALIASES.forEach(({ value }) => {
                extension.resourcesMap().set(`driver/${value}/extension-id`, extensionId);
                extension.resourcesMap().set(`driver/${value}/connection-schema`, extContext.asAbsolutePath('connection.schema.json'));
                extension.resourcesMap().set(`driver/${value}/ui-schema`, extContext.asAbsolutePath('ui.schema.json'));
            });
            await extension.client.sendRequest('ls/RegisterPlugin', { path: extContext.asAbsolutePath('out/ls/plugin.js') });
        }
    };
    api.registerPlugin(plugin);
    return {
        driverName,
        parseBeforeSaveConnection: ({ connInfo }) => {
            return connInfo;
        },
        parseBeforeEditConnection: ({ connInfo }) => {
            return connInfo;
        },
        driverAliases: constants_1.DRIVER_ALIASES,
    };
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map