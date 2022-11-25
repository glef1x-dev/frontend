import { useApiClient } from "@/services/api/index.js";
import { QueryObserverSuccessResult, useQuery } from "@tanstack/react-query";
import { blogQueryKeys } from "@/services/queryClient/queryKeys.js";
import { Article } from "@/services/api/types/blog.js";

export const useGetBlogArticleBySlug = (slug: string) => {
  const { blog } = useApiClient();
  return useQuery(
    blogQueryKeys.blogArticle(slug),
    () => blog.getArticleBySlug(slug),
    {
      keepPreviousData: true,
    }
  );
};

export const useGetBlogArticles = () => {
  const { blog } = useApiClient();
  return useQuery(blogQueryKeys.blogArticles(), blog.getArticles, {
    keepPreviousData: true,
  }) as QueryObserverSuccessResult<Article[]>;
};
