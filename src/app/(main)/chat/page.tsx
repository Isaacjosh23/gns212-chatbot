"use client";

import { useState } from "react";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/store/hooks/useLogout";
import { ChatMessage, Conversation } from "@/types/chat";

export default function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<
    string | undefined
  >();
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const currentMessages = activeConversationId
    ? conversations.find((c) => c.id === activeConversationId)?.messages || []
    : [];

  const handleSendMessage = async (message: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message,
      role: "user",
      timestamp: new Date(),
    };

    // Create new conversation if none exists
    let targetConvId = activeConversationId;

    if (!activeConversationId) {
      const newConv: Conversation = {
        id: Date.now().toString(),
        title: message.substring(0, 30) + (message.length > 30 ? "..." : ""),
        messages: [userMessage],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setConversations((prev) => [newConv, ...prev]);
      setActiveConversationId(newConv.id);
      targetConvId = newConv.id;
    } else {
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === activeConversationId
            ? {
                ...conv,
                messages: [...conv.messages, userMessage],
                updatedAt: new Date(),
              }
            : conv,
        ),
      );
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          conversationHistory: currentMessages,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: data.content,
        role: "assistant",
        timestamp: new Date(),
        citations: data.citations,
      };

      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === targetConvId
            ? {
                ...conv,
                messages: [...conv.messages, assistantMessage],
                updatedAt: new Date(),
              }
            : conv,
        ),
      );
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (question: string) => {
    handleSendMessage(question);
  };

  const handleNewConversation = () => {
    const newConv: Conversation = {
      id: Date.now().toString(),
      title: "New Conversation",
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveConversationId(newConv.id);
  };

  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex w-full h-screen bg-(--bg)">
      {/* Sidebar - Visible on tablet and desktop */}
      <div className="hidden md:flex md:flex-col">
        <ChatSidebar
          conversations={conversations}
          activeConversationId={activeConversationId}
          onSelectConversation={handleSelectConversation}
          onNewConversation={handleNewConversation}
        />
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`fixed left-0 top-0 h-screen w-64 bg-[var(--bg-surface)] border-r border-[var(--navy-mid)]/10 flex flex-col overflow-hidden md:hidden transform transition-transform duration-300 z-50 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="p-3 border-b border-[var(--navy-mid)]/10">
          <Button
            onClick={() => {
              handleNewConversation();
              setIsMobileMenuOpen(false);
            }}
            className="w-full bg-[var(--navy)] hover:bg-[var(--navy-mid)] text-white text-sm cursor-pointer"
          >
            + New Chat
          </Button>
        </div>

        {/* Mobile Menu Conversations */}
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-2">
          {conversations.length === 0 ? (
            <p className="text-sm text-[var(--text-secondary)] px-2 py-4">
              No conversations yet
            </p>
          ) : (
            conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => {
                  handleSelectConversation(conv.id);
                  setIsMobileMenuOpen(false);
                }}
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

        {/* Mobile Menu Logout */}
        <MobileMenuLogout setIsMobileMenuOpen={setIsMobileMenuOpen} />
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <ChatHeader
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          onLogout={() => console.log("Logout")}
          onHamburgerClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        {/* Chat Window */}
        <ChatWindow
          messages={currentMessages}
          isLoading={isLoading}
          onSuggestedQuestion={handleSuggestionClick}
        />

        {/* Chat Input */}
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}

interface MobileMenuLogoutProps {
  setIsMobileMenuOpen: (open: boolean) => void;
}

function MobileMenuLogout({ setIsMobileMenuOpen }: MobileMenuLogoutProps) {
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="p-3 border-t border-[var(--navy-mid)]/10">
      <Button
        onClick={handleLogout}
        variant="outline"
        className="w-full text-sm cursor-pointer"
      >
        Logout
      </Button>
    </div>
  );
}
