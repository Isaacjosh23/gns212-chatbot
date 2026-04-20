"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import GoogleIcon from "@/components/ui/icons/google";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLogin = pathname === "/login";

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

        {/* Page content */}
        {children}

        <div className="grid gap-[1.6rem]">
          {/* Submit button */}
          <Button
            variant="navy"
            size="lg"
            type="submit"
            className="w-full cursor-pointer text-[1.4rem]"
          >
            {isLogin ? "Sign in" : "Create account"}
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-[1.2rem]">
            <div className="flex-1 h-px bg-[var(--border-color)]" />
            <span className="text-[1.2rem] text-[var(--text-muted)]">or</span>
            <div className="flex-1 h-px bg-[var(--border-color)]" />
          </div>

          {/* Google button */}
          <Button
            variant="outline"
            size="lg"
            className="flex items-center gap-[0.8rem] w-full cursor-pointer text-[1.4rem]"
          >
            <GoogleIcon className="size-[1.6rem]" />
            Continue with Google
          </Button>

          {/* Footer */}
          <p className="text-[1.2rem] text-center text-[var(--text-muted)]">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <Link
              href={isLogin ? "/create-account" : "/login"}
              className="font-semibold text-[var(--navy)] hover:underline"
            >
              {isLogin ? "Create account" : "Sign in"}
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
