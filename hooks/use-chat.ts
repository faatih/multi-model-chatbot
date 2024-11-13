"use client";

import { useState } from "react";
import { useAtom } from "jotai";
import { sessionsAtom, activeSessionIdAtom, modelsAtom } from "@/lib/store";
import { Message, ModelResponse } from "@/lib/types";
import { evaluateResponses } from "@/lib/quality-evaluator";

export function useChat() {
  const [sessions, setSessions] = useAtom(sessionsAtom);
  const [activeSessionId, setActiveSessionId] = useAtom(activeSessionIdAtom);
  const [models] = useAtom(modelsAtom);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const activeSession = sessions.find((s) => s.id === activeSessionId);
  const messages = activeSession?.messages || [];

  const addSession = (session: ChatSession) => {
    setSessions((prev) => [...prev, session]);
    setActiveSessionId(session.id);
  };

  const updateSession = (session: ChatSession) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === session.id ? session : s))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
      timestamp: new Date(),
    };

    if (!activeSession) {
      const newSession = {
        id: Date.now().toString(),
        title: input.trim().slice(0, 30) + "...",
        timestamp: new Date(),
        messages: [userMessage],
      };
      addSession(newSession);
    } else {
      updateSession({
        ...activeSession,
        messages: [...activeSession.messages, userMessage],
      });
    }

    setInput("");
    setIsLoading(true);

    const enabledModels = models.filter((m) => m.enabled);
    const responses: ModelResponse[] = [];

    for (const model of enabledModels) {
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000 + 500));
      
      responses.push({
        model: model.name,
        content: `This is a simulated response from ${model.name}.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
        quality: 0,
        confidence: 0,
      });
    }

    const evaluatedResponses = await evaluateResponses(responses);

    evaluatedResponses.forEach((response) => {
      const message: Message = {
        id: Date.now().toString(),
        content: response.content,
        role: "assistant",
        model: response.model,
        quality: response.quality,
        confidence: response.confidence,
        timestamp: new Date(),
      };

      updateSession({
        ...activeSession!,
        messages: [...activeSession!.messages, message],
      });
    });

    setIsLoading(false);
  };

  return {
    messages,
    input,
    setInput,
    isLoading,
    handleSubmit,
  };
}