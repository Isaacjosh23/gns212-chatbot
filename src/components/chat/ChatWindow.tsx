"use client";

import { useRef, useEffect } from "react";
import { ChatMessage as ChatMessageType } from "@/types/chat";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import { SuggestedQuestions } from "./SuggestedQuestions";

interface ChatWindowProps {
  messages: ChatMessageType[];
  isLoading: boolean;
  onSuggestedQuestion?: (question: string) => void;
}

export function ChatWindow({
  messages,
  isLoading,
  onSuggestedQuestion,
}: ChatWindowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const suggestedQuestions =
    messages.length === 0
      ? [
          "What is GNS 212?",
          "What are the main topics?",
          "How does assessment work?",
          "What are the learning outcomes?",
        ]
      : [];

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[var(--bg-page)]">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-2 sm:px-3 md:px-4 py-3 sm:py-4 md:py-6 space-y-2 sm:space-y-3 md:space-y-4">
        {messages.length === 0 && !isLoading ? (
          <div className="h-full flex flex-col items-center justify-center gap-4 sm:gap-6">
            <div className="text-center px-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--navy)] mb-1 sm:mb-2">
                GNS 212 Assistant
              </h1>
              <p className="text-[var(--text-secondary)] text-sm sm:text-base md:text-lg lg:text-xl">
                Ask me anything about the course
              </p>
            </div>

            {suggestedQuestions && (
              <div className="max-w-full sm:max-w-[45rem] md:max-w-[50rem] w-full px-4">
                <p className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] mb-2 sm:mb-3 font-medium">
                  Try asking:
                </p>
                <SuggestedQuestions
                  questions={suggestedQuestions}
                  onSelectQuestion={onSuggestedQuestion || (() => {})}
                />
              </div>
            )}
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}

            {isLoading && (
              <div className="flex gap-3 animate-fadeIn">
                <div className="h-8 w-8 rounded-full bg-[var(--navy)] flex-shrink-0 flex items-center justify-center text-[var(--gold)] text-xs font-bold">
                  AI
                </div>
                <div className="bg-[var(--bg-surface)] text-[var(--text-primary)] px-4 py-3 rounded-lg rounded-bl-none border border-[var(--navy-mid)]/10">
                  <TypingIndicator />
                </div>
              </div>
            )}

            <div ref={scrollRef} />
          </>
        )}
      </div>
    </div>
  );
}
