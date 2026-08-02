FROM node:20-alpine AS deps
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY package*.json ./
# Avoid lockfile-based dedupe and install dependencies in the simplest way possible for Cloud Build.
RUN npm install -g npm@10.8.2 && rm -f package-lock.json && npm install --legacy-peer-deps --no-audit --no-fund --ignore-scripts --omit=optional

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN mkdir -p public
ENV NEXT_TELEMETRY_DISABLED=1
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_GRAPHQL_URL
ARG NEXT_PUBLIC_GEO_API_URL
ARG NEXT_PUBLIC_MAPBOX_TOKEN
ARG NEXT_PUBLIC_OPENROUTE_KEY
ARG NEXT_PUBLIC_ENABLE_3D_TOURS
ARG NEXT_PUBLIC_ENABLE_AI_STAGING
ARG NEXT_PUBLIC_ENABLE_ML_PREDICTIONS
ARG NEXT_PUBLIC_GA_ID
ARG NEXT_PUBLIC_SENTRY_DSN
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_GRAPHQL_URL=$NEXT_PUBLIC_GRAPHQL_URL
ENV NEXT_PUBLIC_GEO_API_URL=$NEXT_PUBLIC_GEO_API_URL
ENV NEXT_PUBLIC_MAPBOX_TOKEN=$NEXT_PUBLIC_MAPBOX_TOKEN
ENV NEXT_PUBLIC_OPENROUTE_KEY=$NEXT_PUBLIC_OPENROUTE_KEY
ENV NEXT_PUBLIC_ENABLE_3D_TOURS=$NEXT_PUBLIC_ENABLE_3D_TOURS
ENV NEXT_PUBLIC_ENABLE_AI_STAGING=$NEXT_PUBLIC_ENABLE_AI_STAGING
ENV NEXT_PUBLIC_ENABLE_ML_PREDICTIONS=$NEXT_PUBLIC_ENABLE_ML_PREDICTIONS
ENV NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID
ENV NEXT_PUBLIC_SENTRY_DSN=$NEXT_PUBLIC_SENTRY_DSN
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js
EXPOSE 3000
CMD ["npm", "run", "start"]
