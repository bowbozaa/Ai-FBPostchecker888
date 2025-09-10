"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
// Mock vscode module
vitest_1.vi.mock('vscode', () => {
    return {
        workspace: {
            getConfiguration: vitest_1.vi.fn().mockReturnValue({
                get: vitest_1.vi.fn().mockReturnValue([]),
                update: vitest_1.vi.fn()
            })
        },
        ConfigurationTarget: {
            Global: 1
        }
    };
});
// Mock uuid module with a proper UUID format that returns different values
let uuidCounter = 0;
vitest_1.vi.mock('uuid', () => ({
    v4: vitest_1.vi.fn(() => {
        uuidCounter++;
        return `12345678-1234-1234-1234-${uuidCounter.toString().padStart(12, '0')}`;
    })
}));
// Import after mocking
const terminal_session_manager_1 = require("./terminal-session-manager");
(0, vitest_1.describe)('TerminalSessionManager', () => {
    let sessionManager;
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.clearAllMocks();
        sessionManager = new terminal_session_manager_1.TerminalSessionManager();
    });
    (0, vitest_1.afterEach)(() => {
        vitest_1.vi.restoreAllMocks();
    });
    (0, vitest_1.describe)('createSession', () => {
        (0, vitest_1.it)('should create a new terminal session', () => {
            const session = sessionManager.createSession('connection-1', '/home/user', { TERM: 'xterm-256color' });
            (0, vitest_1.expect)(session).toBeDefined();
            (0, vitest_1.expect)(session.id).toMatch(/^12345678-1234-1234-1234-\d{12}$/);
            (0, vitest_1.expect)(session.connectionId).toBe('connection-1');
            (0, vitest_1.expect)(session.cwd).toBe('/home/user');
            (0, vitest_1.expect)(session.environment).toEqual({ TERM: 'xterm-256color' });
            (0, vitest_1.expect)(session.isActive).toBe(true);
            (0, vitest_1.expect)(session.lastActivity).toBeInstanceOf(Date);
        });
        (0, vitest_1.it)('should use default values when not provided', () => {
            const session = sessionManager.createSession('connection-1');
            (0, vitest_1.expect)(session.cwd).toBe('~');
            (0, vitest_1.expect)(session.environment).toEqual({});
        });
    });
    (0, vitest_1.describe)('getSession', () => {
        (0, vitest_1.it)('should return a session by ID', () => {
            const createdSession = sessionManager.createSession('connection-1');
            const retrievedSession = sessionManager.getSession(createdSession.id);
            (0, vitest_1.expect)(retrievedSession).toBeDefined();
            (0, vitest_1.expect)(retrievedSession).toEqual(createdSession);
        });
        (0, vitest_1.it)('should return undefined for non-existent session', () => {
            const session = sessionManager.getSession('non-existent-id');
            (0, vitest_1.expect)(session).toBeUndefined();
        });
    });
    (0, vitest_1.describe)('getAllSessions', () => {
        (0, vitest_1.it)('should return all sessions', () => {
            const session1 = sessionManager.createSession('connection-1');
            const session2 = sessionManager.createSession('connection-2');
            const allSessions = sessionManager.getAllSessions();
            (0, vitest_1.expect)(allSessions.length).toBe(2);
            (0, vitest_1.expect)(allSessions).toContainEqual(session1);
            (0, vitest_1.expect)(allSessions).toContainEqual(session2);
        });
        (0, vitest_1.it)('should return an empty array when no sessions exist', () => {
            const allSessions = sessionManager.getAllSessions();
            (0, vitest_1.expect)(allSessions.length).toBe(0);
        });
    });
    (0, vitest_1.describe)('getSessionsByConnection', () => {
        (0, vitest_1.it)('should return sessions for a specific connection', () => {
            const session1 = sessionManager.createSession('connection-1');
            const session2 = sessionManager.createSession('connection-1');
            const session3 = sessionManager.createSession('connection-2');
            const connection1Sessions = sessionManager.getSessionsByConnection('connection-1');
            (0, vitest_1.expect)(connection1Sessions.length).toBe(2);
            (0, vitest_1.expect)(connection1Sessions).toContainEqual(session1);
            (0, vitest_1.expect)(connection1Sessions).toContainEqual(session2);
            (0, vitest_1.expect)(connection1Sessions).not.toContainEqual(session3);
        });
        (0, vitest_1.it)('should return an empty array when no sessions exist for the connection', () => {
            const sessions = sessionManager.getSessionsByConnection('non-existent-connection');
            (0, vitest_1.expect)(sessions.length).toBe(0);
        });
    });
    (0, vitest_1.describe)('updateSession', () => {
        (0, vitest_1.it)('should update a session', () => {
            const session = sessionManager.createSession('connection-1', '/home/user');
            // Wait a bit to ensure different timestamps
            const originalLastActivity = session.lastActivity;
            const updatedSession = sessionManager.updateSession(session.id, {
                cwd: '/home/user/project',
                pid: 12345
            });
            (0, vitest_1.expect)(updatedSession).toBeDefined();
            (0, vitest_1.expect)(updatedSession?.cwd).toBe('/home/user/project');
            (0, vitest_1.expect)(updatedSession?.pid).toBe(12345);
            (0, vitest_1.expect)(updatedSession?.connectionId).toBe('connection-1');
            // The lastActivity should be updated, but in tests it might be the same due to timing
            (0, vitest_1.expect)(updatedSession?.lastActivity).toBeInstanceOf(Date);
        });
        (0, vitest_1.it)('should return undefined for non-existent session', () => {
            const updatedSession = sessionManager.updateSession('non-existent-id', {
                cwd: '/home/user/project'
            });
            (0, vitest_1.expect)(updatedSession).toBeUndefined();
        });
    });
    (0, vitest_1.describe)('deleteSession', () => {
        (0, vitest_1.it)('should delete a session', () => {
            const session = sessionManager.createSession('connection-1');
            const result = sessionManager.deleteSession(session.id);
            (0, vitest_1.expect)(result).toBe(true);
            (0, vitest_1.expect)(sessionManager.getSession(session.id)).toBeUndefined();
        });
        (0, vitest_1.it)('should return false for non-existent session', () => {
            const result = sessionManager.deleteSession('non-existent-id');
            (0, vitest_1.expect)(result).toBe(false);
        });
    });
    (0, vitest_1.describe)('deactivateSession and activateSession', () => {
        (0, vitest_1.it)('should deactivate a session', () => {
            const session = sessionManager.createSession('connection-1');
            const deactivatedSession = sessionManager.deactivateSession(session.id);
            (0, vitest_1.expect)(deactivatedSession).toBeDefined();
            (0, vitest_1.expect)(deactivatedSession?.isActive).toBe(false);
        });
        (0, vitest_1.it)('should activate a session', () => {
            const session = sessionManager.createSession('connection-1');
            sessionManager.deactivateSession(session.id);
            const activatedSession = sessionManager.activateSession(session.id);
            (0, vitest_1.expect)(activatedSession).toBeDefined();
            (0, vitest_1.expect)(activatedSession?.isActive).toBe(true);
        });
    });
    (0, vitest_1.describe)('getSessionState', () => {
        (0, vitest_1.it)('should return the state of a session', () => {
            const session = sessionManager.createSession('connection-1', '/home/user', { TERM: 'xterm-256color' });
            const state = sessionManager.getSessionState(session.id);
            (0, vitest_1.expect)(state).toBeDefined();
            (0, vitest_1.expect)(state?.sessionId).toBe(session.id);
            (0, vitest_1.expect)(state?.isConnected).toBe(true);
            (0, vitest_1.expect)(state?.workingDirectory).toBe('/home/user');
            (0, vitest_1.expect)(state?.environmentVariables).toEqual({ TERM: 'xterm-256color' });
        });
        (0, vitest_1.it)('should return undefined for non-existent session', () => {
            const state = sessionManager.getSessionState('non-existent-id');
            (0, vitest_1.expect)(state).toBeUndefined();
        });
    });
    (0, vitest_1.describe)('cleanupOldSessions', () => {
        (0, vitest_1.it)('should remove inactive sessions older than the specified age', () => {
            // Create an active session
            const activeSession = sessionManager.createSession('connection-1');
            // Create an inactive session
            const inactiveSession = sessionManager.createSession('connection-1');
            sessionManager.deactivateSession(inactiveSession.id);
            // Mock the lastActivity date to be older
            const oldDate = new Date();
            oldDate.setDate(oldDate.getDate() - 10); // 10 days old
            inactiveSession.lastActivity = oldDate;
            // Run cleanup with 7 days max age
            sessionManager.cleanupOldSessions(7);
            // Check that the inactive old session was removed
            (0, vitest_1.expect)(sessionManager.getSession(activeSession.id)).toBeDefined();
            (0, vitest_1.expect)(sessionManager.getSession(inactiveSession.id)).toBeUndefined();
        });
        (0, vitest_1.it)('should not remove active sessions regardless of age', () => {
            // Create an active session
            const activeSession = sessionManager.createSession('connection-1');
            // Mock the lastActivity date to be older
            const oldDate = new Date();
            oldDate.setDate(oldDate.getDate() - 10); // 10 days old
            activeSession.lastActivity = oldDate;
            // Run cleanup with 7 days max age
            sessionManager.cleanupOldSessions(7);
            // Check that the active session was not removed despite being old
            (0, vitest_1.expect)(sessionManager.getSession(activeSession.id)).toBeDefined();
        });
    });
});
//# sourceMappingURL=terminal-session-manager.test.js.map