FROM node:22-alpine AS base

# --- Dependencies ---
FROM base AS deps
WORKDIR /app
# Native builds for better-sqlite3 / sharp
RUN apk add --no-cache python3 make g++ libc6-compat
COPY package.json package-lock.json* ./
RUN npm ci

# --- Build ---
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# --- Production ---
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
ENV DATA_DIR=/app/data

RUN apk add --no-cache libstdc++
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# better-sqlite3 / sharp native modules aren't picked up by the standalone
# tracer reliably, so copy the full node_modules over.
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules

# Volume for SQLite DB + uploaded flyers
RUN mkdir -p /app/data/uploads && chown -R nextjs:nodejs /app/data
VOLUME ["/app/data"]

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
