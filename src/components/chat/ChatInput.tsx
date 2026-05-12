"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import SendIcon from "@/components/ui/icons/send";
import { Input } from "../ui/inputs";
import { Inputs } from "../ui/inputs/_types";
import { useChatContext } from "@/context/ChatContext";

export function ChatInput() {
  const { handleSendMessage, isLoading } = useChatContext();
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      handleSendMessage(input);
      setInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-end gap-1.5 sm:gap-2 p-2 sm:p-3 md:p-4 bg-[var(--bg-surface)] border-t border-[var(--navy-mid)]/10 rounded-b-lg">
      <Input
        type={Inputs.Textarea}
        value={input}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setInput(e.target.value)
        }
        onKeyPress={handleKeyPress}
        placeholder="Ask about GNS 212"
        disabled={isLoading}
        rows={2}
        className="flex-1 bg-white border border-[var(--navy-mid)]/20 rounded-lg px-2 sm:px-3 py-2 text-xs sm:text-sm md:text-base text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent resize-none disabled:opacity-50"
      />

      <Button
        onClick={handleSend}
        disabled={!input.trim() || isLoading}
        className="bg-[var(--gold)] hover:bg-[var(--gold)]/90 text-[var(--navy)] flex-shrink-0 p-1.5 sm:p-2 h-auto min-h-10 sm:min-h-11"
      >
        <SendIcon className="w-6 md:w-8 h-6 sm:h-7 md:h-8" />
      </Button>
    </div>
  );
}
