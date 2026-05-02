"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Inputs } from "../inputs/_types";
import { Input } from "../inputs";
import { Button } from "../button";
import { updatePassword } from "@/lib/supabase/auth";
import { createClient } from "@/lib/supabase/client";

export function ResetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setIsLoading] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSessionReady(true);
        setCheckingSession(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "PASSWORD_RECOVERY" || (event === "SIGNED_IN" && session)) {
        setSessionReady(true);
        setCheckingSession(false);
      }
    });

    const timeout = setTimeout(() => {
      setCheckingSession(false);
    }, 3000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!password) {
      setFormError("Password is required");
      return;
    }
    if (password.length < 6) {
      setFormError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }

    if (!sessionReady) {
      setFormError(
        "Reset link is invalid or has expired. Please request a new one.",
      );
      return;
    }

    setIsLoading(true);

    const { error } = await updatePassword(password);

    setIsLoading(false);

    if (error) {
      setFormError(error.message);
      return;
    }

    router.push("/login");
  };

  return (
    <div className="grid gap-[3.2rem]">
      <div className="grid gap-[0.8rem]">
        <h1 className="text-[2.4rem] font-semibold text-[var(--text-primary)] text-center">
          Reset password
        </h1>
        <p className="text-[1.4rem] text-[var(--text-secondary)] text-center">
          Enter your new password below
        </p>
      </div>

      {checkingSession && (
        <p className="text-[1.3rem] text-center text-[var(--text-muted)]">
          Verifying reset link...
        </p>
      )}

      <form onSubmit={handleSubmit} className="grid gap-8">
        {formError && (
          <div className="p-[1.2rem] bg-red-100 border border-red-400 rounded text-red-700 text-[1.3rem]">
            {formError}
          </div>
        )}

        <Input
          type={Inputs.Password}
          name="password"
          label="New password"
          placeholder="Enter new password"
          required
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          disabled={loading || checkingSession}
        />

        <Input
          type={Inputs.Password}
          name="confirmPassword"
          label="Confirm new password"
          placeholder="Repeat new password"
          required
          value={confirmPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setConfirmPassword(e.target.value)
          }
          disabled={loading || checkingSession}
        />

        <Button
          type="submit"
          variant="navy"
          disabled={loading || checkingSession}
          className="w-full"
        >
          {loading ? "Updating password..." : "Update password"}
        </Button>
      </form>
    </div>
  );
}
