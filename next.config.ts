import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@napi-rs/canvas", "gif-encoder-2"],
};

export default nextConfig;
