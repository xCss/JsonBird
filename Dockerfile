FROM node:4.5.0

# RUN npm i -g forever

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app

ENV PORT 80
EXPOSE 80

ENTRYPOINT ["node", "app.js"]