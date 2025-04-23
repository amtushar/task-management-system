/** @type {import('next').NextConfig} */
const nextConfig = {

    experimental:{
        appDir: true,
    },
    images: {
        domains: ['localhost', 'task-management-system-7crt.vercel.app']
    },
    eslint: {
        ignoreDuringBuilds: true,
    }

};

export default nextConfig;
