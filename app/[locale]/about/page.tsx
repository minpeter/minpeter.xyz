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

  return (
    <section className="flex flex-col gap-3">
      <Header
        title={t("aboutTitle")}
        description=""
        link={{ href: "/", text: t("backToHome") }}
      />

      <Card>
        <p className="rounded-xl p-4 text-sm whitespace-pre-wrap">
          {t("aboutMe")}
        </p>
      </Card>

      <div
        data-animate
        data-animate-speed="fast"
        // 상위 레이아웃에 넓이 제한이 존재하기 때문에 여기서 넓이 제한은 의미없음
        className="grid lg:grid-cols-2 grid-cols-1 gap-2 w-full"
      >
        <CarouselImage />
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
  );
}
