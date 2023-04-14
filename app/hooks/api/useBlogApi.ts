import { useApiClient } from '@/services/api';
import { Article, ArticleList } from '@/services/api/types/blog';
import { CleanData } from '@/services/api/types/parser';
import { blogQueryKeys } from '@/utils/query-keys.js';
import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useGetBlogArticleBySlug(
  slug: string,
  options?: Partial<
    UseQueryOptions<CleanData<typeof Article>, AxiosError>
  >,
): UseQueryResult<CleanData<typeof Article>, AxiosError> {
  const { blog } = useApiClient();

  return useQuery<CleanData<typeof Article>, AxiosError>(
    blogQueryKeys.blogArticle(slug),
    () => blog.getArticleBySlug(slug),
    options,
  );
}

export function useInfiniteArticlesList<Result = CleanData<typeof ArticleList>>(
  tagName?: string,
  options?: Partial<
    UseInfiniteQueryOptions<CleanData<typeof ArticleList>, AxiosError, Result>
  >,
): ReturnType<typeof useInfiniteQuery<CleanData<typeof ArticleList>, AxiosError, Result>> {
  const { blog } = useApiClient();
  return useInfiniteQuery<CleanData<typeof ArticleList>, AxiosError, Result>(
    blogQueryKeys.blogArticles(tagName),
    (opts) => blog.getArticles({ tagName, nextResultsUrl: opts.pageParam }),
    {
      getNextPageParam: (lastPage) => lastPage.next ?? undefined,
      ...options,
    },
  );
}
