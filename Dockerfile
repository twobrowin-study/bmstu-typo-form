FROM node:22-slim as front-build

WORKDIR /app

COPY typo-form/package*.json ./
COPY typo-form .
RUN npm install
RUN npm run build

FROM alpine:latest

ARG PB_VERSION=0.22.19

RUN apk add --no-cache \
    unzip \
    ca-certificates

ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/

COPY ./pb_migrations /pb/pb_migrations
COPY --from=front-build /app/build /pb/pb_public

VOLUME ["/pb/pb_data"]
EXPOSE 8080

CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8080"]