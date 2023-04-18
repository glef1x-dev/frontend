import { NextSeo } from 'next-seo';

import type { ComponentProps, PropsWithChildren } from 'react';
import { Navbar } from '~/components';
import { useSeoProps } from '~/hooks/use-seo';

interface BlogLayoutProps {
	seo?: Partial<ComponentProps<typeof NextSeo>>;
}

export function BlogLayout({ children, seo }: PropsWithChildren<BlogLayoutProps>): JSX.Element {
  const seoProps = useSeoProps({
    title: 'GLEF1X ─ blog',
    ...seo,
  });

  return (
    <>
      <NextSeo {...seoProps} />
      <Navbar.Standard />
      <main className="flex flex-col justify-center sm:px-8">{children}</main>
    </>
  );
}
