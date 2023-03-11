import { OpenSourceProject } from "@/services/api/types/opensourceProject";
import { useQueries, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { extractRepoNameAndOwnerFromGithubLink } from "@/services/api/github.js";
import { githubQueryKeys } from "@/utils/query-keys.js";
import { useApiClient } from "@/services/api/index.js";

const openSourceProjects: OpenSourceProject[] = [
  {
    title: "glQiwiApi",
    description:
      "The ultra rapid and multifunctional wrapper over QIWI and YooMoney",
    sourceCodeLink: "https://github.com/GLEF1X/glQiwiApi",
    documentationLink: "https://glqiwiapi.readthedocs.io/en/latest/",
  },
  {
    title: "apscheduler-di",
    description: "Apscheduler Dependency Injection plugin",
    sourceCodeLink: "https://github.com/GLEF1X/apscheduler-di",
  },
  {
    title: "fastapi-admin2",
    description:
      "Lightweight and extendable admin panel, that supports many ORM dialects",
    sourceCodeLink: "https://github.com/GLEF1X/fastapi-admin2",
  },
  {
    title: "fastapi-ratelimiter",
    description: "Redis-based rate-limiting for FastAPI",
    sourceCodeLink: "https://github.com/GLEF1X/fastapi-ratelimiter",
    documentationLink: "https://fastapi-ratelimit.readthedocs.io/en/latest/",
  },
  {
    title: "aiomonobank",
    description: "Async wrapper over Monobank API",
    sourceCodeLink: "https://github.com/GLEF1X/aiomonobank",
  },
  {
    title: "sqla-pagination",
    description: "Pagination tool for adequate users of sqlalchemy",
    sourceCodeLink: "https://github.com/GLEF1X/sqla-pagination",
  },
];

export function useGetOpensourceProjects<Result = OpenSourceProject>(
  options?: Partial<UseQueryOptions<OpenSourceProject, AxiosError, Result>>,
) {
  const projectsSourceCodeLinks = openSourceProjects.map(
    (p) => p.sourceCodeLink,
  );
  const { github } = useApiClient();

  return useQueries({
    queries: projectsSourceCodeLinks.map((link) => {
      const [repositoryName, repositoryOwner] =
        extractRepoNameAndOwnerFromGithubLink(link);
      return {
        queryFn: () => {
          return github
            .getRepository(repositoryName, repositoryOwner)
            .then((repository) => {
              const openSourceProject = openSourceProjects.find(
                (p) => p.sourceCodeLink === repository.url,
              );
              if (!openSourceProject) {
                throw new Error(
                  `Corresponding project ${repository.owner}/${repository.author} ` +
                    `was not found in the list of opensource projects for the one from GitHub.`,
                );
              }
              return {
                ...openSourceProject,
                stargazersCount: repository.stargazersCount,
              };
            });
        },
        queryKey: githubQueryKeys.starsCount(repositoryOwner, repositoryName)
      };
    }),
  });
}
