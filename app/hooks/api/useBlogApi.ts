import { useApiClient } from "@/services/api/index.js";
import { blogQueryKeys } from "@/services/queryClient/queryKeys.js";
import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Article, ArticleList } from "@/services/api/types/blog";
import { CleanData } from "@/services/api/types/parser";

export function useGetBlogArticleBySlug<Result = CleanData<typeof Article>>(
  slug: string,
  options?: Partial<
    UseQueryOptions<CleanData<typeof Article>, AxiosError, Result>
  >
) {
  const { blog } = useApiClient();

  return useQuery<CleanData<typeof Article>, AxiosError, Result>(
    blogQueryKeys.blogArticle(slug),
    () => blog.getArticleBySlug(slug),
    options
  );
}

export function useInfiniteArticlesList<Result = CleanData<typeof ArticleList>>(
  tagName?: string,
  options?: Partial<
    UseInfiniteQueryOptions<CleanData<typeof ArticleList>, AxiosError, Result>
  >
) {
  const { blog } = useApiClient();
  return useInfiniteQuery<CleanData<typeof ArticleList>, AxiosError, Result>(
    blogQueryKeys.blogArticles(tagName),
    (opts) =>
      blog.getArticles({ tagName: tagName, nextResultsUrl: opts.pageParam }),
    {
      getNextPageParam: (lastPage) => lastPage.next ?? undefined,
      ...options,
    }
  );
}
