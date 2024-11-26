"use client";

import Header from "@/components/header";
import { useI18n } from "@/locales/client";

export default function NotFound() {
  const t = useI18n();
  return (
    <section>
      <Header
        title="404"
        description={t("404")}
        link={{ href: "/", text: "" }}
      />
    </section>
  );
}
