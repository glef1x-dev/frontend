import clsx from "clsx";
import Link from "next/link";
import { Icon } from "@iconify/react";

import type { MouseEvent } from "react";
import { ButtonType } from "~/types";

import type { WithChildren, WithClassName } from "~/types";

interface DefaultProps extends WithClassName, WithChildren {
  icon?: string;
}

type StandardProps =
  | ({
      type: ButtonType.ACTION;
      onClick: (e: MouseEvent) => void;
    } & DefaultProps)
  | ({
      type: ButtonType.LINK;
      href: string;
      external?: boolean;
    } & DefaultProps);

const ButtonStyles =
  "flex justify-center items-center h-12 px-8 py-4 bg-gray-50 hover:(bg-gray-100 bg-opacity-50 text-primary-400) dark:(bg-gray-900 hover:bg-gray-800) text-base font-bold text-primary-300 rounded-lg default-transition default-focus";

export function Standard({
  children,
  className,
  icon,
  ...rest
}: StandardProps): JSX.Element {
  switch (rest.type) {
    case ButtonType.LINK:
      if (rest.external ?? true) {
        return (
          <a {...rest} className={clsx(ButtonStyles, className)}>
            {icon && <Icon className="mr-2" icon={icon} />}
            {children}
          </a>
        );
      }

      return (
        <Link
          {...rest}
          className={clsx(ButtonStyles, className)}
          href={rest.href}
          passHref
        >
          {icon && <Icon className="mr-2" icon={icon} />}
          {children}
        </Link>
      );

    case ButtonType.ACTION:
      return (
        <button
          {...rest}
          className={clsx(ButtonStyles, className)}
          onClick={(e): void => rest.onClick(e)}
          type="button"
        >
          {icon && <Icon className="mr-2" icon={icon} />}
          {children}
        </button>
      );
  }
}
