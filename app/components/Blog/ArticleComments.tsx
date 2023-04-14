import { config } from '@/core/config.js';
import { memo } from 'react';
import useUtternances from '../../hooks/utternances.js';

function ArticleComment(): JSX.Element {
  const anchorIdForInjectingUtternances = useUtternances(
    config.utternances.repositoryName,
  );

  return <div id={anchorIdForInjectingUtternances} />;
}

export default memo(ArticleComment);
