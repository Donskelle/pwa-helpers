# injectPWAStyles

This should give you an idea of what properties can be used to give your user an app like feeling in your PWA.

You shouldn't apply your PWA styles from js.
Use css to style your content. Use a css-selector dependending on current display mode to style your content accordingly.

```css
/* Selector for all pwa display-modes and fallbacks */
@media all and (display-mode: standalone), (display-mode: minimal-ui), (display-mode: fullscreen) {
  /* PWA Rules here */
}
```

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
export { injectPWAStyles } from '@donskelle/pwa-helpers';

injectPWAStyles();
```
