import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  typescript: {
    // Type-checking is run separately via `npm run typecheck`.
    // Next.js build intentionally skips it to match the previous Vite behavior.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
