const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development'
  });
  
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    reactStrictMode: true,
    output: 'standalone', // Add this for better Vercel compatibility
    // If you have any dynamic routes, add this
    // generateStaticParams: true,
  };
  
  module.exports = withPWA(nextConfig);