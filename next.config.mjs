/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // better-sqlite3 is a native module — Next.js must keep it external (not bundle it).
  serverExternalPackages: ['better-sqlite3'],
}

export default nextConfig
