FROM node:16.14.2-alpine3.15 AS builder
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run release

FROM node:16.14.2-alpine3.15
USER node
WORKDIR /usr/app
COPY --chown=node:node --from=builder /usr/app/dist /usr/app/build/health-check.js /usr/app/src/schema.sql ./
EXPOSE 5001
HEALTHCHECK --start-period=30s --interval=15s --timeout=1s CMD ["node", "health-check.js"]
ENTRYPOINT ["node", "index.js"]
