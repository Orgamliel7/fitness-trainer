/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable server-side rendering for faster builds during development
  output: 'standalone',
  
  // Optimize image loading
  images: {
    unoptimized: true, // Faster image loading during dev
  },
  
  // Reduce webpack processing
  webpack: (config) => {
    // Ignore watching certain directories
    config.watchOptions = {
      ignored: ['**/node_modules', '**/.git']
    };
    return config;
  },
  
  // Reduce TypeScript type checking during dev
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;