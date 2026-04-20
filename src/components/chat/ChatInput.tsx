"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import SendIcon from "@/components/ui/icons/send";
import { Input } from "../ui/inputs";
import { Inputs } from "../ui/inputs/_types";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

export function ChatInput({
  onSendMessage,
  isLoading = false,
}: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-end gap-2 p-4 bg-[var(--bg-surface)] border-t border-[var(--navy-mid)]/10 rounded-b-lg">
      {/* <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Ask something about GNS 212..."
        disabled={isLoading}
        rows={1}
        className="flex-1 bg-white border border-[var(--navy-mid)]/20 rounded-lg px-3 py-2 text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent resize-none disabled:opacity-50"
      /> */}

      <Input
        type={Inputs.Textarea}
        value={input}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setInput(e.target.value)
        }
        onKeyPress={handleKeyPress}
        placeholder="Ask something about GNS 212"
        disabled={isLoading}
        rows={6}
        className="flex-1 bg-white border border-[var(--navy-mid)]/20 rounded-lg px-3 py-2 text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent resize-none disabled:opacity-50"
      />

      <Button
        onClick={handleSend}
        disabled={!input.trim() || isLoading}
        className="bg-[var(--gold)] hover:bg-[var(--gold)]/90 text-[var(--navy)] flex-shrink-0 p-2 h-auto"
      >
        <SendIcon className="w-9 h-9" />
      </Button>
    </div>
  );
}
