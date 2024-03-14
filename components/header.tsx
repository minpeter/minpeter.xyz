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
      <div className="flex items-center justify-between space-x-6">
        <h1 className=" space-x-1">
          <span className="text-bold">{title || "minpeter"}</span>
          {title !== undefined && (
            <>
              <span className="text-sm text-gray-300">by</span>
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
              <span className="text-sm text-gray-300">·</span>
              <Link
                className="text-sm text-gray-400 underline px-0.5 rounded-md hover:bg-secondary/100"
                href={link.href}
              >
                {link.text}
                <ArrowTopRightIcon className="w-3 h-3 mb-1 ml-0.5 inline" />
              </Link>
            </>
          )}
        </h1>

        <ModeToggle />
      </div>
      {description && (
        <p className="text-sm text-gray-400 w-9/12">{description}</p>
      )}
    </header>
  );
}
