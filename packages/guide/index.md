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
yarn add @donskelle/pwa-helpers
```

## Minimal Manifest

#### `manifest.json`

Create a `manifest.json` file in your published root directory.

```json
{
  "name": "My App",
  "start_url": "/",
  "display": "standalone",
  "icons": [
    {
      "src": "android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

#### `index.html`

Reference created manifest file:

```html
<head>
  ...
  <link rel="manifest" href="/manifest.json" />
  ...
</head>
```

## Service Worker

Create a `service-worker.js` file in your published root directory.

#### `service-worker.js`

```js
/* START Service Worker install avaiable Requirements */
// Only needed for chromium based browser (https://web.dev/install-criteria/#criteria)
// Experiment to remove: https://groups.google.com/a/chromium.org/g/blink-dev/c/0uhGufIFLeo/m/qp9QKQXoEwAJ?utm_medium=email&utm_source=footer&pli=1
self.addEventListener('fetch', () => {});
/* END Service Worker install avaiable Requirements */

/* Make Service worker updatable */
self.addEventListener('message', (event) => {
  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});
```

#### `index.html`

Reference created service worker file:

```html
<head>
  <script>
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js');
    }
  </script>
</head>
```
