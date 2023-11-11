FROM node:latest



WORKDIR /app

COPY package*.json /app/

RUN npm install

RUN npm install -g express
RUN npm install -g nodemon
COPY . /app/
EXPOSE 5000

CMD ["nodemon","server.js"]