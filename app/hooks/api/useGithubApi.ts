import { extractRepoNameAndOwnerFromGithubLink } from "@/services/api/github.js";
import { useApiClient } from "@/services/api/index.js";
import { githubQueryKeys } from "@/services/queryClient/queryKeys.js";
import { useQuery } from "@tanstack/react-query";

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
