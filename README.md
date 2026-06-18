<p align="center">
  <a href="https://www.zo.computer/">
    <img src="https://www.zo.computer/wordmark.svg" alt="Zo Computer" width="220">
  </a>
</p>

# zocomputer-ts

[![npm version](https://img.shields.io/npm/v/zocomputer.svg)](https://www.npmjs.com/package/zocomputer)
[![Nightly release](https://github.com/EthanThatOneKid/zocomputer-ts/actions/workflows/nightly-release.yml/badge.svg)](https://github.com/EthanThatOneKid/zocomputer-ts/actions/workflows/nightly-release.yml)

Unofficial TypeScript client library for the Zo Computer API, generated nightly from Zo Computer's public OpenAPI spec at <https://docs.zocomputer.com/openapi.json>.

Distributed on npm as `zocomputer` for convenience. This package is not published by, endorsed by, or maintained by Zo Computer.

## Trust and provenance

This npm package is community-maintained and unofficial. The API schema source is Zo Computer's public OpenAPI document at <https://docs.zocomputer.com/openapi.json>, fetched by `scripts/sync-openapi.mjs` and checked in at `openapi/openapi.json` for transparency.

The type-safe client is generated from that OpenAPI snapshot with [@hey-api/openapi-ts](https://github.com/hey-api/openapi-ts). The package also exports the snapshot as `zocomputer/openapi.json` so consumers can inspect the exact schema used for generation.

New to Zo? [Create a free account with $10 in AI credit](https://zo-computer.cello.so/fFG5xDTfXhY).

## Install

```bash
npm install zocomputer
```

## Usage

```ts
import { createClient, zoAsk } from 'zocomputer';

const client = createClient({
  auth: process.env.ZO_API_KEY,
});

const { data, error } = await zoAsk({
  client,
  body: {
    input: 'Hello, Zo!',
  },
});

if (error) {
  throw error;
}

console.log(data.output);
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
