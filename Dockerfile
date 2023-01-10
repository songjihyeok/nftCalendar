FROM node:14-buster

#RUN apk add --no-cache libc6-compat python2 make g++

WORKDIR /var/app

COPY package*.json ./

RUN npm install --production

COPY .next ./.next

CMD npm run start
