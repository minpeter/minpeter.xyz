import Header from "@/components/header";
import { Suspense } from "react";
import { BlogList } from "./list";

import NewMetadata from "@/lib/metadata";

export const metadata = NewMetadata({
  title: "minpeter | blog",
  description: "내가 적은 블로그, 너를 위해 써봤지",
});

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return (
    <section>
      <Header
        title="민웅기의 개발 노트"
        description="내가 적은 블로그, 너를 위해 써봤지"
        link={{ href: "/", text: "홈으로" }}
      />
      <Suspense>
        <BlogList lang={lang} />
      </Suspense>
    </section>
  );
}
