"use client";

import { useState } from "react";
import { Conversation } from "@/types/chat";
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  conversations: Conversation[];
  activeConversationId?: string;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onLogout: () => void;
}

export function MobileMenu({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewConversation,
  onLogout,
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectConversation = (id: string) => {
    onSelectConversation(id);
    setIsOpen(false);
  };

  const handleNewConversation = () => {
    onNewConversation();
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Button - Mobile Only */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex flex-col gap-1.5 p-2 hover:bg-[var(--navy-mid)] rounded cursor-pointer"
        aria-label="Toggle menu"
      >
        <div className="w-6 h-0.5 bg-white rounded"></div>
        <div className="w-6 h-0.5 bg-white rounded"></div>
        <div className="w-6 h-0.5 bg-white rounded"></div>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`fixed left-0 top-0 h-screen w-64 bg-[var(--bg-surface)] border-r border-[var(--navy-mid)]/10 flex flex-col overflow-hidden md:hidden transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-3 border-b border-[var(--navy-mid)]/10">
          <Button
            onClick={handleNewConversation}
            className="w-full bg-[var(--navy)] hover:bg-[var(--navy-mid)] text-white text-sm cursor-pointer"
          >
            + New Chat
          </Button>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-2">
          {conversations.length === 0 ? (
            <p className="text-sm text-[var(--text-secondary)] px-2 py-4">
              No conversations yet
            </p>
          ) : (
            conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => handleSelectConversation(conv.id)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors line-clamp-2 text-sm cursor-pointer ${
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

        {/* Logout Button */}
        <div className="p-3 border-t border-[var(--navy-mid)]/10">
          <Button
            onClick={onLogout}
            variant="outline"
            className="w-full text-sm cursor-pointer"
          >
            Logout
          </Button>
        </div>
      </div>
    </>
  );
}
