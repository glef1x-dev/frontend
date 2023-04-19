import { useTheme } from "next-themes";

import { Status } from "~/components";

import { NavigationItemType, Theme } from "~/types";

import type { NavigationItem, NavigationItems } from "~/types";
import {
  togglePlayClickSound,
  toggleShowAnimations,
} from "~/lib/state/settings/slice";
import { useSettings } from "./use-settings";
import { useStatus } from "./use-lanyard";

const staticMenuItems: Array<Array<NavigationItem>> = [
  [
    {
      type: NavigationItemType.LINK,
      icon: "feather:home",
      text: "Home",
      href: "/",
    },
    {
      type: NavigationItemType.LINK,
      icon: "feather:edit-3",
      text: "Blog",
      href: "/blog",
    },
    {
      type: NavigationItemType.LINK,
      icon: "feather:copy",
      text: "Projects",
      href: "/projects",
    },
    {
      type: NavigationItemType.LINK,
      icon: "feather:clock",
      text: "Timeline",
      href: "/timeline",
    },
    {
      type: NavigationItemType.LINK,
      icon: "feather:link",
      text: "Referrals",
      href: "/referrals",
    },
  ],
  [
    {
      type: NavigationItemType.LINK,
      icon: "feather:twitter",
      text: "Twitter",
      href: "https://twitter.com/Gleb11363811",
      external: true,
    },
    {
      type: NavigationItemType.LINK,
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
  const [settings, dispatch] = useSettings();
  const { animations: background, playClickSound } = settings;
  const { color, loading, status } = useStatus();
  const { theme, setTheme } = useTheme();

  const menuItems: NavigationItems = [
    ...staticMenuItems,
    ...(!loading && status?.discord_status !== "offline"
      ? [
          [
            {
              type: NavigationItemType.LINK,
              icon: <Status.Indicator color={color} pulse />,
              text: "Status",
              href: "/status",
            } as NavigationItem,
          ],
        ]
      : []),
  ];

  const settingsItems: NavigationItems = [
    [
      {
        type: NavigationItemType.ACTION,
        icon: "feather:image",
        endIcon: background ? "feather:check-circle" : "feather:circle",
        text: `Animations ${background ? "On" : "Off"}`,
        onClick: () => dispatch(toggleShowAnimations()),
      },
      {
        type: NavigationItemType.ACTION,
        icon: playClickSound ? "feather:volume-2" : "feather:volume-x",
        endIcon: playClickSound ? "feather:check-circle" : "feather:circle",
        text: `Sounds ${playClickSound ? "On" : "Off"}`,
        onClick: () => dispatch(togglePlayClickSound()),
      },
      {
        type: NavigationItemType.DIVIDER,
      },
      {
        type: NavigationItemType.ACTION,
        icon: "feather:monitor",
        endIcon: theme === Theme.SYSTEM ? "feather:check-circle" : undefined,
        text: "System Theme",
        onClick: () => setTheme(Theme.SYSTEM),
      },
      {
        type: NavigationItemType.ACTION,
        icon: "feather:sun",
        endIcon: theme === Theme.LIGHT ? "feather:check-circle" : undefined,
        text: "Light Theme",
        onClick: () => setTheme(Theme.LIGHT),
      },
      {
        type: NavigationItemType.ACTION,
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
