/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Ignora erros de TypeScript
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignora erros de ESLint durante o build
  },
};

export default nextConfig;