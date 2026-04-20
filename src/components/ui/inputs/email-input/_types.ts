export interface EmailInputProps {
  label?: string;
  name?: string;
  value?: string;
  readonly?: boolean;
  required?: boolean;
  placeholder?: string;
  rightElement?: React.ReactNode;
  Icon?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
