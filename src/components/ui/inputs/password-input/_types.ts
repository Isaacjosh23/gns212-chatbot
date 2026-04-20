export interface PasswordInputProps {
  label?: string;
  name?: string;
  value?: string;
  readonly?: boolean;
  required?: boolean;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
