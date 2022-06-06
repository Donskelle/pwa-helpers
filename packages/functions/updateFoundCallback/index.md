# updateFoundCallback

Setups Listener for Service Worker Update
Calls the callback function, when another service worker is ready to be activated. Your callback gets another function as parameter trigger the update progress.

When you trigger the update progress, a message with SKIP_WAITING will sen to the Service Worker to force skipWaiting execution in sw.

Setup handler in service worker manually by adding the following code:

```js
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
```

Or use workbox / sw-precache to generate your serivce worker. These libaries set up such handlers exactly the same way.

## Usage

```ts
export { updateFoundCallback } from '@donskelle/pwa-helpers';

updateFoundCallback();
```

## Demo
