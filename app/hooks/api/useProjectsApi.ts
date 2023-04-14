import { useApiClient } from '@/services/api';
import { extractRepoNameAndOwnerFromGithubLink } from '@/services/api/github';
import type { OpenSourceProject } from '@/services/api/types/opensourceProject';
import { githubQueryKeys } from '@/utils/query-keys.js';
import { useQueries, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const openSourceProjects: OpenSourceProject[] = [
  {
    title: 'glQiwiApi',
    description:
      'The ultra rapid and multifunctional wrapper over QIWI and YooMoney',
    sourceCodeLink: 'https://github.com/GLEF1X/glQiwiApi',
    documentationLink: 'https://glqiwiapi.readthedocs.io/en/latest/',
  },
  {
    title: 'apscheduler-di',
    description: 'Apscheduler Dependency Injection plugin',
    sourceCodeLink: 'https://github.com/GLEF1X/apscheduler-di',
  },
  {
    title: 'fastapi-admin2',
    description:
      'Lightweight and extendable admin panel, that supports many ORM dialects',
    sourceCodeLink: 'https://github.com/GLEF1X/fastapi-admin2',
  },
  {
    title: 'fastapi-ratelimiter',
    description: 'Redis-based rate-limiting for FastAPI',
    sourceCodeLink: 'https://github.com/GLEF1X/fastapi-ratelimiter',
    documentationLink: 'https://fastapi-ratelimit.readthedocs.io/en/latest/',
  },
  {
    title: 'aiomonobank',
    description: 'Async wrapper over Monobank API',
    sourceCodeLink: 'https://github.com/GLEF1X/aiomonobank',
  },
  {
    title: 'sqla-pagination',
    description: 'Pagination tool for adequate users of sqlalchemy',
    sourceCodeLink: 'https://github.com/GLEF1X/sqla-pagination',
  },
];

type QueryOptions<T> = UseQueryOptions<OpenSourceProject, AxiosError, T>;

export function useGetOpensourceProjects<Result = OpenSourceProject>(
  options?: Partial<QueryOptions<Result>>,
): ReturnType<typeof useQueries> {
  const projectsSourceCodeLinks = openSourceProjects.map(
    (p) => p.sourceCodeLink,
  );
  const { github } = useApiClient();

  return useQueries({
    queries: projectsSourceCodeLinks.map<QueryOptions<Result>>((link) => {
      const [repositoryName, repositoryOwner] = extractRepoNameAndOwnerFromGithubLink(link);
      return {
        queryFn: (): Promise<OpenSourceProject> => {
          return github
            .getRepository(repositoryName, repositoryOwner)
            .then((repository) => {
              const openSourceProject = openSourceProjects.find(
                (p) => p.sourceCodeLink === repository.url,
              );
              if (!openSourceProject) {
                throw new Error(
                  `Corresponding project ${repository.owner}/${repository.author} `
                    + 'was not found in the list of opensource projects for the one from GitHub.',
                );
              }
              return Object.assign(openSourceProject, {
                stargazersCount: repository.stargazersCount,
              });
            });
        },
        queryKey: githubQueryKeys.starsCount(repositoryOwner, repositoryName),
        ...options,
      };
    }),
  });
}
