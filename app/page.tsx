import Header from "@/components/header";
import Link from "next/link";

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <Header description="민웅기가 가장 신경 쓴 웹이려나" />

      <Link href="/blog" className="underline">
        내가 만든 블로그, 너를 위해 써봤지
      </Link>
    </section>
  );
}
