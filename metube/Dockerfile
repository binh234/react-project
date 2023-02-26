# Use an official Node.js runtime as abase image
FROM node:19-alpine

# Specify working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install required dependencies
RUN npm install

# Copy the rest of application to the container
COPY . .

# Build the application
RUN npm run build

# Set the command to run where the container starts
CMD ["npm", "start"]