FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --legacy-peer-deps

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

COPY --chown=1000:1000 --from=builder /app/.next/standalone ./
COPY --chown=1000:1000 --from=builder /app/.next/static ./.next/static
COPY --chown=1000:1000 --from=builder /app/public ./public

USER 1000
EXPOSE 3000
CMD ["node", "server.js"]
