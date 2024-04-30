FROM node

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

ENV PORT 150

EXPOSE $PORT

CMD [ "npm", "start" ]