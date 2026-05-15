"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { ChatMessage, Conversation } from "@/types/chat";

interface ChatContextType {
  conversations: Conversation[];
  activeConversationId: string | undefined;
  currentMessages: ChatMessage[];
  isLoading: boolean;
  isDarkMode: boolean;
  isMobileMenuOpen: boolean;
  handleSendMessage: (message: string) => Promise<void>;
  handleSuggestionClick: (question: string) => void;
  handleNewConversation: () => void;
  handleSelectConversation: (id: string) => void;
  toggleDarkMode: () => void;
  toggleMobileMenu: () => void;
}

const ChatContext = createContext<ChatContextType | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<
    string | undefined
  >();
  const [isLoading, setIsLoading] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("darkMode");
      return saved === "true";
    }
    return false;
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentMessages = activeConversationId
    ? conversations.find((c) => c.id === activeConversationId)?.messages || []
    : [];

  const generateConversationTitle = async (
    message: string,
  ): Promise<string> => {
    try {
      const response = await fetch("/api/generate-title", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      return data.title || message.substring(0, 30);
    } catch {
      return message.substring(0, 30);
    }
  };

  const handleSendMessage = async (message: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message,
      role: "user",
      timestamp: new Date(),
    };

    let targetConvId = activeConversationId;

    if (!activeConversationId) {
      const title = await generateConversationTitle(message);
      const newConv: Conversation = {
        id: Date.now().toString(),
        title,
        messages: [userMessage],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setConversations((prev) => [newConv, ...prev]);
      setActiveConversationId(newConv.id);
      targetConvId = newConv.id;
    } else {
      const isDefaultTitle =
        conversations.find((c) => c.id === activeConversationId)?.title ===
        "New Conversation";

      const newTitle = isDefaultTitle
        ? await generateConversationTitle(message)
        : conversations.find((c) => c.id === activeConversationId)?.title || "";

      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === activeConversationId
            ? {
                ...conv,
                messages: [...conv.messages, userMessage],
                title: newTitle,
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
    setConversations((prev) => [...prev, newConv]);
    setActiveConversationId(newConv.id);
  };

  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      localStorage.setItem("darkMode", String(newMode));
      return newMode;
    });
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <ChatContext.Provider
      value={{
        conversations,
        activeConversationId,
        currentMessages,
        isLoading,
        isDarkMode,
        isMobileMenuOpen,
        handleSendMessage,
        handleSuggestionClick,
        handleNewConversation,
        handleSelectConversation,
        toggleDarkMode,
        toggleMobileMenu,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
}
