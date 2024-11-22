import Header from "@/components/header";
import { getI18n } from "@/lib/locales/server";
import Link from "next/link";

import { setStaticParamsLocale } from "next-international/server";

import NewMetadata from "@/lib/metadata";

export const metadata = NewMetadata({
  title: "minpeter | showcase",
  description: "공들여 만들었지만 사용하지 않는 컴포넌트의 무덤",
});

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  setStaticParamsLocale(locale);

  const t = await getI18n();
  return (
    <section className="flex flex-col gap-3">
      <Header
        title="showcase"
        description="공들여 만들었지만 사용하지 않는 컴포넌트의 무덤"
        link={{ href: "/", text: t("backToHome") }}
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
