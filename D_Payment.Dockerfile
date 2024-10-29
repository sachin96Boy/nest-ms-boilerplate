FROM node:20-alpine
RUN npm install -g npm@10.8.1

WORKDIR /usr/local/apps/spare_parts/payment

COPY ./common ./common

WORKDIR /usr/local/apps/spare_parts/payment/container/inside

COPY ./services/payment-gateway-service/package.json ./
COPY .env ./

WORKDIR /usr/local/apps/spare_parts/payment
RUN cd ./common && npm install && npm cache clean --force && npm run build && cd ../container/inside && npm install && npm cache clean --force

WORKDIR /usr/local/apps/spare_parts/payment/container/inside
ENV PATH=/usr/local/apps/spare_parts/payment/container/inside/node_modules/.bin:$PATH

WORKDIR /usr/local/apps/spare_parts/payment/container/inside/code

COPY ./services/payment-gateway-service .

CMD npm run start:dev
