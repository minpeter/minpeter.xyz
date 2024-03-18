import Header from "@/components/header";
import { CommitIcon, CookieIcon } from "@radix-ui/react-icons";
import { CodeIcon } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <Header description="이 웹에서 가장 멋진 사이트가 될거야~" />
      <div
        data-animate
        data-animate-speed="fast"
        className="flex flex-col gap-2"
      >
        <Link href="/blog" className="underline">
          내가 만든 블로그, 너를 위해 써봤지
          <CookieIcon className="w-4 h-4 inline-block ml-1.5" />
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
    </section>
  );
}
