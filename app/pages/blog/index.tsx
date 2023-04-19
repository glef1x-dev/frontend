import type { GetServerSideProps } from "next";
import { Blog } from "~/components";
import { Layout } from "~/layouts";

import { BlogPosts } from "~/types";
import { apiClient } from "~/services/api";
import { Validated } from "~/services/api/type-utils";

interface BlogProps {
  blogPosts: Validated<typeof BlogPosts>["results"];
}

export const getServerSideProps: GetServerSideProps<BlogProps> = async () => {
  const blogPosts = await apiClient.getBlogPosts();

  return {
    props: {
      blogPosts: blogPosts.results,
    },
  };
};

export default function BlogPage({ blogPosts }: BlogProps): JSX.Element {
  if (blogPosts.length <= 0) return <Blog.Error routeBlog={false} />;

  const latestPost = blogPosts[0];

  return (
    <Layout.Default seo={{ title: "GLEF1X ─ blog" }}>
      <div className="mt-8 sm:mt-16 mb-20 mx-0 sm:mx-6 lg:mb-28 lg:mx-8">
        <div className="relative max-w-6xl mx-auto">
          <Blog.Latest blogPost={latestPost} />
          <div className="mt-4 lg:mt-12 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:max-w-none">
            {blogPosts.slice(1).map((blogPost, index) => (
              <Blog.Post key={blogPost.id} blogPost={blogPost} index={index} />
            ))}
          </div>
        </div>
      </div>
    </Layout.Default>
  );
}
