import Header from "@/components/header";
import { CookieIcon, TransformIcon } from "@radix-ui/react-icons";
import { CodeIcon } from "lucide-react";
import { getAllPosts } from "@/lib/loader";
import Link from "next/link";

import dynamic from "next/dynamic";

const Scene = dynamic(() => import("@/components/Scene"), {
  ssr: false,

  // w-full, 150px 검은색 박스
  loading: () => (
    <div className="w-full h-[150px] animate-pulse flex items-center justify-center">
      pokemon 108 (Lickitung) 로딩중..
    </div>
  ),
});

export default async function Page() {
  const posts = await getAllPosts();
  return (
    <section className="flex flex-col gap-3">
      <Header description="이 웹에서 가장 멋진 사이트가 될거야~" />
      <Scene />
      <div
        data-animate
        data-animate-speed="fast"
        // flex row지만 overflow시 하나씩 내려가게
        className="flex flex-wrap gap-4 overflow-hidden"
      >
        <Link href="/blog" className="underline">
          내가 만든 블로그, 너를 위해 써봤지
          <CookieIcon className="w-4 h-4 inline-block ml-1.5" />
        </Link>
        <Link href="/show" className="underline">
          우리 집에만 있지 보러 와
          <TransformIcon className="w-4 h-4 inline-block ml-1.5" />
        </Link>
        <Link
          href="https://ip.minpeter.tech/"
          target="_blank"
          className="underline"
        >
          시간은 없어도 IP 주소는 있어
          <CodeIcon className="w-4 h-4 inline-block ml-1.5" />
        </Link>
      </div>

      <div className="hidden">
        <p>최근 블로그 게시글</p>
        {
          <ol>
            {posts.slice(0, 5).map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`}>
                  <p>{post.frontmatter.title}</p>
                </Link>
              </li>
            ))}
          </ol>
        }
      </div>
    </section>
  );
}
