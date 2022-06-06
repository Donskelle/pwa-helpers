# InstallAvailableObserver
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

## Demo
