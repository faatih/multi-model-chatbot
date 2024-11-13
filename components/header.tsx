import { Brain, Settings } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Brain className="h-6 w-6" />
          <span className="ml-2 font-bold">Multi-Model Chat</span>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}