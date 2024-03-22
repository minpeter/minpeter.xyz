import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { createHash } from "crypto";
import { bundleMDX } from "mdx-bundler";

import remarkMdxImages from "remark-mdx-images";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export interface BlogProps {
  id: string;
  hash: string;
  published: string;
  frontmatter: any;
}

export interface BlogListProps extends BlogProps {
  filePath: string;
}

export interface BlogPostProps extends BlogProps {
  content: string;
}

function hashAndId(filePath: string): { hash: string; id: string } {
  const hash = createHash("md5").update(filePath).digest("hex").substring(0, 6);

  let id = path
    .basename(filePath, path.extname(filePath))
    .replace(/(\s|_|\.|,)/g, "-");
  if (!/^[a-zA-Z0-9-]+$/.test(id)) {
    id = id.replace(/[^a-zA-Z0-9-]/g, "") + "-" + hash;
  }
  id = id.replace(/-{2,}/g, "-").toLowerCase();

  return { hash, id };
}

export async function getAllPosts(): Promise<BlogListProps[]> {
  let posts: BlogListProps[] = [];
  const postRootPath = path.join(process.cwd(), "content");
  const objs = (await fs.readdir(postRootPath, { withFileTypes: true })).filter(
    (dirent) =>
      (dirent.isDirectory() || /\.(mdx|md)$/.test(dirent.name)) &&
      !/^\./.test(dirent.name)
  );

  for (const obj of objs) {
    let filePath = path.join(postRootPath, obj.name);

    if (obj.isDirectory()) {
      const files = await fs
        .readdir(path.join(postRootPath, obj.name))
        .then((files) => files.filter((file) => /\.(mdx|md)$/.test(file)));
      filePath = path.join(postRootPath, obj.name, files[0]);
    }

    const { id, hash } = hashAndId(filePath);

    const { data: frontmatter } = matter(await fs.readFile(filePath, "utf8"));

    posts.push({
      id: id,
      frontmatter,
      published: new Date(frontmatter.date).toISOString().split("T")[0],
      filePath,
      hash,
    });
  }

  return posts.sort(
    (a, b) => Date.parse(b.frontmatter.date) - Date.parse(a.frontmatter.date)
  );
}

export async function getPostById(id: string): Promise<BlogPostProps | null> {
  const { filePath, published, hash, frontmatter } =
    // getAllPosts().find((post) => post.id === id) || {};
    (await getAllPosts()).find((post) => post.id === id) || {};
  if (!filePath || !published || !hash || !frontmatter) return null;

  // const { content: postData } = matter(fs.readFileSync(filePath, "utf8"));
  const { content: postData } = matter(await fs.readFile(filePath, "utf8"));

  const { code } = await bundleMDX({
    source: postData,
    cwd: filePath.split("/").slice(0, -1).join("/"),
    grayMatterOptions(options) {
      options.excerpt = true;
      return options;
    },
    mdxOptions(options) {
      options.remarkPlugins = [remarkGfm, remarkMdxImages];
      options.rehypePlugins = [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: "wrap",
            properties: {
              className: ["anchor"],
            },
          },
        ],
      ];
      return options;
    },
    esbuildOptions: (options) => {
      const imagePathPrefix = "dynamic";
      options.outdir = path.join(process.cwd(), "public", imagePathPrefix, id);

      options.loader = {
        ...options.loader,
        ".png": "file",
        ".jpg": "file",
        ".gif": "file",
        ".jpeg": "file",
        ".svg": "file",
      };

      options.publicPath = path.join("/", imagePathPrefix, id);

      options.write = true;
      return options;
    },
  });

  return {
    id,
    hash,
    frontmatter,
    content: code,
    published,
  };
}
