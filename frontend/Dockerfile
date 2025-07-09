# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# The frontend app typically runs on port 8080 or 3001 (adjust if different)
# For a React app (created with create-react-app), it's often 3000, but backend is using it.
# Let's assume a common alternative like 8080 for now.
EXPOSE 8080

# Command to start the frontend development server (adjust as needed for your specific framework)
# For example, for React (create-react-app): CMD [ "npm", "start" ]
# For Vue CLI: CMD [ "npm", "run", "serve" ]
# For Angular CLI: CMD [ "ng", "serve", "--host", "0.0.0.0" ]
# Using a generic placeholder, assuming the user will adjust.
CMD [ "npm", "start" ]
