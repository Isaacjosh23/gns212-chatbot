"use client";

import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
  onLogout?: () => void;
}

export function ChatHeader({
  isDarkMode = false,
  onToggleDarkMode,
  onLogout,
}: ChatHeaderProps) {
  return (
    <header className="bg-[var(--navy)] text-white px-6 py-4 flex items-center justify-between border-b border-[var(--navy-mid)]">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded bg-[var(--gold)] flex items-center justify-center font-bold text-[var(--navy)]">
          G
        </div>
        <h1 className="text-2xl font-bold tracking-tight">GNS 212</h1>
      </div>

      <div className="flex items-center gap-4">
        <Button
          onClick={onToggleDarkMode}
          variant="ghost"
          className="text-white hover:bg-[var(--navy-mid)] cursor-pointer"
        >
          {isDarkMode ? "☀️" : "🌙"}
        </Button>
        <Button
          onClick={onLogout}
          variant="ghost"
          className="text-white hover:bg-[var(--navy-mid)] hover:text-white text-2xl cursor-pointer"
        >
          Logout
        </Button>
      </div>
    </header>
  );
}
