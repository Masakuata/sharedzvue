FROM node:lts-alpine

RUN npm install -g http-server

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG VUE_APP_CURRENT

ENV VUE_APP_CURRENT='http://clayrite.ddns.net:81'

RUN npm run build

EXPOSE 80

CMD ["http-server", "-p 80", "dist"]