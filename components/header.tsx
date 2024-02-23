"use client";
import { useToast } from "@/components/ui/use-toast";

import Link from "next/link";

import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";

import { buttonVariants } from "@/components/ui/button";

import { ModeToggle } from "@/components/theme-toggle";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import AnimatedName from "./animated-name";

export default function Header() {
  const { toast } = useToast();

  return (
    <header>
      <div className="flex flex-row items-center justify-between py-4">
        <Link href="/" className="flex flex-col gap-3">
          <AnimatedName name="minpeter - 민웅기" />
          <p>software engineer 🕊️</p>
        </Link>

        {/* mobile navbar */}

        <div className="flex sm:hidden">
          <Link
            href="https://github.com/minpeter"
            target="_blank"
            className={buttonVariants({
              variant: "ghost",
              size: "icon",
            })}
          >
            <GitHubLogoIcon className="h-4 w-4" />
          </Link>

          <Link
            href="https://instagram.com/minpeter2"
            target="_blank"
            className={buttonVariants({
              variant: "ghost",
              size: "icon",
            })}
          >
            <InstagramLogoIcon className="h-4 w-4" />
          </Link>

          <ModeToggle />

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="sm:hidden">
                <HamburgerMenuIcon className="h-6 w-6" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-fit mr-8 sm:hidden">
              <div className="grid gap-4">
                <div className="flex-col justify-end items-end flex">
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
            </PopoverContent>
          </Popover>
        </div>

        {/* desktop navbar */}
        <div className="flex-col justify-end items-end hidden sm:flex">
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
