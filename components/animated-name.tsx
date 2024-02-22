"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ{}</>민쾹あ쵭ゆさつ퀴なまく뤱ふ";

// original source: https://github.com/wiscaksono/wiscaksono-site/blob/master/src/components/molecules/animated-name.tsx
// license: on github.com/wiscaksono/wiscaksono-site
export default function AnimatedName({ name }: { name: string }) {
  const [text, setText] = useState(name);
  const [intervalId] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const ref = useRef<HTMLHeadingElement | null>(null);

  const handleMouseOver = useCallback(() => {
    if (isAnimating) return;

    let iteration = 0;

    if (intervalId !== null) {
      clearTimeout(intervalId);
    }

    const animate = () => {
      setIsAnimating(true);
      setText((prevText) =>
        prevText
          .split("")
          .map((_, index) => {
            if (index < iteration) {
              return text[index];
            }
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("")
      );

      if (iteration < text.length) {
        iteration += 1 / 3;
        setTimeout(animate, 30);
      } else {
        setIsAnimating(false);
      }
    };

    animate();
  }, [intervalId, isAnimating, text]);

  useEffect(() => {
    const currentRef = ref.current;

    if (currentRef) {
      currentRef.addEventListener("mouseover", handleMouseOver);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("mouseover", handleMouseOver);
      }
    };
  }, [handleMouseOver, ref]);

  return (
    <span ref={ref} className="text-lg font-bold">
      {text}
    </span>
  );
}
