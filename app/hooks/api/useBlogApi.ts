import { useApiClient } from "@/services/api/index.js";
import { QueryObserverSuccessResult, useQuery } from "@tanstack/react-query";
import { blogQueryKeys } from "@/services/queryClient/queryKeys.js";
import { Article } from "@/services/api/types/blog.js";
import { useParams } from "react-router-dom";

export const useGetBlogArticleBySlug = () => {
  const { slug } = useParams();

  if (!slug) {
    throw new Error("Slug is not found in query parameters");
  }

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
  const { tagName } = useParams();

  const { blog } = useApiClient();
  return useQuery(
    blogQueryKeys.blogArticles(tagName),
    () => blog.getArticles(tagName),
    {
      keepPreviousData: true,
    }
  ) as QueryObserverSuccessResult<Article[]>;
};
