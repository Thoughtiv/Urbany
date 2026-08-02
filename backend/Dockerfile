FROM node:20-alpine

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./

# Install dependencies
# Prefer `npm ci` when a lockfile is present for reproducible builds.
# Use `--legacy-peer-deps` to avoid peer dependency resolution failures in Cloud Build
RUN if [ -f package-lock.json ]; then \
      npm ci --ignore-scripts; \
    else \
      npm install --legacy-peer-deps --ignore-scripts; \
    fi

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Cloud Run sets PORT=8080, so align the container contract with that runtime port.
ENV PORT=8080
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8080/api/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Run application
CMD ["npm", "run", "start:prod"]
