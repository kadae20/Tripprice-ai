import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'pix8.agoda.net' },
      { hostname: 'pix6.agoda.net' },
      { hostname: 'pix2.agoda.net' },
      { hostname: 'images.unsplash.com' },
      { hostname: 'plus.unsplash.com' },
      { hostname: 'picsum.photos' },
      { hostname: 'fastly.picsum.photos' },
    ],
  },
};

export default nextConfig;
