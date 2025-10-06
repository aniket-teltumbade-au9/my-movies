# ============================================
# NEXT.JS CLIENT DOCKERFILE (Optimized)
# ============================================

# --------------------
# Stage 1: Build the Next.js application
# --------------------
    FROM node:20-alpine AS builder

    WORKDIR /app
    
    # Copy package files
    COPY package.json package-lock.json ./
    
    # Install dependencies for building
    RUN npm ci
    
    # Copy source code
    COPY . .
    
    # Build with reduced memory usage
    ENV NODE_OPTIONS="--max-old-space-size=512"
    RUN npm run build
    
    # --------------------
    # Stage 2: Production runtime (MINIMAL)
    # --------------------
    FROM node:20-alpine AS runner
    
    ENV NODE_ENV=production
    ENV NODE_OPTIONS="--max-old-space-size=512"
    
    # Create non-root user
    RUN addgroup --system app && adduser --system -G app app
    
    WORKDIR /app
    
    # Copy package files
    COPY --from=builder --chown=app:app /app/package.json ./
    COPY --from=builder --chown=app:app /app/package-lock.json ./
    
    # Install ONLY production dependencies (no dev dependencies)
    RUN npm ci --only=production && npm cache clean --force
    
    # Copy only necessary build artifacts
    COPY --from=builder --chown=app:app /app/next.config.js ./
    COPY --from=builder --chown=app:app /app/public ./public
    COPY --from=builder --chown=app:app /app/.next ./.next
    
    USER app
    
    EXPOSE 3000
    
    CMD ["npm", "start"]
    
    
