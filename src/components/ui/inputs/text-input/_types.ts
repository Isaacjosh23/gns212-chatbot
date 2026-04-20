import type React from "react";

export interface TextInputProps {
  label?: string;
  name?: string;
  value?: string;
  readonly?: boolean;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  rightElement?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
