FROM node:16-alpine

WORKDIR /app

ADD . .

EXPORT 3000

CMD [ "yarn", "start" ]
