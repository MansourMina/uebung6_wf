# Start your image with a node base image
FROM node:22

# The /app directory should act as the main application directory
WORKDIR /app

# Copy the app package and package-lock.json file
COPY package*.json ./

# Install node packages, install serve, build the app, and remove dependencies at the end
RUN npm install 

# Copy local directories to the current local directory of our docker image (/app)
COPY . .

ENV PORT=3000

EXPOSE 5000

# Start the app using serve command
CMD [ "npm", "start" ]