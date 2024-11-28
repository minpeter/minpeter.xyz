import Header from "@/components/header";
import { Suspense } from "react";
import { BlogList } from "./list";

import NewMetadata from "@/lib/metadata";
import { getI18n } from "@/locales/server";
import { setStaticParamsLocale } from "next-international/server";

export const metadata = NewMetadata({
  title: "minpeter | blog",
  description: "내가 적은 블로그, 너를 위해 써봤지",
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
    <section data-animate>
      <Header
        title={t("blogPageTitle")}
        description={t("blogPageDescription")}
        link={{ href: "/", text: t("backToHome") }}
      />
      <Suspense>
        <BlogList lang={locale} />
      </Suspense>
    </section>
  );
}
