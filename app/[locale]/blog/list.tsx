"use client";

import Link from "next/link";
import { cn, formatDate, formatYear } from "@/lib/utils";

import { useQueryState, parseAsString } from "nuqs";
import { postMetadataType } from "@/lib/source";
import { Badge } from "@/components/ui/badge";

export function BlogList({
  lang,
  posts,
}: {
  lang: string;
  posts: postMetadataType[];
}) {
  const [query] = useQueryState(
    "q",
    parseAsString.withDefault(lang == "en" ? "(en)" : "")
  );

  return <BlogListFallback posts={posts} query={query} />;
}

export function BlogListFallback({
  posts,
  query,
}: {
  posts: postMetadataType[];
  query: string;
}) {
  const filteredPosts = posts.filter((post: postMetadataType) =>
    post.title?.toLowerCase().includes(query.toLowerCase())
  );
  const yearList = filteredPosts.reduce(
    (acc: Record<string, postMetadataType[]>, post) => {
      const year = formatYear(post.date);

      if (!acc[year]) {
        acc[year] = [];
      }

      acc[year].push(post);
      return acc;
    },
    {}
  );

  const itemSytles =
    "group-hover/year:opacity-100! group-hover/post:bg-secondary/100 group-hover/list:opacity-60 rounded-md";

  return (
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
                <ul data-animate className="space-y-3 w-full">
                  {yearList[year].map((post: postMetadataType) => (
                    <li
                      data-animate
                      key={post.url}
                      className="flex justify-between group/post space-x-4"
                    >
                      <Link href={post.url}>
                        <span
                          className={cn(
                            itemSytles,
                            "inline py-1 px-2 box-decoration-clone"
                          )}
                        >
                          {post.title}
                        </span>
                      </Link>

                      {post.draft ? (
                        <Badge variant="secondary">Draft</Badge>
                      ) : (
                        <div className={cn(itemSytles, "text-nowrap h-fit")}>
                          {formatDate(post.date)}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              }
            </div>
          ))
      )}
    </div>
  );
}
