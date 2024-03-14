import Link from "next/link";

import { ModeToggle } from "@/components/theme-toggle";

type HeaderProps = {
  title?: string;
  description?: string;
  back?: boolean;
};

export default function Header({ title, description }: HeaderProps) {
  return (
    <header className={"mb-10"}>
      <div className="flex items-center justify-between">
        <h1 className=" space-x-1">
          <span className="text-bold">{title || "minpeter"}</span>

          {title !== undefined && (
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
      {description && (
        <p className="text-sm text-gray-400 w-9/12">{description}</p>
      )}
    </header>
  );
}
