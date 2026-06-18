<p align="center">
  <a href="https://www.zo.computer/">
    <img src="https://www.zo.computer/wordmark.svg" alt="Zo Computer" width="220">
  </a>
</p>

# zocomputer-ts

[![npm version](https://img.shields.io/npm/v/zocomputer.svg)](https://www.npmjs.com/package/zocomputer)
[![Nightly release](https://github.com/EthanThatOneKid/zocomputer-ts/actions/workflows/nightly-release.yml/badge.svg)](https://github.com/EthanThatOneKid/zocomputer-ts/actions/workflows/nightly-release.yml)

TypeScript client library for the Zo Computer API, generated nightly from the public OpenAPI spec at `https://docs.zocomputer.com/openapi.json`.

Distributed on npm as `zocomputer` for convenience.

New to Zo? [Create a free account with $10 in AI credit](https://zo-computer.cello.so/fFG5xDTfXhY).

## Install

```bash
npm install zocomputer
```

## Usage

```ts
import { client, zoAsk } from 'zocomputer';

client.setConfig({
  headers: {
    Authorization: `Bearer ${process.env.ZO_API_KEY}`,
  },
});

const response = await zoAsk({
  body: {
    input: 'Hello, Zo!',
  },
});
```

## Development

```bash
npm install
npm run sync:openapi
npm run generate
npm run build
```

## Nightly release

`.github/workflows/nightly-release.yml` runs nightly and on manual dispatch. It:

1. Downloads the latest public OpenAPI spec
2. Detects whether `openapi/openapi.json` changed
3. Regenerates the client
4. Bumps the patch version
5. Commits and pushes the updated snapshot
6. Publishes the new version to npm

## npm trusted publishing

This repository is set up for npm trusted publishing with GitHub Actions OIDC, not a long-lived `NPM_TOKEN`.

Before nightly publish can work:

1. Publish `zocomputer` once manually from your npm account so the package exists on npm.
2. In npm package settings, add a trusted publisher for:
   - Owner: `EthanThatOneKid`
   - Repository: `zocomputer-ts`
   - Workflow filename: `nightly-release.yml`
   - Allowed action: `npm publish`
3. After OIDC publish is working, remove any old publish token and lock the package to trusted publishing in npm settings.

No GitHub secret is required for normal publishing after that bootstrap step.
