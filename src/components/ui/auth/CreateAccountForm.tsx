"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Inputs } from "../inputs/_types";
import { Input } from "../inputs";
import { Button } from "../button";
import GoogleIcon from "../icons/google";
import { signUp } from "@/lib/supabase/auth";
import { useAppDispatch } from "@/store/hooks";
import { setUser, setLoading } from "@/store/slices/auth-slice";

export function CreateAccountForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!firstName.trim()) {
      setFormError("First name is required");
      return;
    }
    if (!lastName.trim()) {
      setFormError("Last name is required");
      return;
    }
    if (!email.trim()) {
      setFormError("Email is required");
      return;
    }
    if (!number.trim() && number.length < 11) {
      setFormError("A valid number is required");
    }
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

    setIsLoading(true);
    dispatch(setLoading(true));

    const { data, error } = await signUp(
      email,
      password,
      firstName,
      lastName,
      number,
    );

    // setIsLoading(false);

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
      {/* Header */}
      <div className="grid gap-[0.4rem]">
        <h1 className="text-[2.4rem] font-semibold text-[var(--text-primary)] text-center">
          Create account
        </h1>
        <p className="text-[1.4rem] text-[var(--text-secondary)] text-center">
          Join GNS 212 and start learning smarter
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid gap-[2rem]">
        {/* Error message */}
        {formError && (
          <div className="p-[1.2rem] bg-red-100 border border-red-400 rounded text-red-700 text-[1.3rem]">
            {formError}
          </div>
        )}

        {/* Name row */}
        <div className="grid grid-cols-2 gap-[1.6rem]">
          <Input
            type={Inputs.Text}
            name="firstName"
            label="First name"
            placeholder="John"
            required
            value={firstName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFirstName(e.target.value)
            }
            disabled={loading}
          />

          <Input
            type={Inputs.Text}
            name="lastName"
            label="Last name"
            placeholder="Doe"
            required
            value={lastName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLastName(e.target.value)
            }
            disabled={loading}
          />
        </div>

        <div className="grid grid-cols-2 gap-[1.6rem]">
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
            type={Inputs.Text}
            name="number"
            label="Phone Number"
            placeholder="08080808080"
            required
            value={number}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNumber(e.target.value)
            }
            disabled={loading}
          />
        </div>

        <Input
          type={Inputs.Password}
          name="password"
          label="Password"
          placeholder="Create a password"
          required
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          disabled={loading}
        />

        <Input
          type={Inputs.Password}
          name="confirmPassword"
          label="Confirm password"
          placeholder="Repeat your password"
          required
          value={confirmPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setConfirmPassword(e.target.value)
          }
          disabled={loading}
        />

        {/* Create account button */}
        <Button
          type="submit"
          variant="navy"
          disabled={loading}
          className="w-full"
        >
          {loading ? "Creating account..." : "Create account"}
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-[1.2rem]">
        <div className="flex-1 h-px bg-[var(--text-secondary)] opacity-20"></div>
        <span className="text-[1.3rem] text-[var(--text-secondary)]">or</span>
        <div className="flex-1 h-px bg-[var(--text-secondary)] opacity-20"></div>
      </div>

      {/* Google Sign-Up Button */}
      <Button
        type="button"
        variant="outline"
        disabled={loading}
        className="w-full flex items-center justify-center gap-[0.8rem]"
        onClick={() => {
          console.log("Google sign-up — coming soon");
        }}
      >
        <GoogleIcon className="size-[1.6rem]" />
        Sign up with Google
      </Button>
    </div>
  );
}
