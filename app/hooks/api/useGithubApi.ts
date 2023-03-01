import { useApiClient } from "@/services/api";
import {
  extractRepoNameAndOwnerFromGithubLink,
  GithubRepository,
} from "@/services/api/github.js";
import { githubQueryKeys } from "@/utils/queryKeys.js";
import { useQueries } from "@tanstack/react-query";

export const useGetGithubRepositoriesInBulk = (
  sourceCodeLinks: string[],
): GithubRepository[] => {
  const { github } = useApiClient();

  const responses = useQueries({
    queries: sourceCodeLinks.map((link) => {
      const [repositoryName, repositoryOwner] =
        extractRepoNameAndOwnerFromGithubLink(link);
      return {
        queryFn: () => {
          return github.getRepository(repositoryName, repositoryOwner);
        },
        queryKey: githubQueryKeys.starsCount(repositoryOwner, repositoryName),
      };
    }),
  });

  return responses.map((response) => response.data) as GithubRepository[];
};
