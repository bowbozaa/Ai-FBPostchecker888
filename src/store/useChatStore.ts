import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChatMessage, ChatSession } from '@/types/chat';

interface ChatStore {
  // Current session
  currentSession: ChatSession | null;

  // All sessions
  sessions: ChatSession[];

  // Create new session
  createSession: (title?: string) => ChatSession;

  // Add message to current session
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;

  // Update last message (for streaming)
  updateLastMessage: (content: string) => void;

  // Switch session
  switchSession: (sessionId: string) => void;

  // Delete session
  deleteSession: (sessionId: string) => void;

  // Clear current session
  clearCurrentSession: () => void;

  // Clear all sessions
  clearAllSessions: () => void;

  // Get session by ID
  getSessionById: (sessionId: string) => ChatSession | undefined;
}

const createNewSession = (title?: string): ChatSession => {
  return {
    id: `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    title: title || `การสนทนาใหม่ ${new Date().toLocaleString('th-TH')}`,
    messages: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      currentSession: createNewSession('การสนทนา 1'),
      sessions: [createNewSession('การสนทนา 1')],

      createSession: (title) => {
        const newSession = createNewSession(title);
        set((state) => ({
          sessions: [newSession, ...state.sessions],
          currentSession: newSession,
        }));
        return newSession;
      },

      addMessage: (message) => {
        const newMessage: ChatMessage = {
          ...message,
          id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          timestamp: new Date().toISOString(),
        };

        set((state) => {
          if (!state.currentSession) {
            const newSession = createNewSession();
            return {
              currentSession: {
                ...newSession,
                messages: [newMessage],
              },
              sessions: [
                {
                  ...newSession,
                  messages: [newMessage],
                },
                ...state.sessions,
              ],
            };
          }

          const updatedSession = {
            ...state.currentSession,
            messages: [...state.currentSession.messages, newMessage],
            updatedAt: new Date().toISOString(),
          };

          return {
            currentSession: updatedSession,
            sessions: state.sessions.map((s) =>
              s.id === updatedSession.id ? updatedSession : s
            ),
          };
        });
      },

      updateLastMessage: (content) => {
        set((state) => {
          if (!state.currentSession || state.currentSession.messages.length === 0) {
            return state;
          }

          const messages = [...state.currentSession.messages];
          const lastMessage = messages[messages.length - 1];
          messages[messages.length - 1] = {
            ...lastMessage,
            content,
            isLoading: false,
          };

          const updatedSession = {
            ...state.currentSession,
            messages,
            updatedAt: new Date().toISOString(),
          };

          return {
            currentSession: updatedSession,
            sessions: state.sessions.map((s) =>
              s.id === updatedSession.id ? updatedSession : s
            ),
          };
        });
      },

      switchSession: (sessionId) => {
        const session = get().sessions.find((s) => s.id === sessionId);
        if (session) {
          set({ currentSession: session });
        }
      },

      deleteSession: (sessionId) => {
        set((state) => {
          const newSessions = state.sessions.filter((s) => s.id !== sessionId);
          const newCurrentSession =
            state.currentSession?.id === sessionId
              ? newSessions[0] || createNewSession()
              : state.currentSession;

          return {
            sessions: newSessions.length > 0 ? newSessions : [createNewSession()],
            currentSession: newCurrentSession,
          };
        });
      },

      clearCurrentSession: () => {
        set((state) => {
          if (!state.currentSession) return state;

          const clearedSession = {
            ...state.currentSession,
            messages: [],
            updatedAt: new Date().toISOString(),
          };

          return {
            currentSession: clearedSession,
            sessions: state.sessions.map((s) =>
              s.id === clearedSession.id ? clearedSession : s
            ),
          };
        });
      },

      clearAllSessions: () => {
        const newSession = createNewSession();
        set({
          sessions: [newSession],
          currentSession: newSession,
        });
      },

      getSessionById: (sessionId) => {
        return get().sessions.find((s) => s.id === sessionId);
      },
    }),
    {
      name: 'ai-chat-storage',
      version: 1,
    }
  )
);
