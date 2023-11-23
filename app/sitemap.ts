import { memoizeGetAllPosts } from "@/libs/loader";

export default function sitemap() {
  const posts = memoizeGetAllPosts();

  const url = "https://minpeter.tech";

  const post = posts.map((post) => {
    return {
      url: `url/${post.id}`,
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
