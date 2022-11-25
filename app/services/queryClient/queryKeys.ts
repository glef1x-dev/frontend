export type QueryKeys = {
  [keyName: string]: (...args: any) => Array<string>;
};

export const blogQueryKeys = {
  blogArticle: (slug: string) => ["blogArticle", slug],
  blogArticles: () => ["blogArticles"],
};

export const githubQueryKeys = {
  starsCount: (repositoryOwner: string, repositoryName: string) => [
    "githubStarsCount",
    repositoryName,
    repositoryOwner,
  ],
};
