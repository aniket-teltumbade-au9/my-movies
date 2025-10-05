# Use a modern Node.js base image
FROM node:20-alpine

# Set the working directory for the application
WORKDIR /app

# 1. Copy package files first to optimize layer caching.
# If these files haven't changed, Docker won't re-run 'npm install'.
COPY package.json package-lock.json ./

# 2. *** CRITICAL FIX: Install ALL dependencies ***
# This command creates the 'node_modules' directory where the 'next' executable resides.
RUN npm install

# 3. Copy the rest of the application code
COPY . .

# Next.js development port
EXPOSE 3000

# Default command (used by 'docker compose up')
CMD ["npm", "run", "start"]
