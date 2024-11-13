"use client";

import { useState } from "react";
import { Bot, Send, Sparkles, User } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  model?: string;
  timestamp: Date;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate response from multiple models
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "This is a simulated response from multiple models.",
        role: "assistant",
        model: "GPT-4",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-1 flex-col">
      <ScrollArea className="flex-1 p-4">
        <div className="mx-auto max-w-3xl space-y-4">
          {messages.map((message) => (
            <Card
              key={message.id}
              className={cn(
                "flex items-start gap-4 p-4",
                message.role === "assistant" && "bg-muted"
              )}
            >
              <div className="h-8 w-8 rounded-full bg-primary/10 p-1">
                {message.role === "user" ? (
                  <User className="h-full w-full" />
                ) : (
                  <Bot className="h-full w-full" />
                )}
              </div>
              <div className="flex-1">
                {message.model && (
                  <div className="mb-1 flex items-center gap-1 text-sm text-muted-foreground">
                    <Sparkles className="h-3 w-3" />
                    {message.model}
                  </div>
                )}
                <p className="text-sm">{message.content}</p>
              </div>
            </Card>
          ))}
          {isLoading && (
            <Card className="flex items-start gap-4 bg-muted p-4">
              <div className="h-8 w-8 rounded-full bg-primary/10 p-1">
                <Bot className="h-full w-full" />
              </div>
              <div className="flex-1">
                <div className="animate-pulse space-y-2">
                  <div className="h-4 w-1/4 rounded bg-primary/10" />
                  <div className="h-4 w-3/4 rounded bg-primary/10" />
                </div>
              </div>
            </Card>
          )}
        </div>
      </ScrollArea>
      <form onSubmit={handleSubmit} className="container py-4">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything..."
            className="min-h-[52px] resize-none"
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}