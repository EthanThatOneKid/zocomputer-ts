# zocomputer-ts

Repository for the `zocomputer` npm package.

TypeScript client package for the Zo Computer API, generated from the public OpenAPI spec at `https://docs.zocomputer.com/openapi.json`.

- Repository: `EthanThatOneKid/zocomputer-ts`
- Package: `zocomputer`

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
