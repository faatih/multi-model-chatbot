import { Settings2 } from "lucide-react";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";

export function ChatHeader() {
  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="text-sm font-medium">New Chat</div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Settings2 className="h-5 w-5" />
        </Button>
        <ModeToggle />
      </div>
    </header>
  );
}