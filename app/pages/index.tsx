import dynamic from "next/dynamic";
import { Icon } from "@iconify/react";

import { Animate, Button, Pill } from "~/components";
import type { NavigationItem } from "~/types";
import { NavigationItemType } from "~/types";
import { Layout } from "~/layouts";

import type { CanvasProps } from "~/components/Canvas.component";
import { getCanvasAnimations } from "~/utils/events";
import { calculateMyAge } from "~/utils/datetime";

const Canvas = dynamic<CanvasProps>(
  () => import("~/components/Canvas.component").then(({ Canvas }) => Canvas),
  {
    ssr: false,
  }
);

const ACTIONS: Array<NavigationItem> = [
  {
    type: NavigationItemType.LINK,
    href: "/blog",
    icon: <Icon className="mr-3" icon="feather:edit-3" />,
    text: "Blog",
  },
  {
    type: NavigationItemType.LINK,
    href: "/projects",
    icon: <Icon className="mr-3" icon="feather:copy" />,
    text: "Projects",
  },
  {
    type: NavigationItemType.LINK,
    external: true,
    href: "https://github.com/GLEF1X",
    icon: <Icon className="mr-3" icon="feather:github" />,
    text: "GitHub",
  },
];

export default function HomePage(): JSX.Element {
  const myAge = calculateMyAge();
  const canvasAnimations = getCanvasAnimations();

  const description = `I am a ${myAge} years old full-stack developer`;

  return (
    <Layout.Default>
      {canvasAnimations.map((e, index) => (
        <Canvas animation={e} key={e.name ? e.name + index : index} />
      ))}
      <div className="min-h-screen flex items-center justify-center py-12">
        <div className="max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl w-full space-y-8 text-center">
          <Animate
            as="h1"
            animation={{
              opacity: [0, 1],
              scale: [0.75, 1],
            }}
            className="text-gray-500 dark:text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight font-extrabold"
          >
            Hey{" "}
            <span className="inline-block origin-70 hover:(animate-wave)">
              👋
            </span>{" "}
            I&apos;m Hlib, <br className="hidden sm:block" />a{" "}
            <Pill.Standard className="mt-4">software developer</Pill.Standard>
          </Animate>

          <Animate
            as="p"
            animation={{
              opacity: [0, 1],
              scale: [0.75, 1],
            }}
            className="max-w-xs mt-4 md:mt-8 mx-auto text-base text-gray-300 sm:text-lg md:text-xl md:max-w-3xl"
            transition={{
              delay: 0.5,
            }}
          >
            {description}
          </Animate>

          <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-4 space-y-4 sm:space-y-0 w-full mt-8 sm:mt-4">
            {ACTIONS.map((action, index) => {
              if (action.type !== NavigationItemType.LINK) return null;

              return (
                <Animate
                  animation={{
                    y: [50, 0],
                    opacity: [0, 1],
                  }}
                  className="w-full sm:w-auto"
                  key={index}
                  transition={{
                    delay: 0.1 * (index + 2) + 0.5,
                  }}
                >
                  <Button.Outline href={action.href}>
                    {action.icon}
                    <span>{action.text}</span>
                  </Button.Outline>
                </Animate>
              );
            })}
          </div>
        </div>
      </div>
    </Layout.Default>
  );
}
