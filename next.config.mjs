import path from 'path'

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Ensure Turbopack resolves the workspace root correctly
  turbopack: {
    root: path.resolve(process.cwd()),
  },
}

export default nextConfig
