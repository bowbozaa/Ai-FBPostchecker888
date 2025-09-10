"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const connection_state_manager_1 = require("./connection-state-manager");
const ssh_1 = require("../interfaces/ssh");
(0, vitest_1.describe)('ConnectionStateManager', () => {
    let stateManager;
    let mockContext;
    let mockGlobalState;
    let storedStates = [];
    (0, vitest_1.beforeEach)(() => {
        // Reset stored states
        storedStates = [];
        // Create mock for VS Code extension context
        mockGlobalState = {
            get: vitest_1.vi.fn((key, defaultValue) => {
                return storedStates;
            }),
            update: vitest_1.vi.fn((key, value) => {
                storedStates = value;
                return Promise.resolve();
            })
        };
        mockContext = {
            globalState: mockGlobalState
        };
        stateManager = new connection_state_manager_1.ConnectionStateManagerImpl(mockContext);
    });
    (0, vitest_1.describe)('saveConnectionState', () => {
        (0, vitest_1.it)('should save a new connection state', async () => {
            const state = {
                connectionId: 'test-connection-1',
                status: ssh_1.ConnectionStatus.Connected,
                config: {
                    host: 'example.com',
                    port: 22,
                    username: 'testuser',
                    authMethod: 'password',
                    password: 'testpass'
                },
                lastActivity: new Date(),
                reconnectAttempts: 0
            };
            await stateManager.saveConnectionState(state);
            (0, vitest_1.expect)(mockGlobalState.update).toHaveBeenCalled();
            (0, vitest_1.expect)(storedStates).toHaveLength(1);
            (0, vitest_1.expect)(storedStates[0]).toEqual(state);
        });
        (0, vitest_1.it)('should update an existing connection state', async () => {
            // Add initial state
            const initialState = {
                connectionId: 'test-connection-1',
                status: ssh_1.ConnectionStatus.Connected,
                config: {
                    host: 'example.com',
                    port: 22,
                    username: 'testuser',
                    authMethod: 'password',
                    password: 'testpass'
                },
                lastActivity: new Date(),
                reconnectAttempts: 0
            };
            storedStates = [initialState];
            // Update the state
            const updatedState = {
                ...initialState,
                status: ssh_1.ConnectionStatus.Disconnected,
                reconnectAttempts: 2
            };
            await stateManager.saveConnectionState(updatedState);
            (0, vitest_1.expect)(mockGlobalState.update).toHaveBeenCalled();
            (0, vitest_1.expect)(storedStates).toHaveLength(1);
            (0, vitest_1.expect)(storedStates[0]).toEqual(updatedState);
        });
    });
    (0, vitest_1.describe)('getConnectionState', () => {
        (0, vitest_1.it)('should retrieve a connection state by ID', async () => {
            const state = {
                connectionId: 'test-connection-1',
                status: ssh_1.ConnectionStatus.Connected,
                config: {
                    host: 'example.com',
                    port: 22,
                    username: 'testuser',
                    authMethod: 'password',
                    password: 'testpass'
                },
                lastActivity: new Date(),
                reconnectAttempts: 0
            };
            storedStates = [state];
            const retrievedState = await stateManager.getConnectionState('test-connection-1');
            (0, vitest_1.expect)(retrievedState).toEqual(state);
        });
        (0, vitest_1.it)('should return undefined for non-existent connection ID', async () => {
            const retrievedState = await stateManager.getConnectionState('non-existent');
            (0, vitest_1.expect)(retrievedState).toBeUndefined();
        });
    });
    (0, vitest_1.describe)('getAllConnectionStates', () => {
        (0, vitest_1.it)('should retrieve all connection states', async () => {
            const state1 = {
                connectionId: 'test-connection-1',
                status: ssh_1.ConnectionStatus.Connected,
                config: {
                    host: 'example1.com',
                    port: 22,
                    username: 'testuser1',
                    authMethod: 'password',
                    password: 'testpass1'
                },
                lastActivity: new Date(),
                reconnectAttempts: 0
            };
            const state2 = {
                connectionId: 'test-connection-2',
                status: ssh_1.ConnectionStatus.Disconnected,
                config: {
                    host: 'example2.com',
                    port: 22,
                    username: 'testuser2',
                    authMethod: 'password',
                    password: 'testpass2'
                },
                lastActivity: new Date(),
                reconnectAttempts: 1
            };
            storedStates = [state1, state2];
            const retrievedStates = await stateManager.getAllConnectionStates();
            (0, vitest_1.expect)(retrievedStates).toHaveLength(2);
            (0, vitest_1.expect)(retrievedStates).toEqual([state1, state2]);
        });
        (0, vitest_1.it)('should return empty array when no states exist', async () => {
            const retrievedStates = await stateManager.getAllConnectionStates();
            (0, vitest_1.expect)(retrievedStates).toHaveLength(0);
        });
    });
    (0, vitest_1.describe)('updateConnectionState', () => {
        (0, vitest_1.it)('should update an existing connection state', async () => {
            const initialState = {
                connectionId: 'test-connection-1',
                status: ssh_1.ConnectionStatus.Connected,
                config: {
                    host: 'example.com',
                    port: 22,
                    username: 'testuser',
                    authMethod: 'password',
                    password: 'testpass'
                },
                lastActivity: new Date(),
                reconnectAttempts: 0
            };
            storedStates = [initialState];
            await stateManager.updateConnectionState('test-connection-1', {
                status: ssh_1.ConnectionStatus.Reconnecting,
                reconnectAttempts: 1
            });
            (0, vitest_1.expect)(storedStates[0].status).toBe(ssh_1.ConnectionStatus.Reconnecting);
            (0, vitest_1.expect)(storedStates[0].reconnectAttempts).toBe(1);
            (0, vitest_1.expect)(storedStates[0].config).toEqual(initialState.config);
        });
        (0, vitest_1.it)('should create new state for non-existent connection ID', async () => {
            await stateManager.updateConnectionState('non-existent', { status: ssh_1.ConnectionStatus.Connected });
            const states = await stateManager.getAllConnectionStates();
            const newState = states.find(s => s.connectionId === 'non-existent');
            (0, vitest_1.expect)(newState).toBeDefined();
            (0, vitest_1.expect)(newState?.status).toBe(ssh_1.ConnectionStatus.Connected);
        });
        (0, vitest_1.it)('should update lastActivity when not explicitly provided', async () => {
            const initialDate = new Date(2023, 0, 1);
            const initialState = {
                connectionId: 'test-connection-1',
                status: ssh_1.ConnectionStatus.Connected,
                config: {
                    host: 'example.com',
                    port: 22,
                    username: 'testuser',
                    authMethod: 'password',
                    password: 'testpass'
                },
                lastActivity: initialDate,
                reconnectAttempts: 0
            };
            storedStates = [initialState];
            await stateManager.updateConnectionState('test-connection-1', {
                status: ssh_1.ConnectionStatus.Reconnecting
            });
            (0, vitest_1.expect)(storedStates[0].lastActivity).not.toEqual(initialDate);
        });
    });
    (0, vitest_1.describe)('deleteConnectionState', () => {
        (0, vitest_1.it)('should delete a connection state by ID', async () => {
            const state1 = {
                connectionId: 'test-connection-1',
                status: ssh_1.ConnectionStatus.Connected,
                config: {
                    host: 'example1.com',
                    port: 22,
                    username: 'testuser1',
                    authMethod: 'password',
                    password: 'testpass1'
                },
                lastActivity: new Date(),
                reconnectAttempts: 0
            };
            const state2 = {
                connectionId: 'test-connection-2',
                status: ssh_1.ConnectionStatus.Disconnected,
                config: {
                    host: 'example2.com',
                    port: 22,
                    username: 'testuser2',
                    authMethod: 'password',
                    password: 'testpass2'
                },
                lastActivity: new Date(),
                reconnectAttempts: 1
            };
            storedStates = [state1, state2];
            await stateManager.deleteConnectionState('test-connection-1');
            (0, vitest_1.expect)(storedStates).toHaveLength(1);
            (0, vitest_1.expect)(storedStates[0].connectionId).toBe('test-connection-2');
        });
        (0, vitest_1.it)('should do nothing for non-existent connection ID', async () => {
            const state = {
                connectionId: 'test-connection-1',
                status: ssh_1.ConnectionStatus.Connected,
                config: {
                    host: 'example.com',
                    port: 22,
                    username: 'testuser',
                    authMethod: 'password',
                    password: 'testpass'
                },
                lastActivity: new Date(),
                reconnectAttempts: 0
            };
            storedStates = [state];
            await stateManager.deleteConnectionState('non-existent');
            (0, vitest_1.expect)(storedStates).toHaveLength(1);
        });
    });
    (0, vitest_1.describe)('clearConnectionStates', () => {
        (0, vitest_1.it)('should clear all connection states', async () => {
            const state1 = {
                connectionId: 'test-connection-1',
                status: ssh_1.ConnectionStatus.Connected,
                config: {
                    host: 'example1.com',
                    port: 22,
                    username: 'testuser1',
                    authMethod: 'password',
                    password: 'testpass1'
                },
                lastActivity: new Date(),
                reconnectAttempts: 0
            };
            const state2 = {
                connectionId: 'test-connection-2',
                status: ssh_1.ConnectionStatus.Disconnected,
                config: {
                    host: 'example2.com',
                    port: 22,
                    username: 'testuser2',
                    authMethod: 'password',
                    password: 'testpass2'
                },
                lastActivity: new Date(),
                reconnectAttempts: 1
            };
            storedStates = [state1, state2];
            await stateManager.clearConnectionStates();
            (0, vitest_1.expect)(storedStates).toHaveLength(0);
        });
    });
});
//# sourceMappingURL=connection-state-manager.test.js.map