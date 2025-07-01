/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {hostname: 'images.pexels.com'},
            {hostname: 'res.cloudinary.com'},
            {hostname: 'www.pexels.com'},
            {hostname: 'cdn.rareblocks.xyz'},
            {hostname: 'cdn.rareblocks.xyz/collection/celebration/images'},
        ]
    }
};

export default nextConfig;
