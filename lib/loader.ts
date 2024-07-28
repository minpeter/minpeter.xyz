import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { createHash } from "crypto";
import { bundleMDX } from "mdx-bundler";

import rehypeMdxImportMedia from "rehype-mdx-import-media";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export interface BlogProps {
  frontmatter: any;
}

export interface BlogListProps extends BlogProps {
  filePath: string;
  published: string;
  slug: string;
  hash: string;
}

export interface BlogPostProps extends BlogProps {
  content: string;
  slug: string;
}

export interface PHSProps {
  path: string;
  hash: string;
  slug: string;
}

var phs_cache: PHSProps[] = [];

export async function getPostPHS(): Promise<PHSProps[]> {
  if (phs_cache.length > 0 && process.env.NODE_ENV === "production") {
    return phs_cache;
  }

  phs_cache = await Promise.all(
    (
      await fs.readdir(path.join(process.cwd(), "content"), {
        withFileTypes: true,
        recursive: true,
      })
    )
      .filter((dirent) => /\.(mdx|md)$/.test(dirent.name))
      .map(async (dirent) => {
        const filePath = path.join(dirent.path, dirent.name);

        /// BEGIN HASH AND SLUG
        const hash = createHash("md5")
          .update(filePath)
          .digest("hex")
          .substring(0, 6);

        let slug = path
          .basename(filePath, path.extname(filePath))
          .replace(/(\s|_|\.|,)/g, "-");
        if (!/^[a-zA-Z0-9-]+$/.test(slug)) {
          slug = slug.replace(/[^a-zA-Z0-9-]/g, "") + "-" + hash;
        }
        slug = slug.replace(/-{2,}/g, "-").toLowerCase();
        /// END HASH AND SLUG

        return {
          path: filePath,
          slug,
          hash,
        };
      })
  );

  return phs_cache;
}

export async function getAllPosts(): Promise<BlogListProps[]> {
  const phs = await getPostPHS();
  const posts: BlogListProps[] = await Promise.all(
    phs.map(async ({ path: filePath, slug, hash }) => {
      const { data: frontmatter } = matter(await fs.readFile(filePath, "utf8"));

      return {
        filePath,
        slug,
        hash,

        frontmatter,
        published: new Date(frontmatter.date).toISOString().split("T")[0],
      };
    })
  );

  return posts.sort(
    (a, b) => Date.parse(b.frontmatter.date) - Date.parse(a.frontmatter.date)
  );
}

export async function getPostBySlug(
  slug: string
): Promise<BlogPostProps | null> {
  const phs = await getPostPHS().then((ps) =>
    ps.find((post) => post.slug === slug)
  );

  if (!phs) return null;

  const { path: filePath } = phs;

  const { content: postData, data: frontmatter } = matter(
    await fs.readFile(filePath, "utf8")
  );

  const { code } = await bundleMDX({
    source: postData,
    cwd: filePath.split("/").slice(0, -1).join("/"),
    grayMatterOptions(options) {
      options.excerpt = true;
      return options;
    },
    mdxOptions(options) {
      options.remarkPlugins = [remarkBreaks, remarkGfm];
      options.rehypePlugins = [
        rehypeSlug,
        rehypeMdxImportMedia,
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
      options.outdir = path.join(
        process.cwd(),
        "public",
        imagePathPrefix,
        slug
      );

      options.loader = {
        ...options.loader,
        ".png": "file",
        ".jpg": "file",
        ".gif": "file",
        ".jpeg": "file",
        ".svg": "file",
      };

      options.publicPath = path.join("/", imagePathPrefix, slug);

      options.write = true;
      return options;
    },
  });

  return {
    slug,
    frontmatter,
    content: code,
  };
}
