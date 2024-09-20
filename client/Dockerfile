FROM node:18

WORKDIR /app
COPY ./client/yarn.lock .
RUN yarn install
COPY ./client ./

EXPOSE 3000
CMD ["yarn", "start"]
