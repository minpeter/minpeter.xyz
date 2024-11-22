import { docs, meta } from "@/.source";
import { createMDXSource } from "fumadocs-mdx";
import { loader } from "fumadocs-core/source";
import type { I18nConfig } from "fumadocs-core/i18n";

export const i18n: I18nConfig = {
  defaultLanguage: "ko",
  languages: ["ko", "en"],
  hideLocale: "default-locale",
};

export const source = loader({
  i18n,
  baseUrl: "/blog",
  source: createMDXSource(docs, meta),
});
