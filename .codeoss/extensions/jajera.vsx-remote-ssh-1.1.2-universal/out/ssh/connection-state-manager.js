"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionStateManagerImpl = void 0;
const ssh_1 = require("../interfaces/ssh");
/**
 * Implementation of the connection state manager
 * Handles saving and restoring connection states using VS Code's extension context
 */
class ConnectionStateManagerImpl {
    /**
     * Creates a new connection state manager
     * @param context VS Code extension context
     */
    constructor(context) {
        this.context = context;
    }
    /**
     * Saves the state of a connection
     * @param state The connection state to save
     */
    async saveConnectionState(state) {
        const states = await this.getAllConnectionStates();
        const existingIndex = states.findIndex(s => s.connectionId === state.connectionId);
        if (existingIndex >= 0) {
            states[existingIndex] = state;
        }
        else {
            states.push(state);
        }
        await this.context.globalState.update(ConnectionStateManagerImpl.CONNECTION_STATES_KEY, states);
    }
    /**
     * Gets the state of a connection by ID
     * @param connectionId The ID of the connection
     * @returns The connection state or undefined if not found
     */
    async getConnectionState(connectionId) {
        const states = await this.getAllConnectionStates();
        return states.find(state => state.connectionId === connectionId);
    }
    /**
     * Gets all saved connection states
     * @returns Array of connection states
     */
    async getAllConnectionStates() {
        const states = this.context.globalState.get(ConnectionStateManagerImpl.CONNECTION_STATES_KEY, []);
        return states ?? [];
    }
    /**
     * Updates the state of a connection
     * @param connectionId The ID of the connection
     * @param updates Partial updates to apply to the connection state
     */
    async updateConnectionState(connectionId, updates) {
        const states = await this.getAllConnectionStates();
        const existingIndex = states.findIndex(s => s.connectionId === connectionId);
        if (existingIndex >= 0) {
            states[existingIndex] = {
                ...states[existingIndex],
                ...updates,
                // Always update lastActivity when updating state
                lastActivity: updates.lastActivity || new Date()
            };
        }
        else {
            // Create new state if it doesn't exist
            const newState = {
                connectionId,
                status: updates.status || ssh_1.ConnectionStatus.Disconnected,
                config: updates.config || {},
                lastActivity: new Date(),
                reconnectAttempts: 0,
                lastError: updates.lastError
            };
            states.push(newState);
        }
        await this.context.globalState.update(ConnectionStateManagerImpl.CONNECTION_STATES_KEY, states);
    }
    /**
     * Deletes the state of a connection
     * @param connectionId The ID of the connection to delete
     */
    async deleteConnectionState(connectionId) {
        const states = await this.getAllConnectionStates();
        const filteredStates = states.filter(state => state.connectionId !== connectionId);
        if (filteredStates.length !== states.length) {
            await this.context.globalState.update(ConnectionStateManagerImpl.CONNECTION_STATES_KEY, filteredStates);
        }
    }
    /**
     * Clears all connection states
     */
    async clearConnectionStates() {
        await this.context.globalState.update(ConnectionStateManagerImpl.CONNECTION_STATES_KEY, []);
    }
}
exports.ConnectionStateManagerImpl = ConnectionStateManagerImpl;
ConnectionStateManagerImpl.CONNECTION_STATES_KEY = 'vsx-remote-ssh.connectionStates';
//# sourceMappingURL=connection-state-manager.js.map