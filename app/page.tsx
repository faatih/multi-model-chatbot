import { ChatContainer } from "@/components/chat-container";
import { Sidebar } from "@/components/sidebar";

export default function Home() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <ChatContainer />
    </div>
  );
}