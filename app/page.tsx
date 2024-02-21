import Link from "next/link";
import { getAllPosts } from "@/libs/loader";
import { SiGithub, SiInstagram, SiMailgun } from "react-icons/si";

import { GitHubLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

import { buttonVariants } from "@/components/ui/button";

import Typing from "@/components/typing";
import { ModeToggle } from "@/components/theme-toggle";

export default function Home() {
  const posts = getAllPosts();

  return (
    <>
      <header>
        <div className="flex items-center justify-between py-4">
          <a>
            <span className="text-lg font-bold">minpeter</span>
            <p>software engineer 🕊️</p>
          </a>
          <div className="flex">
            <Link
              href="https://github.com/minpeter"
              className={buttonVariants({ variant: "ghost", size: "icon" })}
            >
              <GitHubLogoIcon className="h-4 w-4" />
            </Link>

            <Link
              href="https://instagram.com/minpeter"
              className={buttonVariants({ variant: "ghost", size: "icon" })}
            >
              <InstagramLogoIcon className="h-4 w-4" />
            </Link>

            <ModeToggle />
          </div>
        </div>
      </header>
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
