/*
 * Copyright (c) 2021-present, FriendliAI Inc. All rights reserved.
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { createHash } from "crypto";
import { bundleMDX } from "mdx-bundler";

import remarkMdxImages from "remark-mdx-images";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";

export interface BlogProps {
  id: string;
  hash: string;
  published: string;
  content: any;
  frontmatter?: any;
}

export async function getAllPosts(): Promise<BlogProps[]> {
  const postsDirectory = path.join(process.cwd(), "blogs");

  const posts = await Promise.all(
    fs.readdirSync(postsDirectory).flatMap((dir: string) => {
      const dirPath = path.join(postsDirectory, dir);
      if (!fs.lstatSync(dirPath).isDirectory()) return [];

      const mdFiles = fs
        .readdirSync(dirPath)
        .filter((fileName: string) => /\.(mdx|md)$/.test(fileName))
        .map((fileName: string) => path.join(dirPath, fileName));

      return mdFiles.map(async (filePath: string) => {
        const fileContents = await fs.promises.readFile(filePath, "utf8");

        const postPath = filePath
          .replace(postsDirectory, "")
          .split(path.sep)[1];

        const hash = createHash("md5")
          .update(postPath)
          .digest("hex")
          .substring(0, 6);

        let id = path
          .basename(filePath, path.extname(filePath))
          .replace(/(\s|_|\.|,)/g, "-");
        if (!/^[a-zA-Z0-9-]+$/.test(id)) {
          id = id.replace(/[^a-zA-Z0-9-]/g, "") + "-" + hash;
        }
        id = id.replace(/-{2,}/g, "-").toLowerCase();

        const { data: frontmatter, content } = matter(fileContents);
        const { code } = await bundleMDX({
          source: content,
          cwd: filePath.split(path.sep).slice(0, -1).join(path.sep),
          mdxOptions(options) {
            options.remarkPlugins = [remarkGfm, remarkMdxImages];
            options.rehypePlugins = [rehypePrism];
            return options;
          },
          esbuildOptions: (options) => {
            options.loader = {
              ...options.loader,
              ".png": "dataurl",
              ".jpg": "dataurl",
              ".gif": "dataurl",
              ".jpeg": "dataurl",
            };

            return options;
          },
        });

        const published = new Date(frontmatter.date)
          .toISOString()
          .split("T")[0];

        return {
          id,
          frontmatter,
          content: code,
          published: published,
          hash,
        };
      });
    })
  );

  return posts.sort(
    (a, b) => Date.parse(b.published) - Date.parse(a.published)
  );
}

export async function getPostById(id: string): Promise<BlogProps> {
  const posts = await getAllPosts();
  const currentPost = posts.find((post) => post.id === id);

  if (!currentPost)
    return {
      id,
      hash: "",
      published: "",
      content: "Post not found",
      frontmatter: {},
    };

  return {
    ...currentPost,
  };
}
