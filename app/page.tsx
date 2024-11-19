import Header from "@/components/header";
import { CookieIcon, TransformIcon } from "@radix-ui/react-icons";
import { CodeIcon, KeyboardIcon } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  return (
    <section className="flex flex-col gap-3">
      <Header description="이 웹에서 가장 멋진 사이트가 될거야~" />

      <div
        data-animate
        data-animate-speed="fast"
        className="flex flex-col items-center gap-4 w-full max-w-xl mx-auto"
      >
        {[
          {
            href: "/blog",
            text: "개발 이야기와 일상을 기록하는 공간",
            icon: <CookieIcon className="w-5 h-5" />,
          },
          {
            href: "/typing",
            text: "타이핑 연습하기",
            icon: <KeyboardIcon className="w-5 h-5" />,
            external: true,
          },
          {
            href: "https://ip.minpeter.xyz/",
            text: "IP 주소 확인 도구",
            icon: <CodeIcon className="w-5 h-5" />,
            external: true,
          },
          {
            href: "/show",
            text: "프로젝트 쇼케이스",
            icon: <TransformIcon className="w-5 h-5" />,
          },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            className="w-full p-4 bg-white/5 rounded-lg flex items-center justify-between
                     hover:bg-white/10 transition-colors duration-200"
          >
            <span>{item.text}</span>
            {item.icon}
          </Link>
        ))}
      </div>
    </section>
  );
}
