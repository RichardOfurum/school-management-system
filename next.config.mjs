/** @type {import('next').NextConfig} */
const nextConfig = {
  // Webpack configuration to exclude Node.js modules from client/edge bundles
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
        crypto: false, // Added as this is often needed
        stream: false, // Added as this is often needed
      };
    }
    return config;
  },
  
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'www.pexels.com' },
      { protocol: 'https', hostname: 'cdn.rareblocks.xyz' },
      { 
        protocol: 'https', 
        hostname: 'cdn.rareblocks.xyz',
        pathname: '/collection/celebration/images/**' // Fixed path pattern
      },
    ],
    // Recommended for Cloudflare deployment
    minimumCacheTTL: 60,
    formats: ['image/webp'],
  },
  
  // Cloudflare-specific optimizations
  experimental: {
    esmExternals: 'loose',
    outputFileTracing: true,
  },
};

// Only apply Cloudflare config if deploying to Cloudflare
const isCloudflare = process.env.NEXT_PUBLIC_DEPLOY_TARGET === 'cloudflare';
export default isCloudflare 
  ? require('@opennextjs/cloudflare').defineCloudflareConfig(nextConfig)
  : nextConfig;
// /** @type {import('next').NextConfig} */
// import { defineCloudflareConfig } from "@opennextjs/cloudflare";
// const nextConfig = {
//     // Add this to exclude Node.js modules from client/edge bundles
//   webpack: (config, { isServer }) => {
//     if (!isServer) {
//       config.resolve.fallback = {
//         ...config.resolve.fallback,
//         fs: false,
//         path: false,
//         os: false,
//       };
//     }
//     return config;
//   },
//     images:{
//         remotePatterns:[
//             {hostname: 'images.pexels.com'},
//             {hostname: 'res.cloudinary.com'},
//             {hostname: 'www.pexels.com'},
//             {hostname: 'cdn.rareblocks.xyz'},
//             {hostname: 'cdn.rareblocks.xyz/collection/celebration/images'},
//         ]
//     }
// };

// export default defineCloudflareConfig(nextConfig);
// // export default nextConfig;
