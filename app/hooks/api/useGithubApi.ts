import {
  extractRepoNameAndOwnerFromGithubLink,
  GithubRepository,
} from "@/services/api/github.js";
import { useApiClient } from "@/services/api";
import { githubQueryKeys } from "@/utils/queryKeys";
import { useQueries } from "@tanstack/react-query";

export const useGetGithubRepositoriesInBulk = (
  sourceCodeLinks: string[]
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
