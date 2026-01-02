/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enables static HTML export
  images: {
    unoptimized: true, // Disable Next.js Image Optimization for static export
  },
};

module.exports = nextConfig;