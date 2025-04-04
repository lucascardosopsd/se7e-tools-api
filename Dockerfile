FROM node:22-alpine AS builder

ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV BROWSER_PATH=/usr/bin/chromium-browser

RUN apk add --no-cache \
    chromium \
    harfbuzz \
    ca-certificates \
    nss

WORKDIR /api

COPY . .

RUN rm -rf node_modules
RUN npm i

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
