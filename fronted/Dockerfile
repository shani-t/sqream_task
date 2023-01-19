# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code to the container
COPY . .

# Build the Angular application
RUN npm run build

# Expose the port the application will run on
EXPOSE 4204

# Start the application
CMD ["npm", "start"]
