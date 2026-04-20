"use client";

import type { PasswordInputProps } from "./_types";
import {
  InputConStyles,
  InputLabelStyles,
  InputRequiredStyles,
} from "../styles";
import { cn } from "@/lib/utils";
import { useState } from "react";
import EyeOpenIcon from "../../icons/eye-open";
import EyeCloseIcon from "../../icons/eye-close";

export function PasswordInput({
  label,
  name,
  value,
  readonly,
  required,
  placeholder,
  onChange,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="grid gap-[0.8rem] content-start z-10">
      {label && (
        <label className={cn(InputLabelStyles)}>
          {label}{" "}
          {required && <span className={cn(InputRequiredStyles)}>*</span>}
        </label>
      )}

      <div className={cn(InputConStyles, "relative flex items-center")}>
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          className="w-full text-[1.4rem] bg-transparent outline-none text-[--text-primary)] placeholder:text-[--text-muted)] pr-16"
          value={value}
          placeholder={placeholder}
          readOnly={readonly}
          onChange={onChange}
          required={required}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-[1.2rem] focus:outline-none cursor-pointer"
        >
          {showPassword ? (
            <EyeOpenIcon className="size-[1.6rem] text-[--text-muted]" />
          ) : (
            <EyeCloseIcon className="size-[1.6rem] text-[--text-muted]" />
          )}
        </button>
      </div>
    </div>
  );
}
