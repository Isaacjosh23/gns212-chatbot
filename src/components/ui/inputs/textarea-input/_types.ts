export interface TextareaInputProps {
  label?: string;
  name?: string;
  value?: string;
  readonly?: boolean;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  rightElement?: React.ReactNode;
  showBorder?: boolean;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
