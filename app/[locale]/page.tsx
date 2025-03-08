"use client";

import mainImage1 from "@/public/assets/images/main-image-1.jpg";
import mainImage2 from "@/public/assets/images/main-image-2.png";
import mainImage3 from "@/public/assets/images/main-image-3.png";

import { AspectRatio } from "@/components/ui/aspect-ratio";

import Image from "next/image";

import { useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { useI18n } from "@/locales/client";

import Header from "@/components/header";
import {
  CookieIcon,
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
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

            <div className="gap-2">
              <CarouselImage />
            </div>

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

              <Link className="col-span-3" href={"/show"}>
                <Lickitung aspect="3/2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CarouselImage() {
  const [grayscale, setGrayscale] = useState("grayscale(1)");

  return (
    <Carousel>
      <CarouselContent>
        {Array.from({ length: 3 }).map((_, index) => (
          <CarouselItem key={index}>
            <AspectRatio ratio={5 / 5}>
              <Image
                fill
                className="rounded-lg object-cover"
                src={
                  index === 0
                    ? mainImage1
                    : index === 1
                    ? mainImage3
                    : mainImage2
                }
                alt="main"
                style={{
                  filter: grayscale,
                  transition: "filter 1s",
                }}
                onMouseEnter={() => setGrayscale("grayscale(0)")}
                onMouseLeave={() => setGrayscale("grayscale(70%)")}
                onTouchEnd={() => setGrayscale("grayscale(70%)")}
                onClick={() => {
                  if (index === 0) {
                    window.open("https://youtu.be/n_R0-YosZ3g?t=39");
                  } else if (index === 2) {
                    window.open(
                      "/73e3da8fa7a397e7b1bc36efabb2cbb265524a75d7d5e6d1620b9e10e694257"
                    );
                  }
                }}
              />
            </AspectRatio>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
