# Stage 1: Build the React app
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (if available)
COPY package*.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000
EXPOSE 3000

# Start Nginx server
CMD ["npm", "run", "dev"]