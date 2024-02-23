"use client";

import { Playground } from "@/components/animated-stack";

import mainImage from "@/assets/images/main-image.png";

import Image from "next/image";

import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  const [grayscale, setGrayscale] = useState("grayscale(1)");
  return (
    <>
      <main className="flex flex-col space-y-2">
        <section className="py-5 flex flex-col gap-3">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            안녕하세요, 민웅기입니다 :{")"}
          </h4>
          <div className="flex gap-5 sm:flex-row flex-col">
            <div className="flex flex-col gap-5">
              <Card>
                <p className="rounded-xl p-4 text-sm">
                  현재는 프론트엔드 개발자로 일하고 있습니다.
                  <br />
                  프론트엔드 개발자로서 빠르게 변화하는 기술을 배우고 적용하는
                  것을 즐깁니다.
                  <br />
                  또한, 사용자 경험을 중요시하며 사용자에게 최고의 경험을
                  제공하기 위해 노력합니다.
                </p>
              </Card>

              <Playground w={500} h={200} className="block sm:hidden" />

              <Image
                src={mainImage}
                alt="main"
                style={{ filter: grayscale, transition: "filter 1s" }}
                className="rounded-xl"
                onMouseEnter={() => setGrayscale("grayscale(0)")}
                onMouseLeave={() => setGrayscale("grayscale(70%)")}
              />
            </div>
            <Playground w={300} h={400} className="hidden sm:block" />
          </div>
        </section>
      </main>
    </>
  );
}
