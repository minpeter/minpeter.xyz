import { getAllPosts, getPostBySlug, getPostPHS } from "@/lib/loader";

import PostContent from "./post";
import Header from "@/components/header";
import { formatDateLong } from "@/lib/utils";

import NewMetadata from "@/lib/metadata";

export async function generateStaticParams() {
  const phs = await getPostPHS();
  return phs.map((phs) => ({
    slug: phs.slug,
  }));
}

export async function generateMetadata({ params }: any) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return NewMetadata({
      title: "minpeter | 404",
      description: "Not found :/",
    });
  }

  return NewMetadata({
    title: `minpeter | ${post.frontmatter.title}`,
    description: post.frontmatter.description,
  });
}

export default async function Post({ params }: any) {
  const post = await getPostBySlug(params.slug);

  const posts = await getAllPosts();

  const postsIndex = posts.reduce((acc: any, post, index) => {
    acc[post.slug] = {
      ...post,
      previous: posts[index - 1] || null,
      next: posts[index + 1] || null,
    };
    return acc;
  }, {});

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

          {/* 이전글 이후글 */}
          <section className="mt-32">
            <hr className="my-8" />
            <div className="flex flex-col justify-center items-center mb-8">
              <h2 className="opacity-60">이전글 / 다음글</h2>
            </div>
            <div className="flex justify-between">
              {postsIndex[post.slug].previous ? (
                <a
                  href={`/blog/${postsIndex[post.slug].previous.slug}`}
                  className="text-primary hover:bg-secondary/100 rounded-md px-2 py-1"
                >
                  ← {postsIndex[post.slug].previous.frontmatter.title}
                </a>
              ) : (
                <div></div>
              )}

              {postsIndex[post.slug].next && (
                <a
                  href={`/blog/${postsIndex[post.slug].next.slug}`}
                  className="text-primary hover:bg-secondary/100 rounded-md px-2 py-1"
                >
                  {postsIndex[post.slug].next.frontmatter.title} →
                </a>
              )}
            </div>
          </section>
        </>
      )}
    </section>
  );
}
