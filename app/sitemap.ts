import { getAllPosts } from "@/lib/loader";

export default async function sitemap() {
  const posts = await getAllPosts();

  const url = "https://minpeter.xyz";

  const post = posts.map((post) => {
    return {
      url: `${url}/blog/${post.slug}`,
      lastModified: new Date(post.published),
      changeFrequency: "daily",
      priority: 0.7,
    };
  });

  return [
    {
      url: url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...post,
  ];
}
