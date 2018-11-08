FROM node

WORKDIR /code
COPY package*.json /code/
RUN npm install

COPY . /code
EXPOSE 8080