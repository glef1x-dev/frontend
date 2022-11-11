FROM node:18-alpine AS base

ARG PNPM_VERSION=7.15.0

RUN npm install -g pnpm@$PNPM_VERSION
WORKDIR /root/frontend-app

FROM base AS builder
COPY pnpm-lock.yaml .npmrc package.json pnpm-workspace.yaml ./
COPY app/package.json ./app/package.json
RUN --mount=type=cache,id=pnpm-store,target=/root/.pnpm-store\
 pnpm install --filter "app" --frozen-lockfile\
 --unsafe-perm\
 # ↑ Docker runs pnpm as root and then pnpm won't run package scripts unless we pass this arg
 | grep -v "cross-device link not permitted\|Falling back to copying packages from store"
 # ↑ This inverted grep match is because using Docker's 'cache' mount type
 # causes Docker to place the pnpm content-addressable store on a different virtual drive,
 # which prohibits pnpm from symlinking its content to its virtual store (in node_modules/.pnpm),
 # and that causes pnpm to fall back on copying the files. And that's fine,
 # except pnpm emits a lot of warnings doing that, so here we filter out those warnings.

COPY . .
RUN NODE_ENV=production pnpm run app:build


FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /root/frontend-app/app/dist/ /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
