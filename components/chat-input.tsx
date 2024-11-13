"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useChatStore } from "@/lib/store";
import { evaluateResponses } from "@/lib/quality-evaluator";
import { Message, ModelResponse } from "@/lib/types";

export function ChatInput() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { sessions, activeSessionId, models, addSession, updateSession } = useChatStore();

  const activeSession = sessions.find((s) => s.id === activeSessionId);

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

  return (
    <form onSubmit={handleSubmit} className="border-t p-4">
      <div className="flex space-x-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="min-h-[60px]"
        />
        <Button type="submit" size="icon" disabled={isLoading}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}