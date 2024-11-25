"use client";
import { useI18n } from "@/locales/client";

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

export default function Page() {
  const t = useI18n();

  return (
    <section className="flex flex-col gap-3">
      <Header
        description="written, coded, and designed by minpeter"
        title="minpeter 🇰🇷"
      />
      <div data-animate data-animate-speed="slow">
        <div
          data-animate
          data-animate-speed="slow"
          // 상위 레이아웃에 넓이 제한이 존재하기 때문에 여기서 넓이 제한은 의미없음
          className="grid lg:grid-cols-2 grid-cols-1 gap-2 w-full"
        >
          <Link
            href="/blog"
            className="p-5 dark:bg-white/5 bg-black/5 rounded-xl flex flex-col justify-between
               hover:bg-black/10 dark:hover:bg-white/10 transition-colors duration-200 h-40 lg:square lg:h-auto"
          >
            <span className="text-lg font-medium">{t("blogTitle")}</span>
            <CookieIcon className="w-6 h-6" />
          </Link>

          <div className="grid grid-cols-2 gap-2">
            {[
              {
                href: "/typing",
                text: t("typingTitle"),
                icon: <KeyboardIcon className="w-4 h-4" />,
              },
              {
                href: "/show",
                text: t("showcaseTitle"),
                icon: <TransformIcon className="w-4 h-4" />,
              },
              {
                href: "https://ip.minpeter.xyz/",
                text: t("ipTitle"),
                icon: <CodeIcon className="w-4 h-4" />,
                external: true,
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                className="p-3 dark:bg-white/5 bg-black/5 rounded-xl flex flex-col relative
                       hover:bg-black/10 dark:hover:bg-white/10 transition-colors duration-200 aspect-square"
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
                  className="p-3 dark:bg-white/5 bg-black/5 rounded-xl flex justify-center items-center
                 hover:bg-black/10 dark:hover:bg-white/10 transition-colors duration-200 aspect-square"
                >
                  <div className="flex gap-1.5 items-center">{item.icon}</div>
                </Link>
              ))}

              <Link className="col-span-3" href={"/about"}>
                <Lickitung aspect="3/2" />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col text-center mt-32">
          {Array.from({ length: 18 }).map((_, index) => (
            <p
              key={index}
              style={{
                backgroundColor: `rgba(0, 0, 0, ${(index + 1) / 18})`,
                color: `rgba(255, 255, 255, ${(index + 1) / 18})`,
                margin: "0 2px",
              }}
            >
              {t("mainText")}
            </p>
          ))}
          <p>{t("subText")}</p>
        </div>
      </div>
    </section>
  );
}
