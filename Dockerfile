FROM node:18

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY prisma ./prisma

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
