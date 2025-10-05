# Use a modern Node.js base image
FROM node:20-alpine

# Set the working directory for the application
WORKDIR /app
# Copy package files from the context root (where the Dockerfile is)
COPY ./package.json ./package-lock.json ./

RUN npm install --package-lock-only

# Copy the rest of the application code
COPY . .

# NestJS port
EXPOSE 5000

# Default command (will be overridden by docker-compose)
CMD ["npm", "run", "start:dev"]