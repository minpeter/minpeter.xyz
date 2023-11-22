import Button from "@/components/mdx/Button";
import Ip from "@/components/mdx/Ip";

import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { IoChevronBack } from "react-icons/io5";

import { convertPathToAbsolute } from "@/libs/mdx-images-path-fix";
import { getPostById, getAllPosts } from "@/libs/loader";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";
import "@/styles/prism-one-dark.css";
import "@/styles/code-block-custom.css";

const options = {
  mdxOptions: {
    remarkPlugins: [convertPathToAbsolute],
    rehypePlugins: [remarkGfm, rehypePrism],
  },
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    id: post.id,
  }));
}

export async function generateMetadata({ params }: any) {
  const post = await getPostById(params.id);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function Post({ params }: any) {
  const post = await getPostById(params.id);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <article className="prose prose-sm md:prose-base lg:prose-lg prose-slate !prose-invert mx-auto break-words">
      <Link
        href="/"
        className="w-min flex gap-4 mb-4 md:mb-5 cursor-pointer items-center no-underline group hover:text-white text-gray-400 break-normal"
      >
        <IoChevronBack className="h-5 w-5 md:h-6 md:w-6 md:group-hover:scale-110" />
        <p className="md:text-lg block my-0 md:group-hover:scale-110">Home</p>
      </Link>
      <h1 className="flex flex-row font-bold text-3xl sm:text-4xl lg:text-5xl">
        {post.title}
      </h1>
      <div className="py-4">
        <span className="text-gray-400">{post.published}</span>
        <span className="px-2">|</span>
        <span className="text-gray-400">{post.hash}</span>
      </div>

      <MDXRemote
        source={post.content}
        components={{ Button, Ip }}
        options={options}
      />
    </article>
  );
}
