import splitbee from '@splitbee/web';

import type { GetServerSideProps } from 'next';

import type { Referrals } from '~/types';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { default: rawReferrals } = await import('~/data/referrals.json');
  const referrals = rawReferrals as Referrals;

  if (!params || !params.name) {
    return {
      redirect: {
        destination: '/referrals',
        permanent: true,
      },
    };
  }

  const paramName = Array.isArray(params.name)
    ? params.name[0].toLowerCase()
    : params.name.toLowerCase();

  const referral = referrals.find((referral) => {
    const referralName = referral.name.toLowerCase();

    if (referralName === paramName) return referral;

    if (referral.aliases) return referral.aliases.find((alias) => alias.toLowerCase() === paramName);

    return undefined;
  });

  if (referral) {
    splitbee.track(referral.name.toLowerCase(), {
      code: referral.code,
      type: 'referral',
      url: referral.url,
    });
  }

  return {
    redirect: {
      destination: referral ? referral.url : '/referrals',
      permanent: true,
    },
  };
};

export default function ReferralRedirectPage(): null {
  return null;
}
