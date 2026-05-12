"use client";

import { Button } from "@/components/ui/button";
import { useLogout } from "@/store/hooks/useLogout";
import { useChatContext } from "@/context/ChatContext";
import { MobileMenu } from "./MobileMenu";

export function ChatHeader() {
  const { isDarkMode, toggleDarkMode } = useChatContext();
  const { logout } = useLogout();

  return (
    <header className="bg-[var(--navy)] text-white px-3 md:px-6 py-2 md:py-4 flex items-center justify-between">
      <div className="flex items-center gap-2 md:gap-3">
        <div className="md:hidden">
          <MobileMenu />
        </div>

        <div className="w-9 h-9 md:w-10 md:h-10 rounded bg-[var(--gold)] flex items-center justify-center font-bold text-[var(--navy)] text-xl md:text-2xl">
          G
        </div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight">
          GNS 212
        </h1>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <Button
          onClick={toggleDarkMode}
          variant="ghost"
          className="text-white hover:bg-[var(--navy-mid)] cursor-pointer text-xl md:text-2xl p-2"
        >
          {isDarkMode ? "☀️" : "🌙"}
        </Button>
        <Button
          onClick={logout}
          variant="ghost"
          className="hidden md:block text-white hover:bg-[var(--navy-mid)] cursor-pointer"
        >
          Logout
        </Button>
      </div>
    </header>
  );
}
