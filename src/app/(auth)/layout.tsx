import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full min-h-screen bg-[var(--bg-page)] flex flex-col items-center justify-center p-6">
      <div className="grid gap-10 w-full max-w-md mx-auto">
        {/* Logo */}
        <div className="flex items-center justify-center">
          <Image
            src="/unilorin-logo.png"
            alt="University of Ilorin Logo"
            width={80}
            height={80}
            priority
          />
        </div>

        {/* Page content */}
        {children}
      </div>
    </main>
  );
}
