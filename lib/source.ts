import { docs, meta } from "@/.source";
import { createMDXSource } from "fumadocs-mdx";
import { loader } from "fumadocs-core/source";

export const blog = loader({
  i18n: {
    defaultLanguage: "ko",
    languages: ["ko", "en"],
  },
  baseUrl: "/blog",
  source: createMDXSource(docs, meta),
});

export type blogListType = ReturnType<typeof blog.getPages>;
export type blogType = blogListType[number];
