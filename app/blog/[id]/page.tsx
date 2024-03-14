import { getPostById, getAllPosts } from "@/lib/loader";

import "@/styles/code-block-custom.css";

import PostContent from "./post";
import Header from "@/components/header";
import { link } from "fs";
import { formatDateLong } from "@/lib/utils";

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    id: post.id,
  }));
}

export async function generateMetadata({ params }: any) {
  const post = await getPostById(params.id);

  if (!post) {
    return {
      title: "404",
      description: "Not found :/",
    };
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
  };
}

export default async function Post({ params }: any) {
  const post = await getPostById(params.id);

  return (
    <section>
      {!post ? (
        <>
          <Header
            title="404"
            description="page not found :/"
            link={{ href: "/blog", text: "글 목록으로" }}
          />
        </>
      ) : (
        <>
          <Header
            title={post.frontmatter.title}
            description={
              post.frontmatter.description === undefined
                ? formatDateLong(post.frontmatter.date)
                : post.frontmatter.description
            }
            link={{ href: "/blog", text: "글 목록으로" }}
          />

          <article data-animate data-animate-speed="fast" className="mdx">
            {post.content && <PostContent code={post.content} />}
          </article>
        </>
      )}
    </section>
  );
}
