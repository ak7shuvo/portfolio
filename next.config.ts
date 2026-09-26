import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Emit folder/index.html so nested routes (/work and /work/[slug]) resolve
  // on static hosts such as GitHub Pages, where /work.html + /work/ collide.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
