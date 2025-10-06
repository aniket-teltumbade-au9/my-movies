# --------------------
# Stage 1: Build the Next.js application
# --------------------
    FROM node:20-alpine AS builder

    WORKDIR /app
    
    # Copy package files and install dependencies
    COPY package.json package-lock.json ./
    # Install ALL dependencies (dev and prod) for building
    RUN npm install
    
    # Copy source code
    COPY . .
    
    # Build the Next.js application
    RUN npm run build
    
    # --------------------
    # Stage 2: Create the final, lean runtime image
    # --------------------
    FROM node:20-alpine AS runner
    
    # Set environment variables for Next.js production
    ENV NODE_ENV production
    
    # Next.js must be run as a non-root user for security best practices
    RUN addgroup --system app && adduser --system -G app app
    USER app
    
    # Set the working directory to /app
    WORKDIR /app
    
    # Copy only production dependencies from the builder stage
    # We only need 'next' and its peer dependencies for running
    COPY --from=builder /app/package.json ./package.json
    COPY --from=builder /app/node_modules ./node_modules
    # Copy built application files
    COPY --from=builder /app/next.config.js ./next.config.js
    COPY --from=builder /app/public ./public
    COPY --from=builder /app/.next ./.next
    
    # Expose the default Next.js production port
    EXPOSE 3000
    
    # Start the Next.js server in production mode
    CMD ["npm", "start"]