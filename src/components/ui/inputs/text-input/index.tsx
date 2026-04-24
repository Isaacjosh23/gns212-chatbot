"use client";

import { forwardRef } from "react";
import type { TextInputProps } from "./_types";
import {
  InputConStyles,
  InputLabelStyles,
  InputRequiredStyles,
} from "../styles";
import { cn } from "@/lib/utils";

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      name,
      value,
      readonly,
      required,
      placeholder,
      onChange,
      disabled,
      rightElement,
      className,
      icon,
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

        <div
          className={cn(
            "relative flex items-center",
            InputConStyles,
            className,
          )}
        >
          {icon && <div className="flex items-center mr-[0.8rem]">{icon}</div>}
          <input
            ref={ref}
            type="text"
            name={name}
            className="w-full text-[1.4rem] bg-transparent outline-none text-[--text-primary] placeholder:text-[--text-muted] pr-32"
            value={value}
            placeholder={placeholder}
            readOnly={readonly}
            onChange={onChange}
            disabled={disabled}
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

TextInput.displayName = "TextInput";
