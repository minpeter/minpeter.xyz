import Link from "next/link";
import { getAllPosts } from "@/lib/loader";

import Header from "@/components/header";

export default function Home() {
  const posts = getAllPosts();

  return (
    <>
      <Header />
      <main className="flex flex-col space-y-2">
        <section className="py-5">
          <div className="py-2">
            {posts.map((blog) => (
              <Link href={"/" + blog.id} key={blog.id}>
                <div className="py-2 gap-2">
                  <h3 className="text-lg font-bold">
                    {blog.frontmatter.title}
                  </h3>
                  <p className="text-gray-400 ">
                    {blog.frontmatter.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
