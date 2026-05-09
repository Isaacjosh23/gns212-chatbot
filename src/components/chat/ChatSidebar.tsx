"use client";

import { Conversation } from "@/types/chat";
import { Button } from "@/components/ui/button";

interface ChatSidebarProps {
  conversations: Conversation[];
  activeConversationId?: string;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
}

export function ChatSidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewConversation,
}: ChatSidebarProps) {
  return (
    <div className="w-full md:w-80 lg:w-96 flex-shrink-0 bg-[var(--bg-surface)] border-r border-[var(--navy-mid)]/10 flex flex-col overflow-hidden">
      <div className="p-2 sm:p-3 md:p-4 border-b border-[var(--navy-mid)]/10">
        <Button
          onClick={onNewConversation}
          className="w-full bg-[var(--navy)] hover:bg-[var(--navy-mid)] text-white text-sm sm:text-base md:text-lg cursor-pointer"
        >
          + New Chat
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto px-1 sm:px-2 md:px-2 py-2 sm:py-3 md:py-4 space-y-1 sm:space-y-2">
        {conversations.length === 0 ? (
          <p className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] px-2 py-4">
            No conversations yet
          </p>
        ) : (
          conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => onSelectConversation(conv.id)}
              className={`w-full text-left px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-colors line-clamp-2 text-sm sm:text-base md:text-lg cursor-pointer ${
                activeConversationId === conv.id
                  ? "bg-[var(--gold)] text-[var(--navy)] font-medium"
                  : "text-[var(--text-primary)] hover:bg-[var(--bg-page)]"
              }`}
            >
              {conv.title}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
