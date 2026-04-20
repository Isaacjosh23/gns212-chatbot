import type { EmailInputProps } from "./email-input/_types";
import type { PasswordInputProps } from "./password-input/_types";
// import type { SearchInputProps } from "./search-input";
import type { TextInputProps } from "./text-input/_types";
import type { TextareaInputProps } from "./textarea-input/_types";

export const Inputs = {
  Email: "Email",
  Password: "Password",
  Text: "text",
  Textarea: "textarea",
  Search: "search",
} as const;

export type Inputs = (typeof Inputs)[keyof typeof Inputs];

export type InputBaseProps = {
  name: string;
  label?: string;
  required?: boolean;
  description?: string;
  placeholder?: string;
  className?: string;
  value?: string;
  readonly?: boolean;
  disabled?: boolean;
  rightElement?: React.ReactNode;
};

export type InputProps<T extends Inputs> = {
  type: T;
} & (T extends typeof Inputs.Email
  ? EmailInputProps
  : T extends typeof Inputs.Password
    ? PasswordInputProps
    : T extends typeof Inputs.Text
      ? TextInputProps
      : T extends typeof Inputs.Textarea
        ? TextareaInputProps
        : InputBaseProps);

export interface RequiredFieldProps {
  label: string;
}
