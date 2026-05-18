/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Produce a minimal, self-contained build at .next/standalone/.
  // The Dockerfile copies that folder + .next/static + public into a small
  // runtime image. For `next start` (non-Docker) this has no effect.
  // output: 'standalone',

  // better-sqlite3 is a native module — Next.js must keep it external
  // (not bundle it) so the .node binary is loaded from node_modules at runtime.
  serverExternalPackages: ['better-sqlite3'],
}

export default nextConfig
