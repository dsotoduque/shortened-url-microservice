FROM node:16

# Install dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the project
RUN npm run build

# Expose port 5544
EXPOSE 5544

# Start the microservice
CMD ["npm", "run", "start:prod"]