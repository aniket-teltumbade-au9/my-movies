# --------------------
# Stage 1: Build the NestJS application
# --------------------
    FROM node:20-alpine AS builder

    WORKDIR /app
    
    # Copy and install dependencies
    COPY package.json yarn.lock ./
    RUN yarn install --frozen-lockfile
    
    # Copy source code and build (transpile TS to JS)
    COPY . .
    RUN yarn build
    
    # --------------------
    # Stage 2: Create the final, lean runtime image
    # --------------------
    FROM node:20-alpine AS runner
    
    WORKDIR /app
    
    # Install only production dependencies
    COPY package.json yarn.lock ./
    RUN yarn install --frozen-lockfile --production=true
    
    # Copy the compiled JS files and necessary assets from the builder stage
    COPY --from=builder /app/dist ./dist
    
    # Set the environment
    ENV NODE_ENV production
    ENV PORT 5000
    
    # Security: Run as a non-root user
    RUN addgroup --system app && adduser --system -G app app
    USER app
    
    EXPOSE 5000
    
    # Start the compiled JavaScript application
    CMD ["node", "dist/main"]