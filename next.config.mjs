/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // better-sqlite3 is a native module — Next.js must keep it external
  // (not bundle it) so the .node binary is loaded from node_modules at runtime.
  serverExternalPackages: ['better-sqlite3'],

  experimental: {
    serverActions: {
      // Default is 1 MB. Portal users upload PDFs up to 10 MB
      // (see MAX_PDF_BYTES in src/lib/uploads.js), so raise the limit
      // to match. Without this, uploads >1 MB fail with
      // "An unexpected response was received from the server."
      bodySizeLimit: '12mb',
    },
  },
}

export default nextConfig
