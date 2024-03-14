import Link from "next/link";

import { cn } from "@/lib/utils";

import { ModeToggle } from "@/components/theme-toggle";

import AnimatedText from "@/components/animated-text";

type HeaderProps = {
  title?: string;
  description?: string;
  hideNavbar?: boolean;
};

export default function Header({
  title = "minpeter",
  description,
  hideNavbar = false,
}: HeaderProps) {
  return (
    <header
      // className={cn(
      //   // 스크롤시 고정된 해더
      //   "sticky top-0 z-50",
      //   // 해더 컨테이너
      //   "container max-w-2xl",
      //   // 아크릴 효과
      //   "backdrop-filter backdrop-blur-lg"
      // )}

      className={"mb-10"}
    >
      <div className="flex items-center justify-between">
        <h1 className=" space-x-1">
          <span className="text-bold">{title}</span>

          {title !== "minpeter" && (
            <>
              <span className="text-sm text-gray-200">by</span>
              <Link
                className="text-sm text-gray-400 underline px-0.5 rounded-md hover:bg-secondary/100"
                href="/"
              >
                민웅기
              </Link>
            </>
          )}
        </h1>

        <ModeToggle />
      </div>

      {description && <p className="text-sm text-gray-400">{description}</p>}
    </header>
  );
}
