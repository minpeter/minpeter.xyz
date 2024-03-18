import Link from "next/link";

import { ArrowTopLeftIcon } from "@radix-ui/react-icons";

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
    <header className="mb-10 space-y-1">
      {link ? (
        <div data-animate data-animate-speed="fast">
          <Link
            className="text-sm text-gray-400 underline px-0.5 rounded-md hover:bg-secondary/100 animation:enter"
            href={link.href}
          >
            <ArrowTopLeftIcon className="w-3 h-3 mb-1 mr-0.5 inline" />
            {link.text}
          </Link>
        </div>
      ) : (
        <div className="invisible">.</div>
      )}
      <h1 className=" flex flex-wrap items-center break-all text-bold">
        {title || "minpeter"}
      </h1>
      {description && (
        <p className="text-sm text-gray-400 w-full">{description}</p>
      )}
    </header>
  );
}
