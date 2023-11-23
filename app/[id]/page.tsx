import Link from "next/link";

import { memoizeGetPostById, getAllPosts } from "@/libs/loader";

import "@/styles/prism-one-dark.css";
import "@/styles/code-block-custom.css";

import PostContent from "./post";

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    id: post.id,
  }));
}

export async function generateMetadata({ params }: any) {
  const post = await memoizeGetPostById(params.id);

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
  const post = await memoizeGetPostById(params.id);

  return (
    <article className="prose prose-sm md:prose-base lg:prose-lg prose-slate !prose-invert mx-auto break-words">
      {!post ? (
        <>
          <h1 className="flex flex-row font-bold text-3xl sm:text-4xl lg:text-5xl">
            404 :/
          </h1>

          <p>존재하지 않는 페이지입니다.</p>
          <p>다른 글을 읽어보시는건 어떨까요?</p>
          <Link href="/">
            <button className="bg-gray-800 text-white px-4 py-2 rounded-md mt-4">
              홈으로
            </button>
          </Link>
        </>
      ) : (
        <>
          <h1 className="flex flex-row font-bold text-3xl sm:text-4xl lg:text-5xl">
            {post.frontmatter.title}
          </h1>
          <div className="py-4">
            <span className="text-gray-400">{post.published}</span>
            <span className="px-2">|</span>
            <span className="text-gray-400">{post.hash}</span>
          </div>

          {post.content && <PostContent code={post.content} />}
        </>
      )}
    </article>
  );
}
