export interface ArticleTag {
  id: number;
  title: string;
}

export interface Article {
  id: number;
  title: string;
  description: string;
  tags: Array<ArticleTag>;
  created: string;
  modified: string;
  image: string;
  body: string;
  slug: string;
}
