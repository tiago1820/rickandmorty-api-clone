FROM node:21.5

WORKDIR /rick-and-morty-api-clone/api
COPY package.json .
RUN npm install

COPY . .
CMD npm start

