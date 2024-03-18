import Link from "next/link";

import { ModeToggle } from "@/components/theme-toggle";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";

type HeaderProps = {
  title?: string;
  description?: string;
  link?: {
    href: string;
    text: string;
  };
};

export default function Header({ title, description, link }: HeaderProps) {
  return (
    <header className={"mb-10"}>
      <div className="flex items-start justify-between space-x-2">
        <h1 className=" flex flex-wrap items-center">
          <p className="text-bold mr-1 break-all">{title || "minpeter"}</p>
          <div>
            {title !== undefined && (
              <>
                <span className="text-sm text-gray-400">by</span>
                <Link
                  className="text-sm text-gray-400 underline px-0.5 rounded-md hover:bg-secondary/100"
                  href={"/"}
                >
                  민웅기
                </Link>
              </>
            )}
            {link && (
              <>
                <span className="text-sm text-gray-400">·</span>
                <Link
                  className="text-sm text-gray-400 underline px-0.5 rounded-md hover:bg-secondary/100"
                  href={link.href}
                >
                  {link.text}
                  <ArrowTopRightIcon className="w-3 h-3 mb-1 ml-0.5 inline" />
                </Link>
              </>
            )}
          </div>
        </h1>
      </div>
      {description && (
        <p className="text-sm text-gray-400 w-full">{description}</p>
      )}
    </header>
  );
}
