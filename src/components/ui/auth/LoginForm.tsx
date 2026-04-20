"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Inputs } from "../inputs/_types";
import { Input } from "../inputs";
import { Button } from "../button";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // backend logic comes later
  };

  return (
    <div className="grid gap-8">
      <div className="grid gap-1">
        <h1 className="text-2xl font-semibold text-[--text-primary]">
          Welcome back
        </h1>
        <p className="text-sm text-[--text-secondary]">
          Sign in to your GNS 212 account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-5">
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
        />

        <div className="flex justify-end -mt-2">
          <Link
            href="/forgot-password"
            className="text-sm text-[--gold] hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button variant="navy" size="lg" type="submit" className="w-full">
          Sign in
        </Button>
      </form>

      <p className="text-sm text-center text-[--text-secondary]">
        Don&apos;t have an account?{" "}
        <Link
          href="/create-account"
          className="font-semibold text-[--navy] hover:underline"
        >
          Create account
        </Link>
      </p>
    </div>
  );
}
