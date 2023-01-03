import { useApiClient } from "@/services/api/index.js";
import {
  UseInfiniteQueryOptions,
  UseQueryOptions,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { blogQueryKeys } from "@/services/queryClient/queryKeys.js";
import { Article } from "@/services/api/types/blog.js";
import { useParams } from "react-router-dom";
import { PaginatedResult } from "@/services/api/types/base";

type FetchError = {};

export function useGetBlogArticleBySlug<Result = Article>(
  slug: string,
  options?: Partial<UseQueryOptions<Article, FetchError, Result>>
) {
  const { blog } = useApiClient();

  return useQuery<Article, FetchError, Result>(
    blogQueryKeys.blogArticle(slug),
    () => blog.getArticleBySlug(slug),
    options
  );
}

export function useInfiniteArticlesList<Result = PaginatedResult<Article>>(
  options?: Partial<
    UseInfiniteQueryOptions<PaginatedResult<Article>, FetchError, Result>
  >
) {
  const { tagName } = useParams();

  const { blog } = useApiClient();
  return useInfiniteQuery<PaginatedResult<Article>, FetchError, Result>(
    blogQueryKeys.blogArticles(tagName),
    (options) =>
      blog.getArticles({ tagName: tagName, nextResultsUrl: options.pageParam }),
    {
      getNextPageParam: (lastPage) => lastPage.next ?? undefined,
      ...options,
    }
  );
}
