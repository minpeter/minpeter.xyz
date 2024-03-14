/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // static build settings
  // output: "export",
  // images: { unoptimized: true },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "user-images.githubusercontent.com",
        port: "",
        pathname: "/**/*",
      },
    ],
  },
};

export default nextConfig;
