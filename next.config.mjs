/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {hostname: 'images.pexels.com'},
            {hostname: 'res.cloudinary.com'},
            {hostname: 'www.pexels.com'},
        ]
    }
};

export default nextConfig;
