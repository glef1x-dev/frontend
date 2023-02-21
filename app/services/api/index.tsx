import { getRepositoryStarsCount, useOctokit } from "@/services/api/github";
import { Article, ArticleList } from "@/services/api/types/blog.js";
import axios, { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { createContext, ReactNode, useCallback, useContext } from "react";
import { parseAs } from "@/services/api/types/parser";

export const ApiContext = createContext<ApiClient | null>(null);

export type GetArticlesOptions = Partial<{
  nextResultsUrl: string | null;
  tagName: string | null;
  pageSize: number | null;
}>;

export type ApiClient = {
  blog: {
    getArticleBySlug: (slug: string) => Promise<typeof Article>;
    getArticles: (options?: GetArticlesOptions) => Promise<typeof ArticleList>;
  };
  github: {
    getStarsCount: (
      repositoryName: string,
      repositoryOwner: string
    ) => Promise<number>;
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

export const ApiProvider = ({ children }: ApiProviderProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const notifyOnError = useCallback(
    (message: string) =>
      enqueueSnackbar(message, {
        variant: "error",
        preventDuplicate: true,
      }),
    [enqueueSnackbar]
  );
  const octokitClient = useOctokit();

  const api = axios.create({
    timeout: 10_000,
    baseURL: BASE_API_URL,
  });
  api.interceptors.response.use((response) => response);

  const client: ApiClient = {
    blog: {
      getArticleBySlug: (slug: string) => {
        return api
          .get(`/blog/articles/${slug}/`)
          .then((response) => parseAs(response.data, Article))
          .catch((error) =>
            rethrowOccurredDuringQueryError(error, {
              newMessage: "Article not found",
            })
          );
      },
      getArticles: (options?: GetArticlesOptions) => {
        const params: Record<string, string> = {};
        if (options?.tagName) {
          params.tags__title = options.tagName;
        }

        let getBlogArticlesPromise;

        if (options?.nextResultsUrl) {
          getBlogArticlesPromise = api.get(options.nextResultsUrl, {
            params: params,
            baseURL: "",
          });
        } else {
          getBlogArticlesPromise = api.get("/blog/articles/", {
            params: params,
          });
        }

        getBlogArticlesPromise = getBlogArticlesPromise.then((response) =>
          parseAs(response.data, ArticleList)
        );

        if (__DEV__) {
          getBlogArticlesPromise = getBlogArticlesPromise.catch((error) => {
            return Promise.resolve([]);
          });
        }

        return getBlogArticlesPromise;
      },
    },
    github: {
      getStarsCount: (repositoryName: string, repositoryOwner: string) =>
        getRepositoryStarsCount(
          octokitClient,
          repositoryOwner,
          repositoryName
        ).catch((error) => {
          notifyOnError(
            `Failed to load opensource project metadata from GitHub [${error.toString()}]`
          );
          return Promise.resolve(0);
        }),
    },
  };

  return <ApiContext.Provider value={client}>{children}</ApiContext.Provider>;
};

export const useApiClient = () => {
  const apiClient = useContext(ApiContext);
  if (apiClient === null) {
    throw new Error(
      "Unable to use API client without provided instance in context."
    );
  }
  return apiClient;
};
