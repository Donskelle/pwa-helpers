# preventLeavingPWAScope

A common problem in PWA's is navigating out of the pwa scope.

Your app will turn in a browser without an adressbar. This won't happen, if you set `target="_blank"` on all your anchor links.

This function will listen for any anchor clicks and change the anchor to \_blank, if it is a navigation which leaves your pwa scope and not opening new browser tab.

## Usage

```ts
export { preventLeavingPWAScope } from '@donskelle/pwa-helpers';

const init = () => {
  ...
  preventLeavingPWAScope();
  ...
};
```

<script setup>
import Demo from './demo.vue'
</script>

## Demo

<DemoContainer>
  <p class="demo-source-link"><a href="https://github.com/donskelle/pwa-helpers/tree/master/packages/functions/preventLeavingPWAScope/demo.vue" targat="blank">source</a></p>
  <Demo/>
</DemoContainer>
