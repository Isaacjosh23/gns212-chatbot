"use client";

import ReactMarkdown from "react-markdown";
import { ChatMessage as ChatMessageType } from "@/types/chat";
import { useChatContext } from "@/context/ChatContext";

interface MessageBubbleProps {
  message: ChatMessageType;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const { isDarkMode } = useChatContext();

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} gap-2 sm:gap-2.5 animate-fadeIn`}
    >
      {!isUser && (
        <div className="h-10 w-10 rounded-full bg-[var(--navy)] flex-shrink-0 flex items-center justify-center text-[var(--gold)] text-[1.2rem] font-bold">
          G
        </div>
      )}

      <div
        className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 rounded-lg ${
          isUser
            ? "bg-[var(--navy)] text-white rounded-br-none"
            : "bg-[var(--bg-surface)] rounded-bl-none border border-[var(--navy-mid)]/10"
        }`}
      >
        {isUser ? (
          <p className="text-xl lg:text-2xl leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        ) : (
          <div
            className={`text-xl lg:text-2xl leading-relaxed prose prose-sm max-w-none prose-p:my-1 prose-li:my-0.5 prose-ol:my-1 prose-ul:my-1 ${
              isDarkMode ? "prose-invert" : "prose-slate"
            }`}
          >
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        )}

        {!isUser && message.citations && message.citations.length > 0 && (
          <div className="mt-1 sm:mt-1.5 pt-1 sm:pt-1.5 border-t border-[var(--navy-mid)]/20 flex flex-wrap gap-0.5 sm:gap-1">
            {message.citations.map((citation, idx) => (
              <span
                key={idx}
                className="text-xl text-[var(--gold)] font-medium"
              >
                Ch. {citation.chapter}, p. {citation.page}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
