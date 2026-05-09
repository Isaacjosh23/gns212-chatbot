"use client";

import { Button } from "@/components/ui/button";
import { useLogout } from "@/store/hooks/useLogout";

interface ChatHeaderProps {
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
  onLogout?: () => void;
  onHamburgerClick?: () => void;
}

export function ChatHeader({
  isDarkMode = false,
  onToggleDarkMode,
  onLogout,
  onHamburgerClick,
}: ChatHeaderProps) {
  const { logout } = useLogout();

  return (
    <header className="bg-[var(--navy)] text-white px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex items-center justify-between border-b border-[var(--navy-mid)]">
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Hamburger Button - Mobile Only */}
        <button
          onClick={onHamburgerClick}
          className="md:hidden flex flex-col gap-1.5 p-2 hover:bg-[var(--navy-mid)] rounded cursor-pointer"
          aria-label="Toggle menu"
        >
          <div className="w-6 h-0.5 bg-white rounded"></div>
          <div className="w-6 h-0.5 bg-white rounded"></div>
          <div className="w-6 h-0.5 bg-white rounded"></div>
        </button>

        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded bg-[var(--gold)] flex items-center justify-center font-bold text-[var(--navy)] text-sm sm:text-base">
          G
        </div>
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight">
          GNS 212
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <Button
          onClick={onToggleDarkMode}
          variant="ghost"
          className="text-white hover:bg-[var(--navy-mid)] cursor-pointer text-lg sm:text-xl"
        >
          {isDarkMode ? "☀️" : "🌙"}
        </Button>
        <Button
          onClick={logout}
          variant="ghost"
          className="hidden md:block text-white hover:bg-[var(--navy-mid)] hover:text-white text-sm sm:text-base md:text-lg cursor-pointer"
        >
          Logout
        </Button>
      </div>
    </header>
  );
}
