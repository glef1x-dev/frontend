import { GithubRepository } from "@/services/api/github.js";
import { Article, ArticleList } from "@/services/api/types/blog.js";
import { CleanData, parseAs } from "@/services/api/types/parser.js";
import axios, { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { createContext, ReactNode, useCallback, useContext } from "react";
import { config } from "@/core/config.js";

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
      options?: GetArticlesOptions,
    ) => Promise<CleanData<typeof ArticleList>>;
  };
  github: {
    getRepository: (
      repositoryName: string,
      repositoryOwner: string,
    ) => Promise<GithubRepository>;
  };
};

export type ApiProviderProps = {
  children?: ReactNode;
};

function rethrowOccurredDuringQueryError(
  originalError: Error,
  with_: {
    newMessage?: string;
  },
): never {
  if (axios.isAxiosError(originalError)) {
    throw new AxiosError(
      with_.newMessage || originalError.message,
      ...Object.values(originalError).slice(1),
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
    [enqueueSnackbar],
  );

  const api = axios.create({
    timeout: 10_000,
    baseURL: config.app.baseAPIUrl,
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
            }),
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
          parseAs(response.data, ArticleList),
        );

        if (__DEV__) {
          getBlogArticlesPromise = getBlogArticlesPromise.catch((error) => {
            return Promise.resolve({} as CleanData<typeof ArticleList>);
          });
        }

        return getBlogArticlesPromise;
      },
    },
    github: {
      getRepository: (repositoryName: string, repositoryOwner: string) =>
        api
          .get(
            `/third-party/github/repository/${repositoryOwner}/${repositoryName}/`,
          )
          .then((response) => {
            return new GithubRepository(
              response.data.fullName,
              response.data.stargazersCount,
              response.data.htmlUrl,
            );
          })
          .catch((error) => {
            notifyOnError(
              `Failed to load ${repositoryName} repository metadata from GitHub`,
            );
            return Promise.resolve(
              new GithubRepository(
                repositoryName + "/" + repositoryName,
                0,
                `https://github.com/${repositoryOwner}/${repositoryName}`,
              ),
            );
          }),
    },
  };

  return <ApiContext.Provider value={client}>{children}</ApiContext.Provider>;
};

export const useApiClient = () => {
  const apiClient = useContext(ApiContext);
  if (apiClient === null) {
    throw new Error(
      "Unable to use API client without provided instance in context.",
    );
  }
  return apiClient;
};
