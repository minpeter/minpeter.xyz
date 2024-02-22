import Link from "next/link";
import { getAllPosts } from "@/lib/loader";

export default function Page() {
  const posts = getAllPosts();

  return (
    <section className="py-5">
      {posts.map((blog) => (
        <Link href={"/blog/" + blog.id} key={blog.id}>
          <div className="pb-4 gap-2">
            <h3 className="text-lg font-bold">{blog.frontmatter.title}</h3>
            <p className="text-gray-400 ">{blog.frontmatter.description}</p>
          </div>
        </Link>
      ))}
    </section>
  );
}
