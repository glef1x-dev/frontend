import type { ReactNode } from "react";

interface NavigationItemBase {
  endIcon?: string | ReactNode;
  icon: string | ReactNode;
  text: string;
  onClick?: () => void;
  href: string;
}

export enum ButtonType {
  ACTION = "action",
  DIVIDER = "divider",
  LINK = "link",
}

export type NavigationItem =
  | ({
      type: ButtonType.ACTION;
    } & Omit<NavigationItemBase, "href">)
  | {
      type: ButtonType.DIVIDER;
    }
  | ({
      external?: boolean;
      type: ButtonType.LINK;
    } & NavigationItemBase);

export type NavigationItems = Array<Array<NavigationItem>>;
