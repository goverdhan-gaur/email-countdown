import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@napi-rs/canvas", "gif-encoder-2"],
  outputFileTracingIncludes: {
    '/api/countdown': ['./public/fonts/**/*'],
  },
};

export default nextConfig;
