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
      <div className="grid gap-[0.8rem] content-start z-10 w-full">
        {label && (
          <label className={cn(InputLabelStyles)}>
            {label}{" "}
            {required && <span className={cn(InputRequiredStyles)}>*</span>}
          </label>
        )}

        <div className={cn("relative flex items-center", InputConStyles)}>
          {Icon && <div className="flex items-center mr-[0.8rem]">{Icon}</div>}

          <input
            ref={ref}
            type="email"
            name={name}
            className="w-full text-[1.4rem] bg-transparent outline-none text-[--text-primary)] placeholder:text-[--text-muted] pr-[6.4rem]"
            value={value}
            placeholder={placeholder}
            readOnly={readonly}
            onChange={onChange}
            required={required}
          />

          {rightElement && (
            <div className="absolute right-[1.6rem] flex items-center">
              {rightElement}
            </div>
          )}
        </div>
      </div>
    );
  },
);

EmailInput.displayName = "EmailInput";
