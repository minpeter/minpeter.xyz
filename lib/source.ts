import { docs, meta } from "@/.source";
import { createMDXSource } from "fumadocs-mdx";
import { loader } from "fumadocs-core/source";
import { i18n } from "@/lib/i18n";

export const source = loader({
  i18n,

  baseUrl: "/blog",
  source: createMDXSource(docs, meta),
});
