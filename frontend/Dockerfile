# First Stage: to install and build dependencies
FROM node:16.13.1 as build

#set work directory
WORKDIR /app
ENV PATH /app/frontend/node_modules/.bint:$PATH

#install dependencies
COPY ./package.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start"]
