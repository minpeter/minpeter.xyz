import Header from "@/components/header";
import {
  CookieIcon,
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
  TransformIcon,
} from "@radix-ui/react-icons";
import { CodeIcon, KeyboardIcon, ExternalLinkIcon } from "lucide-react";
import Link from "next/link";

import Lickitung from "@/components/Lickitung";

export default async function Page() {
  return (
    <section className="flex flex-col gap-3">
      <Header description="이 웹에서 가장 멋진 사이트가 될거야~" />

      <div
        data-animate
        data-animate-speed="fast"
        // 상위 레이아웃에 넓이 제한이 존재하기 때문에 여기서 넓이 제한은 의미없음
        className="grid lg:grid-cols-2 grid-cols-1 gap-2 w-full"
      >
        <Link
          href="/blog"
          className="p-5 bg-white/5 rounded-xl flex flex-col justify-between
               hover:bg-white/10 transition-colors duration-200 h-40 lg:square lg:h-auto"
        >
          <span className="text-lg font-medium">
            개발 이야기와 일상을 기록하는 공간
          </span>
          <CookieIcon className="w-6 h-6" />
        </Link>

        <div className="grid grid-cols-2 gap-2">
          {[
            {
              href: "/typing",
              text: "타이핑 연습하기",
              icon: <KeyboardIcon className="w-4 h-4" />,
            },
            {
              href: "/show",
              text: "프로젝트 쇼케이스",
              icon: <TransformIcon className="w-4 h-4" />,
            },
            {
              href: "https://ip.minpeter.xyz/",
              text: "IP 주소 확인 도구",
              icon: <CodeIcon className="w-4 h-4" />,
              external: true,
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              className="p-3 bg-white/5 rounded-xl flex flex-col relative
                       hover:bg-white/10 transition-colors duration-200 aspect-square"
            >
              <div className="absolute top-3 left-3 flex gap-1.5 items-center">
                {item.icon}
              </div>

              {item.external && (
                <div className="absolute top-3 right-3 flex gap-1.5 items-center">
                  <ExternalLinkIcon className="w-3 h-3" />
                </div>
              )}
              <span className="text-sm self-start mt-auto">{item.text}</span>
            </Link>
          ))}

          <div className="grid grid-cols-3 gap-2">
            {[
              {
                href: "https://github.com/minpeter",
                icon: <GitHubLogoIcon className="w-4 h-4" />,
              },
              {
                href: "https://instagram.com/minpeter2",
                icon: <InstagramLogoIcon className="w-4 h-4" />,
              },
              {
                href: "https://linkedin.com/in/minpeter/",
                icon: <LinkedInLogoIcon className="w-4 h-4" />,
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer noopener"
                className="p-3 bg-white/5 rounded-xl flex justify-center items-center
                 hover:bg-white/10 transition-colors duration-200 aspect-square"
              >
                <div className="flex gap-1.5 items-center">{item.icon}</div>
              </Link>
            ))}

            <div className="col-span-3 ">
              <Lickitung aspect="3/2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
