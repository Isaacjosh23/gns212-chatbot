"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Inputs } from "../inputs/_types";
import { Input } from "../inputs";
import { Button } from "../button";
import GoogleIcon from "../icons/google";
import { useAppDispatch } from "@/store/hooks";
import { signIn } from "@/lib/supabase/auth";
import { setLoading, setUser } from "@/store/slices/auth-slice";

export function LoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!email.trim()) {
      setFormError("Email is required");
      return;
    }

    if (!password) {
      setFormError("Password is required");
      return;
    }

    setIsLoading(true);

    const { data, error } = await signIn(email, password);

    if (error) {
      dispatch(setLoading(false));
      setIsLoading(false);
      setFormError(error.message);
      return;
    }

    if (data.user && data.session) {
      dispatch(setUser({ user: data.user, session: data.session }));
      router.push("/chat");
    }
  };

  return (
    <div className="grid gap-[3.2rem]">
      <div className="grid gap-[0.4rem]">
        <h1 className="text-[2.4rem] font-semibold text-[var(--text-primary)] text-center">
          Welcome back
        </h1>
        <p className="text-[1.4rem] text-[var(--text-secondary)] text-center">
          Sign in to your GNS 212 account
        </p>
      </div>

      <form id="auth-form" onSubmit={handleSubmit} className="grid gap-[2rem]">
        {formError && (
          <div className="p-[1.2rem] bg-red-100 border border-red-400 rounded text-red-700 text-[1.3rem]">
            {formError}
          </div>
        )}

        <Input
          type={Inputs.Email}
          name="email"
          label="Email address"
          placeholder="you@unilorin.edu.ng"
          required
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          disabled={loading}
        />

        <Input
          type={Inputs.Password}
          name="password"
          label="Password"
          placeholder="Enter your password"
          required
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          disabled={loading}
        />

        <div className="flex justify-end -mt-[0.8rem]">
          <Link
            href="/forgot-password"
            className="text-[1.2rem] text-[var(--gold)] hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="navy"
          className="w-full cursor-pointer"
          disabled={loading}
        >
          {loading ? "Signing in" : "Sign in"}
        </Button>
      </form>

      <div className="flex items-center gap-[1.2rem]">
        <div className="flex-1 h-px bg-[var(--text-secondary)] opacity-20"></div>
        <span className="text-[1.3rem] text-[var(--text-secondary)]">or</span>
        <div className="flex-1 h-px bg-[var(--text-secondary)] opacity-20"></div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full flex items-center justify-center gap-[0.8rem]"
        onClick={() => {
          // TODO: Wire up Google OAuth
          console.log("Google sign-in");
        }}
        disabled={loading}
      >
        <GoogleIcon className="size-[1.6rem]" />
        Sign in with Google
      </Button>
    </div>
  );
}
