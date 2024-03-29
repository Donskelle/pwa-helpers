# updateFoundCallback

Setups Listener for Service Worker Update.

Calls the callback function, when another service worker is ready to be activated. Your callback gets another function as parameter to start the update progress.

When you call the function, a message with data type `SKIP_WAITING` will be send to the Service Worker to force skipWaiting execution in sw. You can also setup a listener controlling Service Worker change, when this happens a reload will be triggered to avoid potential problems between installed files in different version.

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

<script setup>
import Demo from './demo.vue'
</script>

## Demo

<DemoContainer>
  <p class="demo-source-link"><a href="https://github.com/donskelle/pwa-helpers/tree/master/packages/functions/updateFoundCallback/demo.vue" targat="blank">source</a></p>
  <Demo/>
</DemoContainer>

## Usage

Setup Listener
```ts
export { updateFoundCallback } from '@donskelle/pwa-helpers';

let callSkipWaiting;
updateFoundCallback((cb: (options?: {reload: true}) => void) => {
  callSkipWaiting = cb;
});
```

Display Banner or Button depending of callSkipWaiting is set and setup click listener to call callSkipWaiting
```html
<button v-if="!!callSkipWaiting" @click="() => callSkipWaiting({reload: true})">Install</button>
```


