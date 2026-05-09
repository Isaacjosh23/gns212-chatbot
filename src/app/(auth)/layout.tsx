"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLogin = pathname === "/login";
  const isForgotPassword = pathname === "/forgot-password";

  return (
    <main className="w-full min-h-screen bg-[var(--bg-page)] flex flex-col items-center justify-center p-[2.4rem]">
      <div className="grid gap-[4rem] w-full max-w-[44.8rem] mx-auto">
        {/* Logo */}
        <div className="flex items-center justify-center gap-[3.2rem]">
          <Image
            src="/unilorin-logo1.png"
            alt="University of Ilorin Logo"
            width={80}
            height={80}
            style={{ width: "auto", height: "auto" }}
            priority
          />
          <Image
            src="/unilorin50.png"
            alt="Unilorin at 50 logo"
            width={80}
            height={80}
            style={{ width: "auto", height: "auto" }}
            priority
          />
        </div>

        {children}

        {/* Footer link */}
        <p className="text-[1.2rem] text-center text-[var(--text-muted)]">
          {isForgotPassword ? (
            <>
              Remember your password?{" "}
              <Link
                href="/login"
                className="font-semibold text-[var(--navy)] hover:underline"
              >
                Sign in
              </Link>
            </>
          ) : isLogin ? (
            <>
              Don&apos;t have an account?{" "}
              <Link
                href="/create-account"
                className="font-semibold text-[var(--navy)] hover:underline"
              >
                Create account
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-[var(--navy)] hover:underline"
              >
                Sign in
              </Link>
            </>
          )}
        </p>
      </div>
    </main>
  );
}
