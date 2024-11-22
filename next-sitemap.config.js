/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.VERCEL_PROJECT_PRODUCTION_URL || "https://minpeter.xyz",
  generateRobotsTxt: true,
  generateIndexSitemap: false,

  transform: async (config, path) => {
    if (path.includes("/ko/")) {
      return {
        loc: path.replace("/ko/", "/"),
        changefreq: config.changefreq,
        priority: config.priority,
      };
    }
  },
};
