import type { ButtonHTMLAttributes } from "react";
import { Button } from "~/components";
import { ButtonType } from "~/types";

interface XButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  external?: boolean;
  href: string;
  icon?: string;
  label: string;
}

export function XButton({
  external,
  href,
  icon,
  label,
}: XButtonProps): JSX.Element {
  return (
    <Button.Standard
      type={ButtonType.LINK}
      external={external}
      href={href}
      icon={icon}
    >
      {label}
    </Button.Standard>
  );
}
