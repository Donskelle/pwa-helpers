# preventLeavingPWAScope

A common problem in PWA's is navigating out of the PWA scope. Your app will turn in a browser without an adressbar. This won't happen, if you have set `target="_blank"` on all your external anchor links. Then these links will open in a new tab.

Is some cases you want your app to be able to navigate out of the PWA scope, like using sso login or payments.

This function will listen for any anchor clicks and change the anchor to \_blank, if it is a navigation leaving your pwa scope.

<script setup>
import Demo from './demo.vue'
</script>

## Demo

<DemoContainer>
  <p class="demo-source-link"><a href="https://github.com/donskelle/pwa-helpers/tree/master/packages/functions/preventLeavingPWAScope/demo.vue" targat="blank">source</a></p>
  <Demo/>
</DemoContainer>

## Usage

```ts
export { preventLeavingPWAScope, isPWA } from '@donskelle/pwa-helpers';

isPWA() && preventLeavingPWAScope();
```
