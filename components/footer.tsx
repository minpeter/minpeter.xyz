import { ModeToggle } from "./theme-toggle";
import Link from "next/link";
import { ArrowTopRightIcon, CodeIcon } from "@radix-ui/react-icons";

export default function Footer() {
  return (
    <footer className="mt-10 gap-1 flex justify-between border-t items-center py-1 px-4">
      <div />
      <p className="text-sm text-gray-400">
        written by{" "}
        <Link
          className="text-sm text-gray-400 underline px-0.5 rounded-md hover:bg-secondary/100"
          href="/"
        >
          minpeter
          <ArrowTopRightIcon className="w-3 h-3 mb-1 ml-0.5 inline" />
        </Link>
      </p>
      <ModeToggle />
    </footer>
  );
}
