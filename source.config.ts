import {
  defineDocs,
  defineConfig,
  getDefaultMDXOptions,
  type DefaultMDXOptions,
} from "fumadocs-mdx/config";

export const { docs, meta } = defineDocs({
  dir: "content/blog",
});

const mdxOptions: DefaultMDXOptions = {};

export default defineConfig({
  lastModifiedTime: "git",
  mdxOptions: mdxOptions,
  generateManifest: true,
});
