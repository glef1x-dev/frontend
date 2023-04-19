import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

import type { ComponentProps } from "react";

export function useSeoProps(
  props: Partial<ComponentProps<typeof NextSeo>> = {}
): Partial<ComponentProps<typeof NextSeo>> {
  const router = useRouter();

  const title = "GLEF1X ─ developer";
  const description = "Hey 👋 I'm Hlib, a software developer";

  return {
    title,
    description,
    canonical: `https://glefix.dev/${router.asPath}`,
    openGraph: {
      title,
      description,
      site_name: "glefix",
      url: `https://glefix.dev/${router.asPath}`,
      type: "website",
      images: [
        {
          url: "https://glefix.dev/banner.png",
          alt: description,
          width: 1280,
          height: 720,
        },
      ],
    },
    twitter: {
      cardType: "summary_large_image",
      handle: "@Gleb11363811",
      site: "@Gleb11363811",
    },
    ...props,
  };
}
