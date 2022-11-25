# Frontend source code of `glefix.xyz`

## Features

- Optimized for serverless deployment to CDN edge locations (Cloudflare Workers)
- HTML page rendering (SSR) at CDN edge locations, all ~100 points on Lighthouse
- Hot module replacement during local development using React Refetch
- Pre-configured with CSS-in-JS styling using Emotion.js
- Pre-configured with code quality tools: ESLint, Prettier, TypeScript, Jest, etc.
- Pre-configured with VSCode code snippets and other VSCode settings
- The ongoing design and development is supported by these wonderful companies:

## Directory Structure

`├──`[`.github`](.github) — GitHub configuration including CI/CD workflows<br>
`├──`[`app`](app) — Web application front-end built with [React](https://reactjs.org/) and [Material UI](https://mui.com/core/)<br>
`├──`[`edge`](edge) — Cloudflare Workers (CDN) edge endpoint<br>
`├──`[`env`](env) — Application settings, API keys, etc.<br>
`├──`[`scripts`](scripts) — Automation scripts such as `yarn deploy`<br>
`├──`[`tsconfig.base.json`](tsconfig.base.json) — The common/shared TypeScript configuration<br>
`└──`[`tsconfig.json`](tsconfig.json) — The root TypeScript configuration<br>

## Tech Stack

- [React](https://reactjs.org/), [React Router](https://reactrouter.com/), [Recoil](https://recoiljs.org/),
  [Emotion](https://emotion.sh/), [Material UI](https://next.material-ui.com/),
- [Vite](https://vitejs.dev/), [Rollup](https://rollupjs.org/),
  [TypeScript](https://www.typescriptlang.org/), [ESLint](https://eslint.org/),
  [Prettier](https://prettier.io/), [Jest](https://jestjs.io/),
  [Yarn](https://yarnpkg.com/) with PnP

## Getting Started

[Generate](https://github.com/kriasoft/react-starter-kit/generate) a new project
from this template, clone it, install project dependencies, update the
environment variables found in [`env/*.env`](env/), and start hacking:

```
$ git clone https://github.com/glef1x-dev/frontend frontend
$ cd ./frontend
$ pnpm install
$ pnpm run start
```
