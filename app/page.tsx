import Link from "next/link";
import { getAllPosts } from "@/libs/loader";
export default async function Home() {
  const blogs = await getAllPosts();
  return (
    <main className="flex flex-col">
      <h1 className="text-5xl font-bold">minpeter&apos;s blog</h1>

      <section className="py-10">
        <div className="py-2">
          {blogs.map((blog) => (
            <Link href={"/" + blog.id} passHref key={blog.id}>
              <div className="py-2 flex justify-between align-middle gap-2">
                <div>
                  <h3 className="text-lg font-bold">{blog.title}</h3>
                  <p className="text-gray-400">{blog.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
