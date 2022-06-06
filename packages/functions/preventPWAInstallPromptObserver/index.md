# preventPWAInstallPromptObserver

Non Standard!

Prevent PWA Install Prompt and lets you controll when you want to call the install prompt.
Only supported by few browsers. Got removed from manifest standard.

Relies on:
https://developer.mozilla.org/en-US/docs/Web/API/BeforeInstallPromptEvent

## Usage

First Setup the observer to prevent Browser install prompt and save the event to use it later.

```ts
export { setupPreventPWAInstallPromptObserver } from '@donskelle/pwa-helpers';

setupPreventPWAInstallPromptObsever();
```

Then you can add and remove observer at any later time to request the event and initiate the prompt.

```ts
export { addPreventPWAInstallPromptObserver } from '@donskelle/pwa-helpers';

addPreventPWAInstallPromptObserver((event?: BeforeInstallPromptEvent) => {
  localdata.isInstallAvailable = !!event;
  localdata.installEvent = event;
});

// later on button click or any other event you can initiate the prompt
localdata.prompt();
```

You need to remove the observer as well

```ts
export { removePreventPWAInstallPromptObserver } from '@donskelle/pwa-helpers';

removePreventPWAInstallPromptObserver();
```

<script setup>
import Demo from './demo.vue'
</script>

## Demo

<DemoContainer>
  <p class="demo-source-link"><a href="https://github.com/donskelle/pwa-helpers/tree/master/packages/functions/installAvailableObserver/demo.vue" targat="blank">source</a></p>
  <Demo/>
</DemoContainer>
