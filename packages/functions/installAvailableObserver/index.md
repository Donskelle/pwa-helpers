# installAvailableObserver

Non Standard!

Prevent PWA Install Prompt and lets you controll when you want to call the install prompt.
Only supported by few browsers. Got removed from manifest standard.

Relies on:
https://developer.mozilla.org/en-US/docs/Web/API/BeforeInstallPromptEvent

## Usage

```ts
export { installAvailableObserver } from '@donskelle/pwa-helpers';

installAvailableObserver();
```

<script setup>
import Demo from './demo.vue'
</script>

## Demo

<DemoContainer>
  <p class="demo-source-link"><a href="https://github.com/donskelle/pwa-helpers/tree/master/packages/functions/installAvailableObserver/demo.vue" targat="blank">source</a></p>
  <Demo/>
</DemoContainer>
