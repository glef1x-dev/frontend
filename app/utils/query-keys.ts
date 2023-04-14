export type QueryKeys = {
  [keyName: string]: (...args: any) => Array<string>;
};

export const blogQueryKeys = {
  blogArticle: (slug: string): ReadonlyArray<string> => ['blogArticle', slug],
  blogArticles: (tagName: string | undefined): ReadonlyArray<string> => [
    'blogArticles',
    tagName ?? '',
  ],
};

export const githubQueryKeys = {
  starsCount: (repositoryOwner: string, repositoryName: string): ReadonlyArray<string> => [
    'githubStarsCount',
    repositoryName,
    repositoryOwner,
  ],
};
