"use client";

import { ChatInput } from "./chat-input";
import { ChatMessages } from "./chat-messages";

export function ChatContainer() {
  return (
    <div className="flex flex-1 flex-col">
      <ChatMessages />
      <ChatInput />
    </div>
  );
}