<<<<<<< HEAD
# syntax=docker/dockerfile:1.7
# ----------------------------------------------------------------------
# Slook landing — production Dockerfile (Next.js 15, classic output)
#
# Stages:
#   1. deps     — install npm deps + compile native modules (better-sqlite3)
#   2. builder  — run `next build`
#   3. runner   — minimal runtime image running as non-root user
#
# Notes:
# • `npm ci` requires package-lock.json to be 100% in sync with package.json.
#   If a teammate adds a dep without committing the lockfile, ci fails. This
#   Dockerfile falls back to `npm install` automatically in that case (slower
#   but won't block the build). For reproducible/fast builds, run `npm install`
#   locally to refresh the lockfile and commit it.
# • This Dockerfile does NOT use `output: 'standalone'`. If you re-enable it in
#   next.config.mjs, switch the runner stage to the standalone copy pattern.
#
# Build:   docker build -t slook-landing .
# Run:     docker run -p 3001:3001 \
#            -v $(pwd)/data:/app/data \
#            --env-file .env.local \
#            slook-landing
# ----------------------------------------------------------------------

# ============== 1. deps ============================================
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat python3 make g++

WORKDIR /app
COPY package.json package-lock.json* ./

# Try `npm ci` (fast, strict). If the lockfile is out of sync, fall back to
# `npm install`. The fallback prints a clear notice so you know to refresh
# your committed lockfile.
RUN if [ -f package-lock.json ]; then \
      (npm ci --no-audit --no-fund) \
        || (echo "" \
            && echo "[slook] package-lock.json is out of sync with package.json." \
            && echo "[slook] Falling back to 'npm install' — commit a fresh lockfile to fix this." \
            && echo "" \
            && npm install --no-audit --no-fund); \
    else \
      npm install --no-audit --no-fund; \
    fi

# ============== 2. builder =========================================
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
=======
# Use Bun's official base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependencies and install with Bun
COPY package.json ./
RUN npm install

# Copy the rest of the source files
>>>>>>> d606cfa (docker file)
COPY . .

# Build the Next.js app
RUN npm run build

# Expose Next.js default port
EXPOSE 3001

<<<<<<< HEAD
# libc6-compat is needed by some prebuilt native binaries (Node's own + others)
RUN apk add --no-cache libc6-compat

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3001
ENV HOSTNAME=0.0.0.0

# Non-root user
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# Classic Next.js output — copy the build, public assets, runtime deps,
# and the minimal config files needed for `next start`.
COPY --from=builder --chown=nextjs:nodejs /app/package.json     ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/node_modules     ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/.next            ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public           ./public
COPY --from=builder --chown=nextjs:nodejs /app/next.config.mjs  ./next.config.mjs

# SQLite lives here. Mount as a volume to persist across container restarts.
RUN mkdir -p /app/data && chown -R nextjs:nodejs /app/data
VOLUME ["/app/data"]

USER nextjs
EXPOSE 3001

# Use the next CLI directly so we don't depend on npm at runtime.
CMD ["node_modules/.bin/next", "start", "-p", "3001"]
=======
# Start the Next.js app
CMD ["npm", "start"]
>>>>>>> d606cfa (docker file)
