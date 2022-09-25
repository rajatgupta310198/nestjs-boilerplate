FROM node:12.13.1
MAINTAINER Rajat Gupta <rajatgupta310198@gmail.com>

WORKDIR /usr/src/app

COPY . /usr/src/app
COPY .example.env .production.env
RUN npm install --silent
RUN npm i -g @nestjs/cli
RUN apt-get update && apt-get -y install build-essential apt-utils
RUN npm start build

ENV NODE_ENV=production
ENV APP_NAME=nest-api-service

EXPOSE 3000
CMD ["npm", "run", "start:prod"]
