FROM node:alpine
WORKDIR /app
COPY package.json .
COPY . .
RUN yarn
CMD ["yarn", "start"]
EXPOSE 3000