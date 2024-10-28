import { defineDocs, defineConfig } from "fumadocs-mdx/config";

export const { docs, meta } = defineDocs({
  dir: "content/blog",
});

export default defineConfig({
  lastModifiedTime: "git",
});
