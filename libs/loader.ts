/*
 * Copyright (c) 2021-present, FriendliAI Inc. All rights reserved.
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { createHash } from "crypto";

export interface BlogProps {
  id: string;
  title: string;
  hash: string;
  content: string;
  published: string;
  description: string;
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

      const subDirs = fs
        .readdirSync(dirPath)
        .filter((fileName: string) =>
          fs.lstatSync(path.join(dirPath, fileName)).isDirectory()
        );

      subDirs.flatMap((subDirName) => {
        const subDirPath = path.join(dirPath, subDirName);
        fs.readdirSync(subDirPath)
          .filter((fileName: string) =>
            /\.(png|jpg|jpeg|gif|svg|webp|mp4|webm|ogg|mp3|wav)$/.test(fileName)
          )
          .map((fileName: string) => {
            const filePath = path.join(subDirPath, fileName);
            const dirName = path.dirname(filePath);
            const postPath = dirName.split(path.sep);

            const hash = createHash("md5")
              .update(postPath[postPath.length - 2])
              .digest("hex")
              .substring(0, 5);

            const destDir = path.join(process.cwd(), "public", "img");
            if (!fs.existsSync(destDir)) {
              fs.mkdirSync(destDir, { recursive: true });
            }
            const destFileName =
              fileName === "thumbnail.jpeg" ? hash + "-" + fileName : fileName;
            fs.copyFileSync(filePath, path.join(destDir, destFileName));
          });
      });

      return mdFiles.map(async (filePath: string) => {
        const fileContents = await fs.promises.readFile(filePath, "utf8");
        const matterResult = matter(fileContents);

        const postPath = filePath
          .replace(postsDirectory, "")
          .split(path.sep)[1];

        const hash = createHash("md5")
          .update(postPath)
          .digest("hex")
          .substring(0, 5);

        let id = path
          .basename(filePath, path.extname(filePath))
          .replace(/(\s|_|\.|,)/g, "-");

        if (!/^[a-zA-Z0-9-]+$/.test(id)) {
          id = id.replace(/[^a-zA-Z0-9-]/g, "") + "-" + hash;
        }

        id = id.replace(/-{2,}/g, "-");

        const published = new Date(matterResult.data.date)
          .toISOString()
          .split("T")[0];

        return {
          id,
          title: matterResult.data.title,
          description: matterResult.data.description,
          content: matterResult.content,
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
      title: "404",
      hash: "",
      content: "Post not found",
      description: "Post not found",
      published: "",
    };

  return {
    ...currentPost,
  };
}
