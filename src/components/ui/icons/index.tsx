import { type IconProps, Icons } from "./_types";
import EyeOpenIcon from "./eye-open";
import EyeCloseIcon from "./eye-close";
import GoogleIcon from "./google";
import MenuIcon from "./menu";

interface Props extends IconProps {
  type: Icons;
}

export function Icon({ type, className }: Props) {
  const props = { className };

  switch (type) {
    case Icons.EyeClose:
      return <EyeCloseIcon {...props} />;

    case Icons.EyeOpen:
      return <EyeOpenIcon {...props} />;

    case Icons.Google:
      return <GoogleIcon {...props} />;

    case Icons.Menu:
      return <MenuIcon {...props} />;

    default:
      return null;
  }
}
