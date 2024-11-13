"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatHistory } from "./chat-history";
import { ModelSettings } from "./model-settings";
import { MessageSquarePlus, Settings } from "lucide-react";
import { useState } from "react";
import { useChatStore } from "@/lib/store";

export function Sidebar() {
  const [showSettings, setShowSettings] = useState(false);
  const addSession = useChatStore((state) => state.addSession);

  const handleNewChat = () => {
    addSession({
      id: Date.now().toString(),
      title: "New Chat",
      messages: [],
      timestamp: new Date(),
    });
  };

  return (
    <div className="w-80 border-r bg-muted/10">
      <div className="flex h-16 items-center justify-between px-4">
        <Button onClick={handleNewChat} className="w-full justify-start">
          <MessageSquarePlus className="mr-2 h-4 w-4" />
          New Chat
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowSettings(!showSettings)}
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-4rem)]">
        {showSettings ? <ModelSettings /> : <ChatHistory />}
      </ScrollArea>
    </div>
  );
}