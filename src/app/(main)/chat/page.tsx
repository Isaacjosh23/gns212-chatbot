"use client";

import { ChatHeader } from "@/components/chat/ChatHeader";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatSidebar } from "@/components/chat/ChatSidebar";

export default function ChatPage() {
  return (
    <div className="flex w-full h-screen bg-(--bg)">
      <div className="hidden md:flex md:flex-col">
        <ChatSidebar />
      </div>

      <div className="flex flex-col flex-1">
        <ChatHeader />

        <ChatWindow />

        <ChatInput />
      </div>
    </div>
  );
}
