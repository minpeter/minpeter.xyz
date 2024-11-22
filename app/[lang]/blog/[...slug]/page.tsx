import { source } from "@/lib/source";

import { notFound } from "next/navigation";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { DocsBody } from "fumadocs-ui/page";
import NewMetadata from "@/lib/metadata";
import Header from "@/components/header";
import { formatDateLong } from "@/lib/utils";
import Link from "next/link";

import { Tab, Tabs } from "fumadocs-ui/components/tabs";

export default async function Page(props: {
  params: Promise<{ slug: string[] }>;
}) {
  const params = await props.params;
  const post = source.getPage(params.slug);
  const posts = source.getPages();

  if (!post) notFound();

  const MDX = post.data.body;

  const postsIndex = posts.reduce((acc: any, post, index) => {
    acc[post.slugs.join("/")] = {
      ...post,
      previous: posts[index - 1] || null,
      next: posts[index + 1] || null,
    };
    return acc;
  }, {});

  return (
    <section>
      <Header
        title={post.data.title}
        description={
          post.data.description === undefined
            ? formatDateLong(post.data.date)
            : post.data.description
        }
        link={{ href: "/blog", text: "글 목록으로" }}
      />

      <DocsBody>
        <MDX
          data-animate
          data-animate-speed="fast"
          className="mdx"
          components={{ ...defaultMdxComponents, Tab, Tabs }}
        />
      </DocsBody>

      <section className="mt-32">
        <hr className="my-8" />
        <div className="flex flex-col justify-center items-center mb-8">
          <h2 className="opacity-60">이전글 / 다음글</h2>
        </div>
        <div className="flex justify-between">
          {postsIndex[post.slugs.join("/")].previous ? (
            <Link
              href={postsIndex[post.slugs.join("/")].previous.url}
              className="text-primary hover:bg-secondary/100 rounded-md px-2 py-1"
            >
              ← {postsIndex[post.slugs.join("/")].previous.data.title}
            </Link>
          ) : (
            <div></div>
          )}

          {postsIndex[post.slugs.join("/")].next && (
            <Link
              href={postsIndex[post.slugs.join("/")].next.url}
              className="text-primary hover:bg-secondary/100 rounded-md px-2 py-1"
            >
              {postsIndex[post.slugs.join("/")].next.data.title} →
            </Link>
          )}
        </div>
      </section>
    </section>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return NewMetadata({
    title: page.data.title,
    description: page.data.description,
  });
}
