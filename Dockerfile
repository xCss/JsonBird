FROM node:4.5.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/

RUN npm i -g forever
RUN npm install
COPY . /usr/src/app

#ENV PORT 80
EXPOSE 3000

#ENTRYPOINT ["node", "app.js"]
CMD forever start --minUptime 1000 --spinSleepTime 1000 ./bin/www
