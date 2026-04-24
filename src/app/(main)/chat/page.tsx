"use client";

import { useState } from "react";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
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
    // Add user message to the chat
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message,
      role: "user",
      timestamp: new Date(),
    };

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
    setIsLoading(true);

    try {
      // TODO: Call your API endpoint here
      // const response = await fetch("/api/chat", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ message, conversationHistory: currentMessages }),
      // });
      // const data = await response.json();

      // Mock response for now
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "This is a mock response. API integration pending.",
        role: "assistant",
        timestamp: new Date(),
      };

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === activeConversationId
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
    // Create user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: question,
      role: "user",
      timestamp: new Date(),
    };

    const targetConvId = activeConversationId || Date.now().toString();

    // If no active conversation, create a new one
    if (!activeConversationId) {
      const newConv: Conversation = {
        id: targetConvId,
        title: question.substring(0, 30) + (question.length > 30 ? "..." : ""),
        messages: [userMessage],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setConversations((prev) => [newConv, ...prev]);
      setActiveConversationId(targetConvId);
    } else {
      // Add message to existing active conversation
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === activeConversationId
            ? {
                ...conv,
                messages: [...conv.messages, userMessage],
                title:
                  conv.messages.length === 0
                    ? question.substring(0, 30) +
                      (question.length > 30 ? "..." : "")
                    : conv.title,
                updatedAt: new Date(),
              }
            : conv,
        ),
      );
    }

    setIsLoading(true);

    // Get assistant response
    setTimeout(async () => {
      try {
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          content: "This is a mock response. API integration pending.",
          role: "assistant",
          timestamp: new Date(),
        };

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

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
        console.error("Error getting response:", error);
      } finally {
        setIsLoading(false);
      }
    }, 0);
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

  return (
    <div className="flex w-full h-screen bg-(--bg)">
      {/* Sidebar */}
      <ChatSidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={handleSelectConversation}
        onNewConversation={handleNewConversation}
      />

      {/* Main Chat Area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <ChatHeader
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          onLogout={() => console.log("Logout")}
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
