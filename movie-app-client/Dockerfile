# ====================================================================
# Stage 1: Build the Next.js application (using 'node:20-alpine')
# ====================================================================
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Install dependencies (only copy package files first to leverage caching)
COPY package.json package-lock.json ./

# Use 'npm ci' for clean, repeatable installs
# CRITICAL OPTIMIZATION: Use BuildKit cache mounts to significantly speed up
# subsequent builds by caching the npm registry data and node_modules directory.
RUN --mount=type=cache,target=/root/.npm \
    npm ci

# Copy the rest of the source code
COPY . .

# Environment variable to help with memory limits during build
ENV NODE_OPTIONS="--max-old-space-size=1024"

# Build the application
# NOTE: This assumes 'output: "standalone"' is set in next.config.js
RUN npm run build

# ====================================================================
# Stage 2: Production runtime (MINIMAL)
# ====================================================================
# We use a base image that only needs to execute the Node server.
FROM node:20-alpine AS runner

# Environment variables for production
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=512"

# --- Security: Create non-root user ---
# Using a specific non-root user is a major security win.
RUN addgroup --system app && adduser --system -G app app

# Set up the working directory for the server binary
# We copy the standalone output to the root of the app directory.
WORKDIR /app

# --- Next.js Standalone Output Copy ---
# 1. Copy the standalone server directory from the builder
# The standalone output includes all necessary production dependencies
# and scripts to run the server.
COPY --from=builder --chown=app:app /app/.next/standalone ./

# 2. Copy the static assets (public files)
COPY --from=builder --chown=app:app /app/public ./public

# 3. Copy the static/image optimization cache (if using image component)
COPY --from=builder --chown=app:app /app/.next/static ./.next/static

# Switch to the non-root user
USER app

# Expose the default Next.js port
EXPOSE 3000

# Start the standalone server (the path is relative to the WORKDIR)
# The entry point is the generated server.js file.
CMD ["node", "server.js"]
