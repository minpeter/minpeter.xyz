"use client";

import Link from "next/link";
import { cn, formatDate, formatYear } from "@/lib/utils";

import { useQueryState, parseAsString } from "nuqs";
import { source } from "@/lib/source";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Header from "@/components/header";
import { Suspense } from "react";

export type getPagesReturnType = ReturnType<typeof source.getPages>;
export type postType = getPagesReturnType[number];

export default function Page() {
  return (
    <section>
      <Header
        title="민웅기의 개발 노트"
        description="내가 만든 블로그, 너를 위해 써봤지"
        link={{ href: "/", text: "홈으로" }}
      />
      <Suspense>
        <BlogList />
      </Suspense>
    </section>
  );
}

function BlogList() {
  const posts = source.getPages();

  const [query, setQuery] = useQueryState("q", parseAsString.withDefault(""));

  const searchIn = (text?: string) =>
    text?.toLowerCase().includes(query.toLowerCase());

  const filteredPosts = posts.filter((post: any) => searchIn(post.data.title));

  const yearList = filteredPosts.reduce((acc: any, post) => {
    const year = formatYear(post.data.date);

    if (!acc[year]) {
      acc[year] = [];
    }

    acc[year].push(post);
    return acc;
  }, {});

  const itemSytles =
    "group-hover/year:!opacity-100 group-hover/post:bg-secondary/100 group-hover/list:opacity-60 rounded-md";

  return (
    <>
      <div className="relative flex flex-1 flex-shrink-0">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          className="w-full rounded-md border focus:outline-none py-[9px] pl-10 text-sm outline-none placeholder:text-gray-500"
          placeholder="Search blog posts..."
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
      </div>

      <div data-animate data-animate-speed="slow" className="group/list">
        {posts.length === 0 ? (
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
                    {yearList[year].map((post: postType) => (
                      <li
                        key={post.slugs.join("/")}
                        className="flex justify-between group/post space-x-4"
                      >
                        <Link href={post.url}>
                          <span
                            className={cn(
                              itemSytles,
                              "inline py-1 px-2 box-decoration-clone"
                            )}
                          >
                            {post.data.title}
                          </span>
                        </Link>

                        <div className={cn(itemSytles, "text-nowrap h-fit")}>
                          {formatDate(post.data.date)}
                        </div>
                      </li>
                    ))}
                  </ul>
                }
              </div>
            ))
        )}
      </div>
    </>
  );
}
