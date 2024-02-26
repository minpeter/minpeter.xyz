"use client";
import { useToast } from "@/components/ui/use-toast";

import Link from "next/link";

import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";

import { useTheme } from "next-themes";
import { ModeToggle } from "@/components/theme-toggle";

import { Button } from "@/components/ui/button";

import { SmallSwitch } from "@/components/ui/switch";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import AnimatedName from "./animated-name";

export default function Header() {
  const { toast } = useToast();

  const { theme, setTheme } = useTheme();

  return (
    <header
      className={cn(
        // 스크롤시 고정된 해더
        "sticky top-0 z-50",
        // 해더 컨테이너
        "container flex max-w-2xl flex-col",
        // 아크릴 효과
        "bg-opacity-60 backdrop-filter backdrop-blur-md"
      )}
    >
      <div className="flex flex-row items-center justify-between py-4">
        <Link href="/" className="flex flex-col gap-3">
          <AnimatedName name="minpeter" />
          <p>software engineer 🕊️</p>
        </Link>

        {/* mobile navbar */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="sm:hidden">
              <HamburgerMenuIcon className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href="/work">work</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/blog">blog</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                toast({
                  title: "Coming soon",
                  description: "This feature is not available yet",
                })
              }
            >
              guestbook
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href="https://github.com/minpeter"
                target="_blank"
                className="flex justify-between items-center"
              >
                github
                <GitHubLogoIcon className="h-4 w-4" />
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="https://instagram.com/minpeter2"
                target="_blank"
                className="flex justify-between items-center"
              >
                instagram
                <InstagramLogoIcon className="h-4 w-4" />
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="flex justify-between items-center">
              {theme === "dark" ? "Dark" : "Light"}
              <SmallSwitch
                className="w-8 h-4"
                checked={theme === "light"}
                onCheckedChange={(checked) =>
                  setTheme(checked ? "light" : "dark")
                }
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

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
