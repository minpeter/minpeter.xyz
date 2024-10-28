import Link from "next/link";

import { ArrowTopLeftIcon } from "@radix-ui/react-icons";

export function Backlink({
  text = "plz input text props",
  href = "/",
}: {
  text: string;
  href: string;
}) {
  return (
    <Link
      className="text-sm text-gray-400 underline px-0.5 rounded-md hover:bg-secondary/100 animation:enter w-fit"
      href={href}
    >
      <ArrowTopLeftIcon className="w-3 h-3 mb-1 mr-0.5 inline" />
      {text}
    </Link>
  );
}
