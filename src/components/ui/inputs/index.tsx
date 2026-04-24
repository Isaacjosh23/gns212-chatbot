"use client";

import { forwardRef } from "react";
import type { InputProps } from "./_types";
import { Inputs } from "./_types";
import { EmailInput } from "./email-input/index";
import type { EmailInputProps } from "./email-input/_types";
import { PasswordInput } from "./password-input";
import type { PasswordInputProps } from "./password-input/_types";
import { TextInput } from "./text-input";
import type { TextInputProps } from "./text-input/_types";
// import { SelectInput } from "./select-input";
// import type { SelectInputProps } from "./select-input/_types";
// import { SearchInput, type SearchInputProps } from "./search-input";
import { TextareaInput } from "./textarea-input";
import type { TextareaInputProps } from "./textarea-input/_types";

export const Input = forwardRef<HTMLInputElement, InputProps<Inputs>>(
  (props, ref) => {
    const { type } = props;

    switch (type) {
      case Inputs.Email:
        return <EmailInput {...(props as EmailInputProps)} ref={ref} />;

      case Inputs.Password:
        return <PasswordInput {...(props as PasswordInputProps)} />;

      case Inputs.Text:
        return <TextInput {...(props as TextInputProps)} ref={ref} />;

      // case Inputs.Select:
      //   return <SelectInput {...(props as SelectInputProps)} />;

      // case Inputs.Search:
      //   return <SearchInput {...(props as SearchInputProps)} />;

      case Inputs.Textarea:
        return <TextareaInput {...(props as TextareaInputProps)} />;

      default:
        return (
          <p>Error: Input type &quot;{type}&quot; is not yet implemented.</p>
        );
    }
  },
);

Input.displayName = "Input";
