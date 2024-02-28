import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound({ params }: any) {
  return (
    <>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        404, NOT FOUND :/
      </h2>

      <div className="py-5 flex flex-col gap-4">
        <p>This page doesn{"'"}t exist.</p>
        <Link href="/" className={buttonVariants({ variant: "secondary" })}>
          Go to Home
        </Link>
      </div>
    </>
  );
}
