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

const pathKV = new Map<string, string>();

export interface BlogListProps {
  id: string;
  frontmatter: any;
  published: string;
}

export interface BlogPostProps extends BlogListProps {
  hash: string;
  content: string;
}

export function getAllPosts(): BlogListProps[] {
  let posts: BlogListProps[] = [];
  const postRootPath = path.join(process.cwd(), "blogs");
  const dirNames = fs.readdirSync(postRootPath);

  for (const dirName of dirNames) {
    const dirPath = path.join(postRootPath, dirName);
    if (!fs.statSync(dirPath).isDirectory()) continue;

    const postFilePath = path.join(
      dirPath,
      fs
        .readdirSync(dirPath)
        .filter((fileName) => /\.(mdx|md)$/.test(fileName))[0]
    );

    const postData = fs.readFileSync(postFilePath, "utf8");

    const hash = createHash("md5")
      .update(postFilePath)
      .digest("hex")
      .substring(0, 6);

    let id = path
      .basename(postFilePath, path.extname(postFilePath))
      .replace(/(\s|_|\.|,)/g, "-");
    if (!/^[a-zA-Z0-9-]+$/.test(id)) {
      id = id.replace(/[^a-zA-Z0-9-]/g, "") + "-" + hash;
    }
    id = id.replace(/-{2,}/g, "-").toLowerCase();

    const { data: frontmatter } = matter(postData);
    const published = new Date(frontmatter.date).toISOString().split("T")[0];

    pathKV.set(id, dirPath);

    posts.push({
      id: id,
      frontmatter,
      published,
    });
  }

  return posts.sort(
    (a, b) => Date.parse(b.frontmatter.date) - Date.parse(a.frontmatter.date)
  );
}

export async function getPostById(id: string): Promise<BlogPostProps | null> {
  let dirPath: string | undefined;
  let retry = 0;

  do {
    dirPath = pathKV.get(id);
    getAllPosts();
    retry++;
  } while (!dirPath || retry > 4);

  const postFilePath = path.join(
    dirPath,
    fs
      .readdirSync(dirPath)
      .filter((fileName) => /\.(mdx|md)$/.test(fileName))[0]
  );

  const postData = fs.readFileSync(postFilePath, "utf8");

  const hash = createHash("md5")
    .update(postFilePath)
    .digest("hex")
    .substring(0, 6);

  const { data: frontmatter, content } = matter(postData);

  // ----------------- MDX Bundler -----------------

  const { code } = await bundleMDX({
    source: content,
    cwd: dirPath,
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

  const published = new Date(frontmatter.date).toISOString().split("T")[0];

  const post = {
    id,
    frontmatter,
    content: code,
    published,
    hash,
  };

  return post;
}
