import { axiosInstance } from "./axiosConfig.js";

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

export async function getArticles(): Promise<PaginatedResult<Article>> {
  return axiosInstance
    .get("blog/articles/", {})
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

export async function getPostArticleBySlug({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Article> {
  const response = await axiosInstance.get(`/blog/articles/${params.slug}/`);
  return response.data as Article;
}
