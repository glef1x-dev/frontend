import { axiosClient } from "@/lib/axios.js";
import { PaginatedResult } from "@/lib/base-api-types.js";
import { Article } from "@/features/blog/api/types.js";

export async function getArticles(): Promise<PaginatedResult<Article>> {
  return axiosClient
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
  const response = await axiosClient.get(`/blog/articles/${params.slug}/`);
  return response.data as Article;
}
