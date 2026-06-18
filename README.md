# zocomputer

TypeScript client package for the Zo Computer API, generated from the public OpenAPI spec at `https://docs.zocomputer.com/openapi.json`.

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

Required GitHub secret:

- `NPM_TOKEN` with publish access for the `zocomputer` package
