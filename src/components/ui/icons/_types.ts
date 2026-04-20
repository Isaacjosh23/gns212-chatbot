export interface IconProps {
  className?: string;
}

export const Icons = {
  EyeClose: "eye-close",
  EyeOpen: "eye-open",
  Google: "google",
} as const;

export type Icons = (typeof Icons)[keyof typeof Icons];
