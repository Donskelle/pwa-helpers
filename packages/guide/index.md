# Get Started

## Requirements

- Library only provides es module export
- Your Web App need to meet the pwa criteria to use features of this library. Lookup [pwa-criteria @ web.dev](https://web.dev/install-criteria/#criteria). Minimal examples are provided:
  - Create Manifest
  - Create and init service worker

## Installation

#### PNpM

```bash
pnpm add @donskelle/pwa-helpers
```

#### npm

```bash
npm i @donskelle/pwa-helpers
```

#### Yarn

```bash
yarn i @donskelle/pwa-helpers
```

## Minimal Manifest

#### manifest.json

```json
{
  "name": "My App"
}
```

#### index.html

```html
<head>
  ...
  <link rel="manifest" href="/manifest.json" />
  ...
```

## Minimal Service Worker

#### service-worker.js

```js
```

#### idnex.html

```js
```
