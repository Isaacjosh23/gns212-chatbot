import { ChatProvider } from "@/context/ChatContext";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen w-screen flex flex-col bg-[var(--bg)]">
      <ChatProvider>{children}</ChatProvider>
    </div>
  );
}
