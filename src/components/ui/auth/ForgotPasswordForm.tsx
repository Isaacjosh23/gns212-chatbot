"use client";

import { useState } from "react";
import { Inputs } from "../inputs/_types";
import { Input } from "../inputs";
import { Button } from "../button";
import { resetPassword } from "@/lib/supabase/auth";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!email.trim()) {
      setFormError("Email is required");
      return;
    }

    setIsLoading(true);

    const { error } = await resetPassword(email);

    setIsLoading(false);

    if (error) {
      setFormError(error.message);
      return;
    }

    setSent(true);
  };

  if (sent) {
    return (
      <div className="grid gap-[1.6rem] text-center">
        <h1 className="text-[2.4rem] font-semibold text-[var(--text-primary)]">
          Check your email
        </h1>
        <p className="text-[1.4rem] text-[var(--text-secondary)]">
          We sent a password reset link to{" "}
          <span className="font-semibold text-[var(--text-primary)]">
            {email}
          </span>
          . Click the link to reset your password.
        </p>
        <p className="text-[1.2rem] text-[var(--text-muted)]">
          Didn&apos;t receive it?{" "}
          <button
            onClick={() => setSent(false)}
            className="font-semibold text-[var(--navy)] hover:underline cursor-pointer"
          >
            Try again
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-[3.2rem]">
      <div className="grid gap-[0.8rem]">
        <h1 className="text-[2.4rem] font-semibold text-[var(--text-primary)] text-center">
          Forgot password?
        </h1>
        <p className="text-[1.4rem] text-[var(--text-secondary)] text-center">
          Enter your email address and we&apos;ll send you a link to reset your
          password
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-[2rem]">
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

        <Button
          type="submit"
          variant="navy"
          disabled={loading}
          className="w-full"
        >
          {loading ? "Sending reset link..." : "Send reset link"}
        </Button>
      </form>
    </div>
  );
}
