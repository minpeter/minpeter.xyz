import Link from "next/link";
import { getAllPosts } from "@/lib/loader";
import Header from "@/components/header";
import { cn, formatDate, formatYear } from "@/lib/utils";
import NewMetadata from "@/lib/metadata";
import Search from "@/components/search";
import { Suspense } from "react";

export const metadata = NewMetadata({
  title: "minpeter | blog",
  description: "내가 만든 블로그, 너를 위해 써봤지",
});

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || "";

  const posts = await getAllPosts();

  const filteredPosts = posts.filter((post: any) =>
    post.frontmatter.title.toLowerCase().includes(query.toLowerCase())
  );

  const yearList = filteredPosts.reduce((acc: any, post) => {
    const year = formatYear(post.frontmatter.date);
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {});

  const itemSytles =
    "group-hover/year:!opacity-100 group-hover/post:bg-secondary/100 group-hover/list:opacity-60 rounded-md";

  return (
    <section>
      <Header
        title="민웅기의 개발 노트"
        description="내가 만든 블로그, 너를 위해 써봤지"
        link={{ href: "/", text: "홈으로" }}
      />

      <Search placeholder="Search blog posts..." />
      <Suspense key={query} fallback={<i>loading..</i>}>
        <div data-animate data-animate-speed="slow" className="group/list">
          {filteredPosts.length === 0 ? (
            <div className="py-8 text-center">
              <p>검색 결과가 없습니다 :/</p>
            </div>
          ) : (
            Object.keys(yearList)
              .reverse()
              .map((year) => (
                <div
                  key={year}
                  className="group/year flex flex-col sm:flex-row gap-2 border-t last-of-type:border-b py-8"
                >
                  <div className="w-24">
                    <h2 className="w-fit px-2 rounded-md opacity-60 group-hover/year:bg-secondary/100">
                      {year}
                    </h2>
                  </div>
                  {
                    <ul
                      data-animate
                      data-animate-speed="fast"
                      className="space-y-3 w-full"
                    >
                      {yearList[year].map((post: any) => (
                        <li
                          key={post.hash}
                          className="flex justify-between group/post space-x-4"
                        >
                          <Link href={`/blog/${post.slug}`}>
                            <span
                              className={cn(
                                itemSytles,
                                "inline py-1 px-2 box-decoration-clone"
                              )}
                            >
                              {post.frontmatter.title}
                            </span>
                          </Link>

                          <time
                            dateTime={post.frontmatter.date}
                            className={cn(itemSytles, "text-nowrap h-fit")}
                          >
                            {formatDate(post.frontmatter.date)}
                          </time>
                        </li>
                      ))}
                    </ul>
                  }
                </div>
              ))
          )}
        </div>
      </Suspense>
    </section>
  );
}
