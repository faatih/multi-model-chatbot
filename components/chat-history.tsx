"use client";

import { useChatStore } from "@/lib/store";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { format } from "date-fns";
import { MessageSquare } from "lucide-react";

export function ChatHistory() {
  const { sessions, activeSessionId, setActiveSession } = useChatStore();

  return (
    <ScrollArea className="h-[calc(100vh-4rem)]">
      <div className="space-y-2 p-4">
        {sessions.map((session) => (
          <Button
            key={session.id}
            variant={session.id === activeSessionId ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveSession(session.id)}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            <div className="flex flex-1 flex-col items-start text-sm">
              <span className="font-medium">{session.title}</span>
              <span className="text-xs text-muted-foreground">
                {format(new Date(session.timestamp), "MMM d, yyyy")}
              </span>
            </div>
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
}