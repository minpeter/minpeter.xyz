import { blog } from "@/lib/source";

import { notFound } from "next/navigation";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { DocsBody } from "fumadocs-ui/page";
import NewMetadata from "@/lib/metadata";
import Header from "@/components/header";
import { cn, formatDateLong } from "@/lib/utils";
import Link from "next/link";

import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { Callout } from "fumadocs-ui/components/callout";
import { getI18n } from "@/locales/server";
import { setStaticParamsLocale } from "next-international/server";

export async function generateStaticParams() {
  return blog.generateParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}) {
  const { locale, slug } = await params;
  const page = blog.getPage(slug, locale);
  if (!page) notFound();

  return NewMetadata({
    title: page.data.title,
    description: page.data.description,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}) {
  const { locale, slug } = await params;
  setStaticParamsLocale(locale);
  const t = await getI18n();

  const post = blog.getPage(slug, locale);
  const posts = blog.getPages(locale);

  posts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

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
    <section data-animate>
      <Header
        title={post.data.title}
        description={
          post.data.description === undefined
            ? formatDateLong(post.data.date)
            : post.data.description
        }
        link={{ href: `/blog`, text: t("backToBlog") }}
      />

      <aside className="hidden 2xl:block fixed left-8 top-36 w-72">
        {post.data.toc.length > 0 && (
          <div className="text-sm">
            <nav data-animate>
              {post.data.toc.map((item: any) => (
                <a
                  key={item.url}
                  href={item.url}
                  className={cn(
                    "block my-1",
                    "px-0.5 rounded-md hover:bg-secondary/100 animation:enter w-fit",
                    "py-1 px-2 box-decoration-clone"
                  )}
                  style={{ marginLeft: `${(item.depth - 1) * 1}rem` }}
                >
                  {item.title.props.children}
                </a>
              ))}
            </nav>
          </div>
        )}
      </aside>
      <DocsBody>
        <MDX
          className="mdx"
          components={{ ...defaultMdxComponents, Tab, Tabs, Callout }}
        />
      </DocsBody>

      <section className="mt-32">
        <div className="flex flex-row items-center gap-2 mb-8 text-sm text-muted-foreground">
          <div className="flex gap-2">
            <span>작성일:</span>
            <time dateTime={new Date(post.data.date).toISOString()}>
              {formatDateLong(post.data.date)}
            </time>
          </div>
          {" • "}
          {post.data.lastModified && (
            <div className="flex gap-2">
              <span>수정일:</span>
              <time dateTime={new Date(post.data.lastModified).toISOString()}>
                {formatDateLong(post.data.lastModified)}
              </time>
            </div>
          )}
        </div>

        <hr className="my-8" />
        <div className="flex flex-col justify-center items-center mb-8">
          <h2 className="opacity-60">이전글 / 다음글</h2>
        </div>
        <div className="flex justify-between">
          {postsIndex[post.slugs.join("/")].previous ? (
            <Link
              href={`${postsIndex[post.slugs.join("/")].previous.url}`}
              className="text-primary hover:bg-secondary/100 rounded-md px-2 py-1"
            >
              ← {postsIndex[post.slugs.join("/")].previous.data.title}
            </Link>
          ) : (
            <div></div>
          )}

          {postsIndex[post.slugs.join("/")].next && (
            <Link
              href={`${postsIndex[post.slugs.join("/")].next.url}`}
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
