import { ModeToggle } from "./theme-toggle";
import Link from "next/link";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import purplePikmin from "@/public/purple-pikmin-carrying-fruit.webp";

export default function Footer() {
  return (
    <footer className="mt-10 gap-1 flex justify-between border-t items-center py-1 px-4">
      <Image
        src={purplePikmin}
        alt="Purple Pikmin carrying fruit "
        width={32}
        height={32}
      />
      <p className="text-sm text-gray-400">
        written by{" "}
        <Link
          className="text-sm text-gray-400 underline px-0.5 rounded-md hover:bg-secondary/100"
          href="/about"
        >
          minpeter
          <ArrowTopRightIcon className="w-3 h-3 mb-1 ml-0.5 inline" />
        </Link>
      </p>
      <ModeToggle />
    </footer>
  );
}
