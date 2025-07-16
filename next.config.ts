import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'safe-health-121dd49ea3.media.strapiapp.com',
        pathname: '/**', // Autorise toutes les images de ce domaine
      },
    ],
  },
};

export default nextConfig;
