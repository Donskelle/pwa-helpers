# isPWA

Check if website is displayed as PWA.

There is no way to check, if website is installed as PWA.

<script setup>
import Demo from './demo.vue'
</script>

## Demo

<DemoContainer>
  <p class="demo-source-link"><a href="https://github.com/donskelle/pwa-helpers/tree/master/packages/functions/isPWA/demo.vue" targat="blank">source</a></p>
  <ClientOnly><Demo/></ClientOnly >
</DemoContainer>

## Usage

```ts
export { isPWA } from '@donskelle/pwa-helpers';

isPWA();
```
