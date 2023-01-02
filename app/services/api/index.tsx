import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from "react";
import axios from "axios";
import { Article } from "@/services/api/types/blog.js";
import { getRepositoryStarsCount, useOctokit } from "@/services/api/github";
import { useSnackbar } from "notistack";
import { PaginatedResult } from "./types/base";

export const ApiContext = createContext<ApiClient | null>(null);

function handleError(
  error: unknown,
  notifyOnError: (message: string) => unknown
) {
  notifyOnError(error?.toString() ?? "");

  return Promise.reject(error);
}

export type GetArticlesOptions = {
  nextResultsUrl?: string | null;
  tagName?: string | null;
  pageSize?: number | null;
};

export type ApiClient = {
  blog: {
    getArticleBySlug: (slug: string) => Promise<Article>;
    getArticles: (
      options?: GetArticlesOptions
    ) => Promise<PaginatedResult<Article>>;
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

  const api = useMemo(() => {
    const client = axios.create({
      timeout: 10000,
      baseURL: BASE_API_URL,
    });
    client.interceptors.response.use(
      (response) => response,
      (error) => handleError(error, notifyOnError)
    );
    return client;
  }, []);

  const octokitClient = useOctokit();

  const client: ApiClient = useMemo(() => {
    return {
      blog: {
        getArticleBySlug: (slug: string) =>
          api.get(`/blog/articles/${slug}/`).then((response) => response.data),
        getArticles: (options?: GetArticlesOptions) => {
          const params: Record<string, string> = {};
          if (options?.tagName) {
            params["tags__title"] = options.tagName;
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

          getBlogArticlesPromise = getBlogArticlesPromise.then(
            (response) => response.data
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
  }, [api, octokitClient]);

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
