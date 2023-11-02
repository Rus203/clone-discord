FROM node:18

WORKDIR /discord_app

COPY . .

RUN yarn

RUN npx prisma generate

EXPOSE $APP_PORT