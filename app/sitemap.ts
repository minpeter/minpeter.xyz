import { getAllPosts } from "@/libs/loader";

export default async function sitemap() {
  const posts = await getAllPosts();

  // const pages = [];

  const url = "https://minpeter.tech";

  const post = posts.map((post) => {
    return {
      url: `url/${post.id}`,
      lastModified: new Date(post.published),
      changeFrequency: "daily",
      priority: 0.7,
    };
  });

  // const page = pages.map((page) => {
  //   return {
  //     url: `url/${page.link}/`,
  //     lastModified: new Date(),
  //     changeFrequency: "weekly",
  //     priority: page.priority,
  //   };
  // });

  return [
    {
      url: url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    // ...page,
    ...post,
  ];
}
