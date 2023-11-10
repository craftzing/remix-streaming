# dependencies
FROM node:20-alpine AS dependencies
WORKDIR /code

COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock

RUN yarn --frozen-lockfile --production

# build
FROM node:20-alpine AS build
WORKDIR /code

COPY . .
COPY --from=dependencies /code/node_modules ./node_modules

RUN yarn --frozen-lockfile
RUN yarn build --sourcemap

# production image
FROM node:20-alpine AS production
WORKDIR /code

ENV PORT 3000
EXPOSE $PORT

ARG NEXT_PUBLIC_VERSION
ARG NEXT_PUBLIC_COMMIT_SHA
ARG NEXT_PUBLIC_BUILD_TIMESTAMP

ENV NEXT_PUBLIC_VERSION=$NEXT_PUBLIC_VERSION
ENV NEXT_PUBLIC_COMMIT_SHA=$NEXT_PUBLIC_COMMIT_SHA
ENV NEXT_PUBLIC_BUILD_TIMESTAMP=$NEXT_PUBLIC_BUILD_TIMESTAMP

COPY --from=dependencies /code/node_modules ./node_modules
COPY --from=build /code/build /code/build
COPY --from=build /code/public /code/public
COPY ./package.json ./package.json
COPY ./remix.config.js ./remix.config.js

CMD ["yarn", "start"]
