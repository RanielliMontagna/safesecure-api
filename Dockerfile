FROM node:18-alpine

## Create app directory
WORKDIR /app

## Copy package.json and package-lock.json
COPY package*.json ./

## Copy generated prisma files
COPY prisma ./prisma/

## Install dependencies
RUN npm install

## Copy app source
COPY . .

## Build app
RUN npm run prisma:generate

## Expose port
EXPOSE 3333

## Start app
CMD [ "npm", "run", "dev:docker"]

