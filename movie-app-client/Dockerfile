# --------------------
# Stage 1: Build the Next.js application
# --------------------
    FROM node:20-alpine AS builder

    WORKDIR /app
    
    # Copy package files and install production dependencies
    COPY package.json yarn.lock ./
    RUN yarn install --frozen-lockfile --production=false
    
    # Copy source code
    COPY . .
    
    # Build the Next.js application
    # This generates the .next folder
    RUN yarn build
    
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
    
    # Copy the built application files from the builder stage
    # Copy only necessary files for a production run
    COPY --from=builder /app/package.json ./package.json
    COPY --from=builder /app/next.config.js ./next.config.js
    COPY --from=builder /app/public ./public
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/node_modules ./node_modules
    
    # Expose the default Next.js production port
    EXPOSE 3000
    
    # Start the Next.js server in production mode
    CMD ["yarn", "start"]