FROM node:20-alpine
RUN npm install -g npm@10.8.1

WORKDIR /usr/local/apps/spare_parts/email

COPY ./common ./common

WORKDIR /usr/local/apps/spare_parts/email/container/inside

COPY ./services/email-service/package.json ./
COPY .env ./

WORKDIR /usr/local/apps/spare_parts/email
RUN cd ./common && npm install && npm cache clean --force && npm run build && cd ../container/inside && npm install && npm cache clean --force

WORKDIR /usr/local/apps/spare_parts/email/container/inside
ENV PATH=/usr/local/apps/spare_parts/email/container/inside/node_modules/.bin:$PATH

WORKDIR /usr/local/apps/spare_parts/email/container/inside/code

COPY ./services/email-service .

CMD npm run start:dev
