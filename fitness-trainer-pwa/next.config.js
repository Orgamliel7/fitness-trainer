/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove standalone output for development
  // output: 'standalone',
  
  images: {
    unoptimized: true,
  },
  
  webpack: (config, { dev }) => {
    if (dev) {
      // More aggressive hot reload settings
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: /node_modules/
      };
    }
    return config;
  },
  
  // Less aggressive type checking
  typescript: {
    ignoreBuildErrors: true,
  },

  // Enable source maps for better debugging
  productionBrowserSourceMaps: true,
};

module.exports = nextConfig;