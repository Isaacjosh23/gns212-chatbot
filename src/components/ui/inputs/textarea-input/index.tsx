"use client";

import type { TextareaInputProps } from "./_types";
import {
  InputConStyles,
  InputLabelStyles,
  InputRequiredStyles,
} from "../styles";
import { cn } from "@/lib/utils";

export function TextareaInput({
  label,
  name,
  value,
  readonly,
  required,
  placeholder,
  rows = 4,
  onChange,
  rightElement,
  showBorder = true,
  className,
  onKeyPress,
}: TextareaInputProps) {
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
          InputConStyles,
          className,
          "h-auto py-[0.8rem] transition-all",
          !showBorder && "border-none shadow-none bg-transparent",
        )}
      >
        <textarea
          name={name}
          rows={rows}
          className="w-full text-[1.4rem] bg-transparent outline-none text-[--text-primary] placeholder:text-[--text-muted] resize-none"
          value={value}
          placeholder={placeholder}
          readOnly={readonly}
          onChange={onChange}
          onKeyPress={onKeyPress}
          required={required}
        />

        {rightElement && (
          <div className="absolute right-[1.6rem] top-[6.4rem] flex items-center">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
}
