    # ============================================
    # NESTJS SERVER DOCKERFILE (Optimized)
    # ============================================
    
    # --------------------
    # Stage 1: Build the NestJS application
    # --------------------
    FROM node:20-alpine AS builder
    
    WORKDIR /app
    
    # Copy package files
    COPY package.json package-lock.json ./
    
    # Install all dependencies for building
    RUN npm ci
    
    # Copy source code and build
    COPY . .
    RUN npm run build
    
    # --------------------
    # Stage 2: Production runtime (MINIMAL)
    # --------------------
    FROM node:20-alpine AS runner
    
    WORKDIR /app
    
    ENV NODE_ENV=production
    ENV PORT=5000
    
    # Create non-root user
    RUN addgroup --system app && adduser --system -G app app
    
    # Copy package files
    COPY --from=builder /app/package.json ./
    COPY --from=builder /app/package-lock.json ./
    
    # Install ONLY production dependencies (no dev dependencies)
    RUN npm ci --only=production && npm cache clean --force
    
    # Copy only the compiled output
    COPY --from=builder --chown=app:app /app/dist ./dist
    
    USER app
    
    EXPOSE 5000
    
    CMD ["node", "dist/main"]