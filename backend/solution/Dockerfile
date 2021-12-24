FROM node:16.13.1-alpine3.14 AS builder
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run release

FROM node:16.13.1-alpine3.14
USER node
WORKDIR /usr/app
COPY --chown=node:node --from=builder /usr/app/dist /usr/app/build/health-check.js /usr/app/src/schema.sql ./
EXPOSE 5001
HEALTHCHECK --start-period=10s --interval=5s --timeout=3s CMD ["node", "health-check.js"]
ENTRYPOINT ["node", "index.js"]
