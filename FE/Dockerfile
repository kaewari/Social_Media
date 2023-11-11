FROM node:latest

EXPOSE 3000

WORKDIR /app

# RUN npm i npm@latest -g

COPY package.json package-lock.json ./

RUN npm install --force

RUN npm install -g nodemon

COPY . .

CMD ["npm", "start"]