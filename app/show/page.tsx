import Header from "@/components/header";
import Link from "next/link";

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <Header
        title="showcase"
        description="공들여 만들었지만 사용하지 않는 컴포넌트의 무덤"
        link={{ href: "/", text: "홈으로" }}
      />
      <div
        data-animate
        data-animate-speed="fast"
        className="flex flex-col gap-2"
      >
        <Link href="/show/yet-another-tempfiles" className="underline">
          /show/yet-another-tempfiles
        </Link>

        <Link href="/show/tech-stack-ball" className="underline">
          /show/tech-stack-ball
        </Link>

        <Link href="/show/dynamic-hacked-text" className="underline">
          /show/dynamic-hacked-text
        </Link>
      </div>
    </section>
  );
}
