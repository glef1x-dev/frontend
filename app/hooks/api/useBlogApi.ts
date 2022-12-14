import { useApiClient } from "@/services/api/index.js";
import { PaginatedResult } from "@/services/api/types/base";
import { Article } from "@/services/api/types/blog.js";
import { blogQueryKeys } from "@/services/queryClient/queryKeys.js";
import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useGetBlogArticleBySlug<Result = Article>(
  slug: string,
  options?: Partial<UseQueryOptions<Article, AxiosError, Result>>
) {
  const { blog } = useApiClient();

  return useQuery<Article, AxiosError, Result>(
    blogQueryKeys.blogArticle(slug),
    () => blog.getArticleBySlug(slug),
    options
  );
}

export function useInfiniteArticlesList<Result = PaginatedResult<Article>>(
  tagName?: string,
  options?: Partial<
    UseInfiniteQueryOptions<PaginatedResult<Article>, AxiosError, Result>
  >
) {
  const { blog } = useApiClient();
  return useInfiniteQuery<PaginatedResult<Article>, AxiosError, Result>(
    blogQueryKeys.blogArticles(tagName),
    (options) =>
      blog.getArticles({ tagName: tagName, nextResultsUrl: options.pageParam }),
    {
      getNextPageParam: (lastPage) => lastPage.next ?? undefined,
      ...options,
    }
  );
}
