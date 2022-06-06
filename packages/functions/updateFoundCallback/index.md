# updateFoundCallback

Setups Listener for Service Worker Update
Calls the callback function, when another service worker is ready to be activated. Your callback gets another function as parameter trigger the update progress.

When you trigger the update progress, a message with data type `SKIP_WAITING` will send to the Service Worker to force skipWaiting execution in sw.

Setup handler in service worker manually by adding the following code:

```js
// service-worker.js
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
```

Or use workbox / sw-precache to generate your serivce worker. These libaries set up such handlers exactly the same way, so you can use them interchangeably.

## Usage

```ts
export { updateFoundCallback } from '@donskelle/pwa-helpers';

updateFoundCallback();
```

<script setup>
import Demo from './demo.vue'
</script>

## Demo

<DemoContainer>
  <p class="demo-source-link"><a href="https://github.com/donskelle/pwa-helpers/tree/master/packages/functions/updateFoundCallback/demo.vue" targat="blank">source</a></p>
  <Demo/>
</DemoContainer>
