"use client";

import { useState } from "react";
import { Inputs } from "../inputs/_types";
import { Input } from "../inputs";

export function CreateAccountForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // backend logic comes later
  };

  return (
    <div className="grid gap-[3.2rem]">
      {/* Header */}
      <div className="grid gap-[0.4rem]">
        <h1 className="text-[2.4rem] font-semibold text-[var(--text-primary)]">
          Create account
        </h1>
        <p className="text-[1.4rem] text-[var(--text-secondary)]">
          Join GNS 212 and start learning smarter
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid gap-[2rem]">
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
          />
        </div>

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
          placeholder="Create a password"
          required
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
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
        />
      </form>
    </div>
  );
}
