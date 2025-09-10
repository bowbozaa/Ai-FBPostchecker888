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
exports.DriveAuthenticator = void 0;
const vscode_1 = require("vscode");
const credentialsManager_1 = require("../drive/credentials/credentialsManager");
const { OAuth2Client } = require('google-auth-library');
const http = require('http');
const url = require('url');
const destroyer = require('server-destroy');
const fs = require("fs");
const extension_1 = require("../extension");
const driveExtensionSettings_1 = require("../driveExtensionSettings");
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.readonly'];
// Port and endpoint where this extension will listen for the OAuth2 token
const OAUTH_PORT = new driveExtensionSettings_1.DriveExtensionSettings().getAuthPort();
const OAUTH_ENDPOINT = "http://127.0.0.1:" + OAUTH_PORT + "/";
// String to identify if the port is in use
const PORT_IN_USE_MESSAGE = 'EADDRINUSE';
class DriveAuthenticator {
    constructor(credentialsManager) {
        this.credentialsManager = credentialsManager;
    }
    checkCredentialsConfigured() {
        return new Promise((resolve, reject) => {
            this.credentialsManager.retrievePassword(credentialsManager_1.CREDENTIALS_JSON_SERVICE)
                .then(() => resolve())
                .catch(err => reject(err));
        });
    }
    storeApiCredentials(apiCredentialsJsonFile) {
        return new Promise((resolve, reject) => {
            fs.readFile(apiCredentialsJsonFile, (err, content) => {
                if (err) {
                    return reject(err);
                }
                this.credentialsManager.storePassword(content.toString(), credentialsManager_1.CREDENTIALS_JSON_SERVICE)
                    .then(() => {
                    // Credentials have been successfully stored.
                    // So, we need to check whether any remaining auth token exists
                    this.credentialsManager.retrievePassword(credentialsManager_1.TOKENS_JSON_SERVICE)
                        .then(() => {
                        // A remaining auth token really exists, so remove it
                        // from operating system key vault
                        this.credentialsManager.removePassword(credentialsManager_1.TOKENS_JSON_SERVICE)
                            .then(() => resolve())
                            .catch(err => reject(err));
                        resolve();
                    }).catch(() => {
                        // It's okay to be here because there was no remaining
                        // auth token
                        resolve();
                    });
                })
                    .catch(err => reject(err));
            });
        });
    }
    authenticate() {
        return new Promise((resolve, reject) => {
            // Checks whether the authorization flow has already
            // been done before
            if (this.isAuthenticated()) {
                return resolve(this.oAuth2Client);
            }
            // Authentication needs to be done before any operation on 
            // Google Drive API
            this.credentialsManager.retrievePassword(credentialsManager_1.CREDENTIALS_JSON_SERVICE)
                .then(originalJson => {
                // User has already configured credentials.json so use it to
                // proceed with the authorization flow 
                const credentialsJson = JSON.parse(originalJson.toString());
                this.authorize(credentialsJson)
                    .then(() => resolve(this.oAuth2Client))
                    .catch(err => reject(err));
            }).catch(err => {
                // Credentials have not been configured yet, so there is no way to proceed
                // with authorization flow
                this.showMissingCredentialsMessage();
                // Rejects current authentication
                reject(err);
            });
        });
    }
    showMissingCredentialsMessage() {
        const configureButton = 'Configure credentials';
        vscode_1.window.showWarningMessage(`The operation cannot proceed since Google Drive API credentials haven't been configured. Please configure the credentials and try again.`, configureButton)
            .then(selectedButton => {
            if (selectedButton === configureButton) {
                vscode_1.commands.executeCommand(extension_1.CONFIGURE_CREDENTIALS_COMMAND);
            }
        });
    }
    showAddressAlreadyInUse() {
        const configurePortButton = 'Configure port';
        vscode_1.window.showWarningMessage('Oops! It appears that the address ' + OAUTH_ENDPOINT + ' is already in use! You can set a different port with google.drive.authPort.', configurePortButton)
            .then(selectedButton => {
            if (selectedButton === configurePortButton) {
                vscode_1.commands.executeCommand('workbench.action.openSettings', 'google.drive.authPort');
            }
        });
    }
    isAuthenticated() {
        return this.oAuth2Client && this.token;
    }
    authorize(credentials) {
        return new Promise((resolve, reject) => {
            const { client_secret, client_id, redirect_uris } = credentials.installed;
            this.oAuth2Client = new OAuth2Client(client_id, client_secret, OAUTH_ENDPOINT);
            this.credentialsManager.retrievePassword(credentialsManager_1.TOKENS_JSON_SERVICE).then(token => {
                const tokenJson = JSON.parse(token.toString());
                this.oAuth2Client.setCredentials(tokenJson);
                resolve();
            }).catch(() => {
                // We don't have the auth token yet, so open external browser
                // to ask user the required access
                this.getAccessToken()
                    .then(() => resolve())
                    .catch((err) => reject(err));
            });
        });
    }
    getAccessToken() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                // This URL will be opened on external browser so the user can proceed with authentication
                const authUrl = this.oAuth2Client.generateAuthUrl({ access_type: 'offline', scope: SCOPES });
                vscode_1.window.showInformationMessage('Authorize this app by visiting the external URL');
                // Open an http server to accept the oauth callback. In this simple example, the
                // only request to our webserver is to /oauth2callback?code=<code>
                // This code was extracted from: https://github.com/googleapis/google-auth-library-nodejs
                const server = http.createServer((req, res) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        // This is called when user confirms authorization
                        if (req.url.indexOf('/?code') > -1) {
                            // Acquire the code from the querystring, and close the web server.
                            const qs = new url.URL(req.url, OAUTH_ENDPOINT).searchParams;
                            const authToken = qs.get('code');
                            res.end('Authentication completed! Please return to VSCode.');
                            // We do not need the server anymore, so destroy it
                            server.destroy();
                            // Generates a token with the code returned by the auth
                            this.oAuth2Client.getToken(authToken, (err, token) => {
                                // In case any unexpected error happens we cannot proceed
                                if (err)
                                    return reject(err);
                                // This token is stored globally, on this instance, so the authentication is not
                                // asked again on future operations with Google Drive
                                this.token = token;
                                // We generate a string representation of the token so it can be stored
                                const stringified = JSON.stringify(this.token);
                                // We store the token on the operating system so that different VSCode instances can also
                                // use this token and auth is not asked again in the future.
                                this.credentialsManager.storePassword(stringified, credentialsManager_1.TOKENS_JSON_SERVICE).then(() => {
                                    // Finally, update the credentials with the generated token
                                    this.oAuth2Client.setCredentials(this.token);
                                    vscode_1.window.showInformationMessage('Authorization completed! Now you can access your drive files through VSCode.');
                                    resolve();
                                }).catch(err => {
                                    reject(err);
                                });
                            });
                        }
                        // This is called when user cancels the authorization
                        if (req.url.indexOf('/?error') > -1) {
                            // We do not need the server anymore, so destroy it
                            res.end('Authorization flow canceled by user. Please return to VSCode.');
                            server.destroy();
                            // Finishes the authorization
                            vscode_1.window.showWarningMessage('Authorization flow canceled by user.');
                            reject();
                        }
                    }
                    catch (err) {
                        vscode_1.window.showErrorMessage('Unexpected problem: ' + err);
                        reject(err);
                    }
                }));
                server.on('error', (err) => {
                    if (err.toString().includes(PORT_IN_USE_MESSAGE)) {
                        this.showAddressAlreadyInUse();
                    }
                    else {
                        vscode_1.window.showErrorMessage('Unexpected problem while starting HTTP server ' + OAUTH_ENDPOINT + ': ' + err);
                    }
                    server.destroy();
                    reject(err);
                });
                // Effectively listens on the HTTP port until OAuth2 sends a request to it
                server.listen(OAUTH_PORT, () => __awaiter(this, void 0, void 0, function* () {
                    // Opens the browser to the authorize url to start the workflow
                    const opened = yield vscode_1.env.openExternal(vscode_1.Uri.parse(authUrl));
                    // User has cancelled the authorization flow
                    if (!opened) {
                        vscode_1.window.showWarningMessage('Authorization flow canceled by user.');
                        return reject();
                    }
                }));
                // Allows this server instance to be properly destroyed
                destroyer(server);
            }));
        });
    }
}
exports.DriveAuthenticator = DriveAuthenticator;
//# sourceMappingURL=driveAuthenticator.js.map