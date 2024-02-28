"use client";

import { Playground } from "@/components/animated-stack";

import { AspectRatio } from "@/components/ui/aspect-ratio";

import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { useState } from "react";

import { Card } from "@/components/ui/card";

const mainImages = ["main-image-1.jpg", "main-image-2.png", "main-image-3.png"];

export default function Page() {
  const [grayscale, setGrayscale] = useState("grayscale(1)");
  return (
    <section className="flex flex-col gap-3">
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        안녕하세요, 민웅기입니다 :{")"}
      </h4>
      <div className="flex gap-5 sm:flex-row flex-col">
        <div className="flex flex-col gap-5">
          <Card>
            <p className="rounded-xl p-4 text-sm">
              현재는 프론트엔드 개발자로 일하고 있습니다.
              <br />
              프론트엔드 개발자로서 빠르게 변화하는 기술을 배우고 적용하는 것을
              즐깁니다.
              <br />
              또한, 사용자 경험을 중요시하며 사용자에게 최고의 경험을 제공하기
              위해 노력합니다.
            </p>
          </Card>

          <Playground w={500} h={200} className="block sm:hidden" />

          <Carousel>
            <CarouselContent>
              {Array.from({ length: 3 }).map((_, index) => (
                <CarouselItem key={index}>
                  <AspectRatio ratio={5 / 5}>
                    <Image
                      fill
                      className="rounded-xl object-cover border shadow-sm"
                      placeholder="blur"
                      quality={5}
                      src={require(`@/assets/images/${mainImages[index]}`)}
                      alt="main"
                      style={{
                        filter: grayscale,
                        transition: "filter 0.4s",
                      }}
                      onMouseEnter={() => setGrayscale("grayscale(0)")}
                      onMouseLeave={() => setGrayscale("grayscale(1)")}
                      onTouchEnd={() => setGrayscale("grayscale(1)")}
                    />
                  </AspectRatio>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        <Playground w={300} h={440} className="hidden sm:block" />
      </div>
    </section>
  );
}
