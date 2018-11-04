FROM node

WORKDIR /code
COPY package*.json /code/
RUN npm install

COPY . /code
CMD ["node", "server.js"]
EXPOSE 8080