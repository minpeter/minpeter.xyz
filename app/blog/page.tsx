import Link from "next/link";
import { getAllPosts } from "@/lib/loader";

export default function Page() {
  const posts = getAllPosts();

  return (
    <section>
      {posts.map((blog) => (
        <Link href={"/blog/" + blog.id} key={blog.id}>
          <div className="pb-4 gap-2">
            <h3 className="font-bold">{blog.frontmatter.title}</h3>
            <p className="text-gray-400 text-sm">
              {blog.frontmatter.description} - {blog.published}
            </p>
          </div>
        </Link>
      ))}
    </section>
  );
}
