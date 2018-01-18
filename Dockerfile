FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./
COPY yarn.lock ./

RUN yarn install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY src/* ./

EXPOSE 3000
CMD [ "yarn", "start" ]
