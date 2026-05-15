"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import MenuIcon from "../ui/icons/menu";
import { useLogout } from "@/store/hooks/useLogout";
import { useChatContext } from "@/context/ChatContext";

export function MobileMenu() {
  const {
    conversations,
    activeConversationId,
    handleNewConversation,
    handleSelectConversation,
  } = useChatContext();

  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useLogout();

  const handleSelect = (id: string) => {
    handleSelectConversation(id);
    setIsOpen(false);
  };

  const handleNew = () => {
    handleNewConversation();
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex items-center justify-center p-2 hover:bg-[var(--navy-mid)] rounded cursor-pointer"
        aria-label="Toggle menu"
      >
        <MenuIcon className="w-8 h-8 text-white" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed left-0 top-0 h-[100dvh] w-64 bg-[var(--bg-surface)] border-r border-[var(--navy-mid)]/10 flex flex-col md:hidden transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex-shrink-0 p-3 border-b border-[var(--navy-mid)]/10">
          <Button
            onClick={handleNew}
            className="w-full bg-[var(--navy)] hover:bg-[var(--navy-mid)] text-white text-xl cursor-pointer"
          >
            + New Chat
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1 min-h-0">
          {conversations.length === 0 ? (
            <p className="text-xl text-navy px-2 py-3">No conversations yet</p>
          ) : (
            conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => handleSelect(conv.id)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors line-clamp-2 text-xl cursor-pointer ${
                  activeConversationId === conv.id
                    ? "bg-[var(--gold)] text-white font-medium"
                    : "text-foreground hover:bg-[var(--bg-page)]"
                }`}
              >
                {conv.title}
              </button>
            ))
          )}
        </div>

        <div className="flex-shrink-0 p-3 border-t border-[var(--navy-mid)]/10">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full cursor-pointer text-xl text-foreground"
          >
            Logout
          </Button>
        </div>
      </div>
    </>
  );
}
