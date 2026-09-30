import { withContentCollections } from "@content-collections/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // GitHub Pages 정적 배포
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

// withContentCollections must be the outermost plugin
export default withContentCollections(nextConfig);
