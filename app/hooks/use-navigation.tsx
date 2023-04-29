import { useTheme } from "next-themes";

import { Status } from "~/components";

import type { NavigationItem, NavigationItems } from "~/types";
import { ButtonType, Theme } from "~/types";
import {
  selectSettings,
  togglePlayClickSound,
  toggleShowAnimations,
} from "~/lib/state/settings/slice";
import { useAppDispatch, useAppSelector } from "~/hooks/use-redux";
import { toggleDonateModal } from "~/lib/state/app-state/slice";

const staticMenuItems: Array<Array<NavigationItem>> = [
  [
    {
      type: ButtonType.LINK,
      icon: "feather:home",
      text: "Home",
      href: "/",
    },
    {
      type: ButtonType.LINK,
      icon: "feather:edit-3",
      text: "Blog",
      href: "/blog",
    },
    {
      type: ButtonType.LINK,
      icon: "feather:copy",
      text: "Projects",
      href: "/projects",
    },
    {
      type: ButtonType.LINK,
      icon: "feather:clock",
      text: "Timeline",
      href: "/timeline",
    },
    {
      type: ButtonType.LINK,
      icon: "feather:link",
      text: "Referrals",
      href: "/referrals",
    },
  ],
  [
    {
      type: ButtonType.LINK,
      icon: "feather:twitter",
      text: "Twitter",
      href: "https://twitter.com/Gleb11363811",
      external: true,
    },
    {
      type: ButtonType.LINK,
      icon: "feather:github",
      text: "GitHub",
      href: "https://github.com/GLEF1X",
      external: true,
    },
  ],
];

export function useNavigation(): {
  menu: NavigationItems;
  settings: NavigationItems;
} {
  const { theme, setTheme } = useTheme();

  const settings = useAppSelector(selectSettings);
  const dispatch = useAppDispatch();
  const { animations: background, playClickSound } = settings;

  const menuItems: NavigationItems = [
    ...staticMenuItems,
    ...[
      [
        {
          type: ButtonType.LINK,
          icon: <Status.DynamicIndicator />,
          text: "Status",
          href: "/status",
        } as NavigationItem,
        {
          type: ButtonType.ACTION,
          icon: "mdi:charity-outline",
          text: "Donate",
          onClick: () => {
            dispatch(toggleDonateModal());
          },
        } as NavigationItem,
      ],
    ],
  ];

  const settingsItems: NavigationItems = [
    [
      {
        type: ButtonType.ACTION,
        icon: "feather:image",
        endIcon: background ? "feather:check-circle" : "feather:circle",
        text: `Animations ${background ? "On" : "Off"}`,
        onClick: () => dispatch(toggleShowAnimations()),
      },
      {
        type: ButtonType.ACTION,
        icon: playClickSound ? "feather:volume-2" : "feather:volume-x",
        endIcon: playClickSound ? "feather:check-circle" : "feather:circle",
        text: `Sounds ${playClickSound ? "On" : "Off"}`,
        onClick: () => dispatch(togglePlayClickSound()),
      },
      {
        type: ButtonType.DIVIDER,
      },
      {
        type: ButtonType.ACTION,
        icon: "feather:monitor",
        endIcon: theme === Theme.SYSTEM ? "feather:check-circle" : undefined,
        text: "System Theme",
        onClick: () => setTheme(Theme.SYSTEM),
      },
      {
        type: ButtonType.ACTION,
        icon: "feather:sun",
        endIcon: theme === Theme.LIGHT ? "feather:check-circle" : undefined,
        text: "Light Theme",
        onClick: () => setTheme(Theme.LIGHT),
      },
      {
        type: ButtonType.ACTION,
        icon: "feather:moon",
        endIcon: theme === Theme.DARK ? "feather:check-circle" : undefined,
        text: "Dark Theme",
        onClick: () => setTheme(Theme.DARK),
      },
    ],
  ];

  return {
    menu: menuItems,
    settings: settingsItems,
  };
}
