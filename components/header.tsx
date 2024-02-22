"use client";
import { useToast } from "@/components/ui/use-toast";

import Link from "next/link";

import { GitHubLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons";

import { buttonVariants } from "@/components/ui/button";

import { ModeToggle } from "@/components/theme-toggle";

import AnimatedName from "./animated-name";

export default function Header() {
  const { toast } = useToast();

  return (
    <header>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4">
        <Link href="/" className="flex flex-col gap-3">
          <AnimatedName name="minpeter - 민웅기" />
          <p>software engineer 🕊️</p>
        </Link>
        <div className="flex flex-col justify-end items-end">
          <div className="flex mr-[-0.7rem]">
            <Link
              href="https://github.com/minpeter"
              target="_blank"
              className={buttonVariants({ variant: "ghost", size: "icon" })}
            >
              <GitHubLogoIcon className="h-4 w-4" />
            </Link>

            <Link
              href="https://instagram.com/minpeter2"
              target="_blank"
              className={buttonVariants({ variant: "ghost", size: "icon" })}
            >
              <InstagramLogoIcon className="h-4 w-4" />
            </Link>

            <ModeToggle />
          </div>
          <div className="flex gap-4">
            <Link href="/work">work</Link>
            <Link href="/blog">blog</Link>
            <div
              onClick={() =>
                toast({
                  title: "Coming soon",
                  description: "This feature is not available yet",
                })
              }
            >
              guestbook
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
