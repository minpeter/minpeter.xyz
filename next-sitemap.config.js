/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.VERCEL_PROJECT_PRODUCTION_URL || "https://minpeter.xyz",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
};
