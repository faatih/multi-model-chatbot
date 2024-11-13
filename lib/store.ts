"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ChatSession, ModelConfig } from "./types";

interface ChatStore {
  sessions: ChatSession[];
  activeSessionId: string | null;
  models: ModelConfig[];
  addSession: (session: ChatSession) => void;
  setActiveSession: (id: string) => void;
  updateSession: (session: ChatSession) => void;
  toggleModel: (id: string) => void;
  updateModelConfig: (id: string, config: Partial<ModelConfig>) => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      sessions: [],
      activeSessionId: null,
      models: [
        { id: "gpt4", name: "GPT-4", enabled: true, temperature: 0.7, maxTokens: 2000 },
        { id: "claude", name: "Claude 3", enabled: true, temperature: 0.7, maxTokens: 2000 },
        { id: "gemini", name: "Gemini Pro", enabled: true, temperature: 0.7, maxTokens: 2000 },
        { id: "mistral", name: "Mistral", enabled: false, temperature: 0.7, maxTokens: 2000 },
      ],
      addSession: (session) =>
        set((state) => ({
          sessions: [...state.sessions, session],
          activeSessionId: session.id,
        })),
      setActiveSession: (id) =>
        set(() => ({
          activeSessionId: id,
        })),
      updateSession: (session) =>
        set((state) => ({
          sessions: state.sessions.map((s) =>
            s.id === session.id ? session : s
          ),
        })),
      toggleModel: (id) =>
        set((state) => ({
          models: state.models.map((m) =>
            m.id === id ? { ...m, enabled: !m.enabled } : m
          ),
        })),
      updateModelConfig: (id, config) =>
        set((state) => ({
          models: state.models.map((m) =>
            m.id === id ? { ...m, ...config } : m
          ),
        })),
    }),
    {
      name: "chat-store",
    }
  )
);