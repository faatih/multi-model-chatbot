"use client";

import { useChatStore } from "@/lib/store";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { Bot, User } from "lucide-react";

export function ChatMessages() {
  const { sessions, activeSessionId } = useChatStore();
  const activeSession = sessions.find((s) => s.id === activeSessionId);

  if (!activeSession) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-muted-foreground">Select or start a new chat</p>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {activeSession.messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-4 ${
              message.role === "assistant" ? "flex-row" : "flex-row-reverse"
            }`}
          >
            <div
              className={`rounded-lg p-4 ${
                message.role === "assistant"
                  ? "bg-muted"
                  : "bg-primary text-primary-foreground"
              }`}
            >
              <div className="flex items-center space-x-2">
                {message.role === "assistant" ? (
                  <Bot className="h-4 w-4" />
                ) : (
                  <User className="h-4 w-4" />
                )}
                <span className="text-sm font-medium">
                  {message.role === "assistant" ? message.model : "You"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {format(new Date(message.timestamp), "HH:mm")}
                </span>
              </div>
              <p className="mt-1 text-sm">{message.content}</p>
              {message.quality !== undefined && (
                <div className="mt-2 text-xs text-muted-foreground">
                  Quality: {message.quality.toFixed(1)}% | Confidence:{" "}
                  {message.confidence?.toFixed(1)}%
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}