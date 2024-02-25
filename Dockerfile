FROM node:21.5

WORKDIR /rick-and-morty-api-clone
COPY package.json .
RUN npm install

COPY . .
CMD npm start

