# injectPWAStyles

This should give you an idea what properties can be used.

You shouldn't apply your PWA styles from js.
Use css to style your content. Use a css-selector dependending on current display mode to style your content accordingly.

```css
/* Selector for all pwa display-modes and fallbacks */
@media all and (display-mode: standalone), (display-mode: minimal-ui), (display-mode: fullscreen) {
  /* PWA Rules here */
}
```

## Usage

```ts
export { injectPWAStyles } from '@donskelle/pwa-helpers';

injectPWAStyles();
```

## Demo
