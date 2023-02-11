import { Octokit } from "@octokit/rest";
import { createContext, memo, ReactNode, useContext } from "react";

export const OctokitContext = createContext<Octokit | null>(null);

export const OctokitProvider = memo(
  ({
    children,
  }: {
    token?: string;
    children?: ReactNode;
  }) => {
    const octokitInstance = new Octokit();
    return (
      <OctokitContext.Provider value={octokitInstance}>
        {children}
      </OctokitContext.Provider>
    );
  }
);

export const useOctokit = (): Octokit => {
  const octokit = useContext(OctokitContext);
  if (octokit === null) {
    throw new Error("Octokit instance is not provided to context");
  }
  return octokit;
};

export function extractRepoNameAndOwnerFromGithubLink(
  link: string
): Array<string> {
  const [repoName, owner] = link.split("/").reverse().slice(0, 2);
  if (repoName === undefined || owner === undefined) {
    throw new Error("Github source code link is invalid");
  }
  return [repoName, owner];
}

export async function getRepositoryStarsCount(
  instance: Octokit,
  owner: string,
  repo: string
): Promise<number> {
  const {
    data: { stargazers_count },
  } = await instance.rest.repos.get({
    owner: owner,
    repo: repo,
  });

  return stargazers_count;
}
