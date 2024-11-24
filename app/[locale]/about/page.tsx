"use client";

import mainImage1 from "@/assets/images/main-image-1.jpg";
import mainImage2 from "@/assets/images/main-image-2.png";
import mainImage3 from "@/assets/images/main-image-3.png";
import redPikmin from "@/assets/images/red-pikmin.webp";

import { AspectRatio } from "@/components/ui/aspect-ratio";

import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { useEffect, useState } from "react";

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
        data-animate-speed="slow"
        className="grid lg:grid-cols-2 grid-cols-1 gap-2 w-full"
      >
        <CarouselImage />

        <div className="flex flex-col justify-between m-4">
          <Countdown />
        </div>
      </div>

      <div className="mt-4">
        내루미가 뭔지 아시나요?
        <br />
        포켓몬 전국 0108번, ベロリンガ(베로링가) 혹은 Lickitung
        <br />
        상당히 귀여우니 꼭 찾아보세요.
        <br />
        <br />
        자메품으로 나메코와 피크민도 귀엽습니다.
      </div>

      <Image
        src={redPikmin}
        alt="red cute pikmin for you"
        width={40}
        height={73.33}
      />
    </section>
  );
}

function Countdown() {
  interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }

  const calculateTimeLeft = (): TimeLeft => {
    const difference =
      +new Date(`01/01/${new Date().getFullYear() + 1}`) - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="rounded-xl p-4 text-sm whitespace-pre-wrap">
      {Object.keys(timeLeft).length ? (
        <>
          {timeLeft.days}일 {timeLeft.hours}시간 {timeLeft.minutes}분{" "}
          {timeLeft.seconds}초
        </>
      ) : (
        "Happy New Year!"
      )}
    </div>
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
