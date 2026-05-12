"use client";

import { useRef, useEffect } from "react";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import { SuggestedQuestions } from "./SuggestedQuestions";
import { useChatContext } from "@/context/ChatContext";

export function ChatWindow() {
  const { currentMessages, isLoading, handleSuggestionClick } =
    useChatContext();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentMessages]);

  const suggestedQuestions =
    currentMessages.length === 0
      ? [
          "What is GNS 212?",
          "What are the main topics?",
          "How does assessment work?",
          "What are the learning outcomes?",
        ]
      : [];

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[var(--bg-page)]">
      <div className="flex-1 overflow-y-auto px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 space-y-2 sm:space-y-2.5 md:space-y-3">
        {currentMessages.length === 0 && !isLoading ? (
          <div className="h-full flex flex-col items-center justify-center gap-3 sm:gap-4 md:gap-6">
            <div className="text-center px-3 sm:px-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--navy)] mb-1 sm:mb-1.5">
                GNS 212 Assistant
              </h1>
              <p className="text-[var(--text-secondary)] text-xl md:text-2xl">
                Ask about the course
              </p>
            </div>

            {suggestedQuestions.length > 0 && (
              <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl px-3 sm:px-4">
                <p className="text-xl text-[var(--text-secondary)] mb-2 sm:mb-2.5 font-medium">
                  Try asking:
                </p>
                <SuggestedQuestions
                  questions={suggestedQuestions}
                  onSelectQuestion={handleSuggestionClick}
                />
              </div>
            )}
          </div>
        ) : (
          <>
            {currentMessages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}

            {isLoading && (
              <div className="flex gap-2 sm:gap-2.5 animate-fadeIn">
                <div className="h-10 w-10 rounded-full bg-[var(--navy)] flex-shrink-0 flex items-center justify-center text-[var(--gold)] text-[1.2rem] font-bold">
                  G
                </div>
                <div className="bg-[var(--bg-surface)] text-[var(--text-primary)] px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-lg rounded-bl-none border border-[var(--navy-mid)]/10">
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
