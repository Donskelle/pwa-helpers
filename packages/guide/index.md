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

Create a manifest.json file in your published root directory.

```json
{
  "name": "My App"
}
```

#### index.html

Reference created manifest file:

```html
<head>
  ...
  <link rel="manifest" href="/manifest.json" />
  ...
</head>
```

## Service Worker

#### service-worker.js

```js
```

#### index.html

```js
```
