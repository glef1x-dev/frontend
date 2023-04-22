import Image from "next/image";
import { MDXRemote } from "next-mdx-remote";

import type { GetStaticProps } from "next";
import type { ParsedUrlQuery } from "querystring";
import { Blog, Pill } from "~/components";
import { Layout } from "~/layouts";

import { ReactElement } from "react";
import { apiClient, BlogPost } from "~/services/api";
import Comments from "~/components/Blog/Comments.component";

interface PathProps extends ParsedUrlQuery {
  slug: string;
}

interface BlogPostProps {
  post: BlogPost;
}

export async function getStaticPaths() {
  // TODO consider pagination
  const posts = await apiClient.getBlogPosts();

  return {
    paths: posts.results.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps<BlogPostProps, PathProps> = async ({
  params,
}) => {
  if (!params) {
    throw new Error("No params provided");
  }

  const post = await apiClient.getPostBySlug(params.slug);

  return {
    props: {
      post,
    },
    revalidate: 3600,
  };
};

export default function BlogPost({ post }: BlogPostProps): JSX.Element {
  return (
    <div className="relative px-4 py-16 overflow-hidden">
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="relative sm:max-w-2xl lg:sm:max-w-6xl mx-auto my-2 sm:my-4">
          <div className="w-full h-full h-64 lg:h-96 mb-8 bg-gray-200 dark:bg-gray-600 rounded-3xl motion-safe:animate-pulse" />
          <Image
            alt={post.title}
            className="absolute top-0 left-0 w-full h-auto max-h-64 lg:max-h-96 mb-8 rounded-3xl object-cover select-none shadow-xl default-transition"
            draggable={false}
            src={post.image}
            width={1700}
            height={900}
          />
        </div>

        <div className="flex flex-col space-y-4 max-w-prose mx-auto my-4 text-lg text-center">
          <div>
            <span className="text-gray-900 dark:text-white sm:text-4xl text-3xl text-center leading-8 font-extrabold tracking-tight">
              {post.title}
            </span>
          </div>

          <span className="flex justify-center items-center">
            <Pill.Date>{post.created}</Pill.Date>
          </span>

          <p className="mt-8 text-xl text-gray-400 leading-8">
            {post.description}
          </p>
        </div>

        <article className="max-w-prose prose prose-primary prose-lg text-gray-500 mx-auto">
          <MDXRemote {...post.body} components={Blog.X} />
          <Comments />
        </article>
      </div>
    </div>
  );
}

BlogPost.getLayout = function getLayout(
  page: ReactElement,
  { post }: BlogPostProps
): JSX.Element {
  return (
    <>
      <Layout.Blog
        seo={{
          title: `${post.title} ─ blog ─ GLEF1X`,
          description: post.description ?? undefined,
          openGraph: {
            title: post.title,
            images: [
              {
                url: post.image,
                alt: post.description,
                width: 1280,
                height: 720,
              },
            ],
          },
        }}
      >
        {page}
      </Layout.Blog>
      <Blog.Styles.Code />
      <Blog.Styles.Elements />
    </>
  );
};
