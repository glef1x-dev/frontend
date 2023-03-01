export class GithubRepository {
  protected readonly fullName: string;
  public readonly stargazersCount: number;
  public readonly url: string;

  constructor(fullName: string, stargazersCount: number, url: string) {
    this.fullName = fullName;
    this.stargazersCount = stargazersCount;
    this.url = url;
  }

  get owner() {
    return this.fullName.split("/", 1)[0];
  }

  get author() {
    return this.fullName.split("/", 1)[1];
  }
}

export function extractRepoNameAndOwnerFromGithubLink(
  link: string,
): Array<string> {
  const [repoName, owner] = link.split("/").reverse().slice(0, 2);
  if (repoName === undefined || owner === undefined) {
    throw new Error("Github source code link is invalid");
  }
  return [repoName, owner];
}
