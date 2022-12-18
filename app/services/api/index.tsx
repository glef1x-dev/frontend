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

export const ApiContext = createContext<ApiClient | null>(null);

function handleError(
  error: unknown,
  notifyOnError: (message: string) => unknown
) {
  notifyOnError(error?.toString() ?? "");

  return Promise.reject(error);
}

export type ApiClient = {
  blog: {
    getArticleBySlug: (slug: string) => Promise<Article>;
    getArticles: (tagName?: string) => Promise<Article[]>;
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
    return axios.create({
      timeout: 10000,
      baseURL: BASE_API_URL,
    });
  }, []);

  api.interceptors.response.use(
    (response) => response,
    (error) => handleError(error, notifyOnError)
  );

  const octokitClient = useOctokit();

  const client: ApiClient = {
    blog: {
      getArticleBySlug: (slug: string) =>
        api.get(`/blog/articles/${slug}/`).then((response) => response.data),
      getArticles: (tagName?: string) => {
        const params: Record<string, string> = {};
        if (tagName) {
          params["tags__title"] = tagName;
        }

        const getBlogArticlesPromise = api
          .get("/blog/articles/", {
            params: params,
          })
          .then((response) => response.data.results);

        if (__DEV__) {
          getBlogArticlesPromise.catch((error) => {
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
