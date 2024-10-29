FROM node:20-alpine
RUN npm install -g npm@10.8.1

WORKDIR /usr/local/apps/spare_parts/gateway

COPY ./common ./common

WORKDIR /usr/local/apps/spare_parts/gateway/container

COPY ./api-gateway/package.json ./
COPY .env ./

WORKDIR /usr/local/apps/spare_parts/gateway
RUN cd ./common && npm install && npm cache clean --force && npm run build && cd ../container && npm install && npm cache clean --force

WORKDIR /usr/local/apps/spare_parts/gateway/container
ENV PATH=/usr/local/apps/spare_parts/gateway/container/node_modules/.bin:$PATH

WORKDIR /usr/local/apps/spare_parts/gateway/container/code

COPY ./api-gateway .

CMD npm run start:dev
