import PageHeader from '@/components/PageHeader';
import SEO from '@/components/SEO';
import { useTheme } from '@/core/ui/mui/theme.js';
import { useGetOpensourceProjects } from '@/hooks/api/useProjectsApi.js';
import { dynamicSort } from '@/utils/sorting.js';
import { Container } from '@mui/material';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import * as React from 'react';
import { useLayoutEffect } from 'react';
import { OpenSourceProject } from '@/services/api/types/opensourceProject';
import OpenSourceProjectCard from './OpenSourceProjectCard.js';

function ProjectCardSkeletons({ numberOfCards }: { numberOfCards: number }): JSX.Element {
  useLayoutEffect(() => {
    disableBodyScroll(document.body);

    return (): void => {
      enableBodyScroll(document.body);
    };
  });

  return (
    <>
      {Array(numberOfCards)
        .fill(undefined)
        .map((_, index) => (
          <OpenSourceProjectCard key={index} loading />
        ))}
    </>
  );
}

function ProjectCards(): JSX.Element {
  const responses = useGetOpensourceProjects();

  return (
    <>
      {responses
        .map((response) => response.data as OpenSourceProject)
        .sort(dynamicSort<OpenSourceProject>('-stargazersCount'))
        .map((project) => (
          <OpenSourceProjectCard key={project.title} project={project} />
        ))}
    </>
  );
}

export default function OpenSource(): JSX.Element {
  const theme = useTheme();

  return (
    <>
      <SEO
        title="Opensource"
        description="The open source projects that I am involved with, either as the author or as a maintainer"
      />
      <PageHeader
        title="Opensource"
        description="These are the open source projects that I am involved with, either as the author or as a maintainer"
      />
      <Container
        sx={{
          '@media(min-width: 850px)': {
            gridTemplateColumns: 'repeat(2, 1fr)',
          },
          display: 'grid',
          gridTemplateColumns: 'repeat(1, 1fr)',
          gap: '1rem',
          padding: theme.spacing(2),
          gridAutoRows: '1fr',
        }}
      >
        <React.Suspense fallback={<ProjectCardSkeletons numberOfCards={4} />}>
          <ProjectCards />
        </React.Suspense>
      </Container>
    </>
  );
}
