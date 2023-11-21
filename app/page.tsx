import Link from "next/link";
import { getAllPosts } from "@/libs/loader";
import { SiGithub, SiInstagram, SiMailgun } from "react-icons/si";

export default async function Home() {
  const blogs = await getAllPosts();
  return (
    <main className="flex flex-col">
      <h1 className="text-5xl font-bold">minpeter&apos;s blog</h1>

      <div className="py-4 flex">
        <a
          href="https://github.com/minpeter"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-gray-100"
        >
          <SiGithub className="h-5 w-5 md:group-hover:h-6 group-hover:w-6" />
        </a>
        <span className="px-2">|</span>

        <a
          href="https://www.instagram.com/minpeter2/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-gray-100"
        >
          <SiInstagram className="h-5 w-5 md:group-hover:h-6 group-hover:w-6" />
        </a>
        <span className="px-2">|</span>

        <a
          href="mailto:kali2005611@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-gray-100"
        >
          <SiMailgun className="h-5 w-5 md:group-hover:h-6 group-hover:w-6" />
        </a>

        <span className="px-2">|</span>

        <p className="text-gray-300 flex flex-row">
          Inspired by&nbsp;
          <Link href="https://gaudion.dev" passHref>
            gaudion.dev
          </Link>
        </p>
      </div>

      <section className="py-10">
        <div className="py-2">
          {blogs.map((blog) => (
            <Link href={"/" + blog.id} passHref key={blog.id}>
              <div className="py-2 gap-2">
                <h3 className="text-lg font-bold">{blog.title}</h3>
                <p className="text-gray-400 ">{blog.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
