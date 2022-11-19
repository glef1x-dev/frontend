export interface ArticleTag {
  id: number;
  title: string;
}

export interface Article {
  id: number;
  title: string;
  description: string;
  tags: Array<ArticleTag>;
  created: Date;
  modified: Date;
  image: string;
  body: string;
  slug: string;
}
