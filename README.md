# pwa-helpers

[![Netlify Status](https://api.netlify.com/api/v1/badges/5fa67289-f59c-429d-9029-dd220266c629/deploy-status)](https://pwa-helper.netlify.app)

PWA utility library. This library provides some function to help you get started in pwa creation. Visit demo page [here](https://pwa-helper.netlify.app).
No external dependencies

### Installation

```
npm i @donskelle/pwa-helpers
```

#### Manifest

Lookup manifest properties [here](https://developer.mozilla.org/en-US/docs/Web/Manifest) or use this [generator](https://app-manifest.firebaseapp.com/).
Be aware that manifest specification is not stable. So you should look it up [here](https://www.w3.org/TR/appmanifest/) and subscribe to changes, when you wanna use it in production.

Some examples of manifest:

- Tinder [manifest.json](https://tinder.com/manifest-en.json)
- Starbucks [manifest.json](https://app.starbucks.com/manifest.json)
- About You [manifest.json](https://m.aboutyou.de/manifest.json)
- Spotify https://open.spotify.com/ Manifest is hashed so lookup by inspecting network tab

iOS still doens't support all fields of it manifest. You need set additional meta tags in head. Look them up here: https://firt.dev/notes/pwa-ios/#apple-non-standard-pwa-related-abilities

#### Service Worker

Your service worker should be generated, if you want offline support or generally cache things.
To generate a service worker goto [workbox](https://developers.google.com/web/tools/workbox) or lookup a library based solution (e.g. create-react-app, vue-cli).
They will use workbox under the hood as well but hide some configuration.

### Example

```javascript
import { idleFramePromise } from '@donskelle/pwa-helpers';

const initNotBlockingMaintreadTask = async () => {
  heavyWork1();
  await idleFramePromise();
  heavyWork2();
  await idleFramePromise();
  heavyWork3();
};
```

#### React Hoooooks

```javascript
import { useEffect } from 'react';
import { preventLeavingPWAScope } from '@donskelle/pwa-helpers';

function preventLeavingPWAScope(ref) {
  useEffect(() => {
    if (!ref.current) return;

    return preventLeavingPWAScope(ref.current, 'tinder.com/app');
  }, [ref]);
}
```

#### Vue

```ts
import { ref, watch } from 'vue';
import { preventLeavingPWAScope } from '@donskelle/pwa-helpers';

function preventLeavingPWAScope(target: ref<HtmlElement | undefined>) {
  let unSubscribeFunction = ref<() => void>();

  onMounted(() => {
    unSubscribeFunction.value = preventLeavingPWAScope(target.value);
  });

  onUnmounted(() => unSubscribeFunction.value?.());
}
```
