import { useTheme } from '@/core/ui/mui/theme.js';
import { useEffect, useId } from 'react';

export default function useUtternances(
  repositoryName: string,
  issueTerm = 'pathname',
): string {
  const anchorIdForInjectingUtternances = useId();
  const theme = useTheme();
  const utterancesTheme = theme.palette.mode === 'dark' ? 'github-dark' : 'github-light';

  useEffect(() => {
    const anchor = document.getElementById(anchorIdForInjectingUtternances);
    if (!anchor) {
      throw new Error('Unable to inject comments without placeholder div.');
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://utteranc.es/client.js';

    script.setAttribute('crossorigin', 'anonymous');
    script.setAttribute('repo', repositoryName);
    script.setAttribute('label', 'comment :speech_balloon:');
    script.setAttribute('issue-term', issueTerm);
    script.setAttribute('theme', utterancesTheme);

    anchor.replaceChildren(script);
  }, [
    repositoryName,
    issueTerm,
    utterancesTheme,
    anchorIdForInjectingUtternances,
  ]);

  return anchorIdForInjectingUtternances;
}
