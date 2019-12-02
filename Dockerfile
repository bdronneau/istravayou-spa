FROM node:lts as builder

WORKDIR /app
COPY . .

RUN npm ci \
 && npm run build

FROM vibioh/viws

ARG APP_VERSION
ENV VERSION=${APP_VERSION}
COPY --from=builder /app/dist/ /www/