"use client";

import mainImage1 from "@/assets/images/main-image-1.jpg";
import mainImage2 from "@/assets/images/main-image-2.png";
import mainImage3 from "@/assets/images/main-image-3.png";

import { AspectRatio } from "@/components/ui/aspect-ratio";

import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { useState } from "react";

import { Card } from "@/components/ui/card";
import Header from "@/components/header";
import { useI18n } from "@/lib/locales/client";

export default function Page() {
  const t = useI18n();

  const [grayscale, setGrayscale] = useState("grayscale(1)");
  return (
    <section className="flex flex-col gap-3">
      <Header
        title="안녕하세요, 민웅기입니다 :)"
        description=""
        link={{ href: "/", text: t("backToHome") }}
      />

      <Card>
        <p className="rounded-xl p-4 text-sm">
          현재는 프론트엔드 개발자로 일하고 있습니다.
          <br />
          프론트엔드 개발자로서 빠르게 변화하는 기술을 배우고 적용하는 것을
          즐깁니다.
          <br />
          또한, 사용자 경험을 중요시하며 사용자에게 최고의 경험을 제공하기 위해
          노력합니다.
        </p>
      </Card>
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
                      ? mainImage2
                      : mainImage3
                  }
                  alt="main"
                  style={{
                    filter: grayscale,
                    transition: "filter 1s",
                  }}
                  onMouseEnter={() => setGrayscale("grayscale(0)")}
                  onMouseLeave={() => setGrayscale("grayscale(70%)")}
                  onTouchEnd={() => setGrayscale("grayscale(70%)")}
                />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
