import axios, { AxiosError } from "axios";
import { createContext, ReactNode, useContext, useMemo } from "react";
import { CleanData, parseAs } from "~/services/api/type-utils";
import { Article, ArticleList } from "~/types";

export const ApiContext = createContext<ApiClient | null>(null);

export type GetArticlesOptions = Partial<{
  nextResultsUrl: string | null;
  tagName: string | null;
  pageSize: number | null;
}>;

export type ApiClient = {
  blog: {
    getArticleBySlug: (slug: string) => Promise<CleanData<typeof Article>>;
    getArticles: (
      options?: GetArticlesOptions
    ) => Promise<CleanData<typeof ArticleList>>;
  };
};

export type ApiProviderProps = {
  children?: ReactNode;
};

function rethrowOccurredDuringQueryError(
  originalError: Error,
  with_: {
    newMessage?: string;
  }
): never {
  if (axios.isAxiosError(originalError)) {
    throw new AxiosError(
      with_.newMessage || originalError.message,
      ...Object.values(originalError).slice(1)
    );
  }

  throw originalError;
}

export function ApiProvider({ children }: ApiProviderProps): JSX.Element {
  const api = axios.create({
    timeout: 10_000,
    baseURL: process.env.BASE_API_URL,
  });
  api.interceptors.response.use((response) => response);

  const client: ApiClient = useMemo(() => {
    return {
      blog: {
        getArticleBySlug: (
          slug: string
        ): Promise<CleanData<typeof Article>> => {
          return api
            .get(`/blog/articles/${slug}/`)
            .then((response) => parseAs(response.data, Article))
            .catch((error) =>
              rethrowOccurredDuringQueryError(error, {
                newMessage: "Article not found",
              })
            );
        },
        getArticles: (
          options?: GetArticlesOptions
        ): Promise<CleanData<typeof ArticleList>> => {
          const params: Record<string, string> = {};
          if (options?.tagName) {
            params.tags__title = options.tagName;
          }

          let getBlogArticlesPromise;

          if (options?.nextResultsUrl) {
            getBlogArticlesPromise = api.get(options.nextResultsUrl, {
              params,
              baseURL: "",
            });
          } else {
            getBlogArticlesPromise = api.get("/blog/articles/", {
              params,
            });
          }

          getBlogArticlesPromise = getBlogArticlesPromise.then((response) =>
            parseAs(response.data, ArticleList)
          );

          if (process.env.NODE_ENV === "development") {
            getBlogArticlesPromise = getBlogArticlesPromise.catch(() => {
              return Promise.resolve({} as CleanData<typeof ArticleList>);
            });
          }

          return getBlogArticlesPromise;
        },
      },
    };
  }, [api]);

  return <ApiContext.Provider value={client}>{children}</ApiContext.Provider>;
}

export const useApiClient = (): ApiClient => {
  const apiClient = useContext(ApiContext);
  if (apiClient === null) {
    throw new Error(
      "Unable to use API client without provided instance in context."
    );
  }
  return apiClient;
};
