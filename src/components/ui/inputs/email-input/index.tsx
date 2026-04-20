"use client";

import { forwardRef } from "react";
import type { EmailInputProps } from "./_types";
import {
  InputConStyles,
  InputLabelStyles,
  InputRequiredStyles,
} from "../styles";
import { cn } from "@/lib/utils";

export const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(
  (
    {
      label,
      name,
      value,
      readonly,
      required,
      placeholder,
      onChange,
      rightElement,
      Icon,
    },
    ref,
  ) => {
    return (
      <div className="grid gap-2 content-start z-10 w-full">
        {label && (
          <label className={cn(InputLabelStyles)}>
            {label}{" "}
            {required && <span className={cn(InputRequiredStyles)}>*</span>}
          </label>
        )}

        <div className={cn("relative flex items-center", InputConStyles)}>
          {Icon && <div className="flex items-center mr-2">{Icon}</div>}

          <input
            ref={ref}
            type="email"
            name={name}
            className="w-full text-sm bg-transparent outline-none text-[--text-primary] placeholder:text-[--text-muted] pr-16"
            value={value}
            placeholder={placeholder}
            readOnly={readonly}
            onChange={onChange}
            required={required}
          />

          {rightElement && (
            <div className="absolute right-4 flex items-center">
              {rightElement}
            </div>
          )}
        </div>
      </div>
    );
  },
);

EmailInput.displayName = "EmailInput";
