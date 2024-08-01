/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.techiexpert.com',
            },
            {
                protocol: 'https',
                hostname: 'cdn.dribbble.com',
            },
            {
                protocol: 'https',
                hostname: 'miro.medium.com',
            },
            {
                protocol: 'https',
                hostname: 'www.goodworklabs.com',
            },
            {
                protocol: 'https',
                hostname: 'images.pexels.com',
            },
            {
                protocol: 'https',
                hostname: 'th.bing.com',
            },
            {
                protocol: 'https',
                hostname: 'assets.website-files.com',
            },
            {
                protocol: 'https',
                hostname: 'img.launchberg.com',
            },
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
            },
        ],
    },
};

export default nextConfig;
