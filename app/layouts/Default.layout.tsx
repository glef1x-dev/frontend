import dynamic from "next/dynamic";
import { NextSeo } from "next-seo";

import { Navbar } from "~/components";

import type { WithChildren, WithProps } from "~/types";
import { useSeoProps } from "~/hooks/use-seo";
import { useAppSelector } from "~/hooks/use-redux";
import { selectSettings } from "~/lib/state/settings/slice";

const Background = dynamic(() =>
  import("~/components/Background/Standard.component").then(
    ({ Standard }) => Standard
  )
);

interface DefaultLayoutProps extends WithChildren {
  background?: boolean;
  seo?: Partial<WithProps<typeof NextSeo>>;
}

export function DefaultLayout({
  background: overrideBackground,
  children,
  seo: customSeo,
}: DefaultLayoutProps): JSX.Element {
  const { animations: background } = useAppSelector(selectSettings);
  const showBackground = overrideBackground ?? background;

  const seo = useSeoProps(customSeo);

  return (
    <>
      <NextSeo {...seo} />
      <Navbar.Standard />
      <main className="flex flex-col justify-center px-8">
        {showBackground && <Background />}
        {children}
      </main>
    </>
  );
}
