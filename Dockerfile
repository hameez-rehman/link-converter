FROM node:18 as base

ARG PORT

WORKDIR /app

ADD package.json /app/package.json
ADD package-lock.json /app/package-lock.json

RUN npm ci

ADD . /app

RUN npm run build

EXPOSE ${PORT}

CMD [ "node", "/app/dist/src/main.js" ]

