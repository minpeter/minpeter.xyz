import Button from "@/components/mdx/Button";

import { MDXRemote } from "next-mdx-remote/rsc";

import { convertPathToAbsolute } from "@/libs/mdx-images-path-fix";
import { getPostById, getAllPosts } from "@/libs/loader";

const options = {
  mdxOptions: {
    remarkPlugins: [convertPathToAbsolute],
    rehypePlugins: [],
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
    <article className="prose prose-sm md:prose-base lg:prose-lg prose-slate !prose-invert mx-auto">
      <h1 className="text-5xl font-bold">{post.title}</h1>

      <MDXRemote
        source={post.content}
        components={{ Button }}
        options={options}
      />
    </article>
  );
}
