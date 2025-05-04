# Use official Node.js image
FROM node:16

# Set working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
#RUN npm install react-scripts --save
RUN npm install

# Copy entire project files
COPY . .

# Build the React app
RUN npm run build

# Serve the app using a lightweight web server
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]

# Expose port 3000
EXPOSE 3000
