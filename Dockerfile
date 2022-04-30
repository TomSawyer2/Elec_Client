FROM node:lts

RUN mkdir -p /home/Service
WORKDIR /home/Service
COPY . /home/Service

RUN npm install

CMD ["npm", "start"]