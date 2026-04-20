"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Inputs } from "../inputs/_types";
import { Input } from "../inputs";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // backend logic comes later
  };

  return (
    <div className="grid gap-[3.2rem]">
      {/* Header */}
      <div className="grid gap-[0.4rem]">
        <h1 className="text-[2.4rem] font-semibold text-[var(--text-primary)]">
          Welcome back
        </h1>
        <p className="text-[1.4rem] text-[var(--text-secondary)]">
          Sign in to your GNS 212 account
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid gap-[2rem]">
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

        {/* Forgot password */}
        <div className="flex justify-end -mt-[0.8rem]">
          <Link
            href="/forgot-password"
            className="text-[1.2rem] text-[var(--gold)] hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      </form>
    </div>
  );
}
