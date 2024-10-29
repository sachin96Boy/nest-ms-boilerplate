FROM node:20-alpine
RUN npm install -g npm@10.8.1

WORKDIR /usr/local/apps/spare_parts/user

COPY ./common ./common

WORKDIR /usr/local/apps/spare_parts/user/container/inside

COPY ./services/user-service/package.json ./
COPY .env ./

WORKDIR /usr/local/apps/spare_parts/user
RUN cd ./common && npm install && npm cache clean --force && npm run build && cd ../container/inside && npm install && npm cache clean --force

WORKDIR /usr/local/apps/spare_parts/user/container/inside
ENV PATH=/usr/local/apps/spare_parts/user/container/inside/node_modules/.bin:$PATH

WORKDIR /usr/local/apps/spare_parts/user/container/inside/code

COPY ./services/user-service .
# RUN npm run migration:run
CMD npm run start:dev
