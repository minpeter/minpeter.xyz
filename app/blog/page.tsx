import Link from "next/link";
import { getAllPosts } from "@/lib/loader";
import Header from "@/components/header";
import { formatDate, formatYear } from "@/lib/utils";

export default function Page() {
  const posts = getAllPosts();

  const itemSytles =
    "rounded-md group-hover/post:bg-secondary/100 group-hover/post:!opacity-100 group-hover/list:opacity-60";

  const yearList = posts.reduce((acc: any, post) => {
    const year = formatYear(post.frontmatter.date);
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {});

  return (
    <section>
      <Header title="블로그" description="블로그 글 목록" />
      <div className="group/list">
        {yearList &&
          Object.keys(yearList)
            .reverse()
            .map((year) => (
              <div
                key={year}
                className="group/year flex border-t last-of-type:border-b border-gray-200 py-8"
              >
                <div className="w-24">
                  <h2 className="w-fit px-2 rounded-md group-hover/year:bg-secondary/100 group-hover/year:!opacity-100">
                    {year}
                  </h2>
                </div>
                {
                  <ul className="space-y-2 w-full">
                    {yearList[year].map((post: any) => (
                      <li
                        key={post.id}
                        className="flex justify-between group/post"
                      >
                        <Link href={`/blog/${post.id}`} className={itemSytles}>
                          {post.frontmatter.title}
                        </Link>

                        <time
                          dateTime={post.frontmatter.date}
                          className={itemSytles}
                        >
                          {formatDate(post.frontmatter.date)}
                        </time>
                      </li>
                    ))}
                  </ul>
                }
              </div>
            ))}
      </div>
    </section>
  );
}
