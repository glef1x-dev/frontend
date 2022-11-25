import { useQuery } from "@tanstack/react-query";
import { githubQueryKeys } from "@/services/queryClient/queryKeys.js";
import { useApiClient } from "@/services/api/index.js";
import { extractRepoNameAndOwnerFromGithubLink } from "@/services/api/github.js";

export const useGetStarsCount = (sourceCodeLink: string) => {
  const { github } = useApiClient();

  const [repositoryName, repositoryOwner] =
    extractRepoNameAndOwnerFromGithubLink(sourceCodeLink);

  return useQuery(
    githubQueryKeys.starsCount(repositoryOwner, repositoryName),
    () => {
      return github.getStarsCount(repositoryName, repositoryOwner);
    }
  );
};
