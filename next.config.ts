import type { NextConfig } from "next";

// Served at https://iam-bhar.github.io/bhargav-portfolio/ — a GitHub Pages
// project page needs every asset URL prefixed with the repo name.
const basePath = process.env.NODE_ENV === "production" ? "/bhargav-portfolio" : "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
