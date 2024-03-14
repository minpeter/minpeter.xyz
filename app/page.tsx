import Header from "@/components/header";
import { CookieIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <Header description="이 웹에서 가장 멋진 사이트가 될거야~" />

      <Link href="/blog" className="underline">
        내가 만든 블로그, 너를 위해 써봤지
        <CookieIcon className="w-4 h-4 inline-block ml-1.5" />
      </Link>
    </section>
  );
}
