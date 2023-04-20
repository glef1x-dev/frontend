import axios, { AxiosError, AxiosResponse } from "axios";
import { parseAs, Validated } from "~/services/api/type-utils";
import { BlogPostModel, BlogPosts, GitHubRepos, Project } from "~/types";
import { parseBlogPostMarkdown } from "~/utils/markdown";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { log } from "next-axiom";
import emojiRegex from "emoji-regex";

export type GetBlogPostsOptions = Partial<{
  nextResultsUrl: string | null;
  tagName: string | null;
  pageSize: number | null;
}>;

export type BlogPost = Omit<Validated<typeof BlogPostModel>, "body"> & {
  body: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, unknown>
  >;
};

const axiosInstance = axios.create({
  timeout: 10_000,
  baseURL: process.env.BASE_API_URL,
});

const REPOSITORY_NAMES_FOR_PORTFOLIO = [
  "glQiwiApi",
  "fastapi-admin2",
  "apscheduler-di",
  "fastapi-ratelimiter",
  "aiomonobank",
  "sqla-pagination",
  "glef1x.dev-frontend",
];

export class ApiClient {
  async getPostBySlug(slug: string): Promise<BlogPost> {
    let response: AxiosResponse<unknown, unknown>;
    try {
      response = await axiosInstance.get(`/blog/articles/${slug}/`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new AxiosError(
          "Article was not found",
          ...Object.values(error).slice(1)
        );
      }
      throw error;
    }
    const blogPost = parseAs(response.data, BlogPostModel);
    const parsedMarkdown = await parseBlogPostMarkdown(blogPost.body);

    return {
      ...blogPost,
      body: parsedMarkdown,
    } as BlogPost;
  }

  getBlogPosts(
    options?: GetBlogPostsOptions
  ): Promise<Validated<typeof BlogPosts>> {
    const params: Record<string, string> = {};
    if (options?.tagName) {
      params.tags__title = options.tagName;
    }

    let getBlogArticlesPromise;

    if (options?.nextResultsUrl) {
      getBlogArticlesPromise = axiosInstance.get(options.nextResultsUrl, {
        params,
        baseURL: "",
      });
    } else {
      getBlogArticlesPromise = axiosInstance.get("/blog/articles/", {
        params,
      });
    }

    getBlogArticlesPromise = getBlogArticlesPromise.then((response) =>
      parseAs(response.data, BlogPosts)
    );

    return getBlogArticlesPromise;
  }

  async getOpenSourceProjects(): Promise<Array<Project>> {
    const response = await axiosInstance.get(
      "https://api.github.com/users/GLEF1X/repos",
      {
        headers: {
          ...(process.env.GITHUB_PAT && {
            authorization: `token ${process.env.GITHUB_PAT}`,
          }),
        },
      }
    );
    if (response.status !== 200) {
      const json = response.data as {
        documentation_url: string;
        message: string;
      };

      console.error({ error: json });
      log.error("Failed to fetch projects", {
        error: json,
      });

      return [];
    }

    const json = response.data as GitHubRepos;

    const projects = json
      .map((repo) => {
        if (
          repo.archived ||
          !REPOSITORY_NAMES_FOR_PORTFOLIO.includes(repo.name)
        )
          return null;

        const result: Project = {
          homepage: repo.homepage ?? undefined,
          name: repo.name,
          post: undefined,
          template: false,
          url: repo.html_url.toLowerCase(),
          stargazersCount: repo.stargazers_count,
          description: repo.description,
        };

        if (!repo.description) {
          return result;
        }

        let emoji: string | null = null;
        const descriptionLeadingEmojiMatch = repo.description
          .split(" ")[0]
          .match(emojiRegex());

        if (descriptionLeadingEmojiMatch) {
          emoji = descriptionLeadingEmojiMatch[0];
        }

        if (emoji) {
          result.description = result.description.split(" ").slice(1).join(" ");
          result.icon = emoji;
        }

        return result;
      })
      .filter((project) => project !== null) as Array<Project>;

    return projects.sort((a, b) => b.stargazersCount - a.stargazersCount);
  }
}

export const apiClient = new ApiClient();
