FROM node:18-alpine AS base

ARG PNPM_VERSION=7.14.0

RUN npm install -g pnpm@$PNPM_VERSION

COPY . .

RUN pnpm install

ENV ENABLE_EXPERIMENTAL_COREPACK 1
RUN pnpm run --filter 'app' build
