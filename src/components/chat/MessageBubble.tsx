"use client";

import { ChatMessage as ChatMessageType } from "@/types/chat";
import { TypingIndicator } from "./TypingIndicator";

interface MessageBubbleProps {
  message: ChatMessageType;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} gap-3 animate-fadeIn`}
    >
      {!isUser && (
        <div className="h-10 w-10 rounded-full bg-[var(--navy)] flex-shrink-0 flex items-center justify-center text-[var(--gold)] text-xl font-bold">
          AI
        </div>
      )}

      <div
        className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-lg ${
          isUser
            ? "bg-[var(--navy)] text-white rounded-br-none"
            : "bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-bl-none border border-[var(--navy-mid)]/10"
        }`}
      >
        <p className="text-[1.4rem] leading-relaxed">{message.content}</p>

        {!isUser && message.citations && message.citations.length > 0 && (
          <div className="mt-2 pt-2 border-t border-[var(--navy-mid)]/20 flex flex-wrap gap-2">
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
