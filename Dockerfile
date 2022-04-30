FROM keymetrics/pm2:latest-alpine

RUN mkdir -p /home/Service
WORKDIR /home/Service
COPY . /home/Service

RUN npm install

CMD ["pm2-docker", "start", "./config/pm2.json"]