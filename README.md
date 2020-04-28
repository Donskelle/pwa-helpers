# pwa-helpers

[![Netlify Status](https://api.netlify.com/api/v1/badges/5fa67289-f59c-429d-9029-dd220266c629/deploy-status)](https://app.netlify.com/sites/pwa-helper-demo/deploys)

PWA utility libary. This libary provides some function to help you get started in pwa creation. Visit demo page [here](https://pwa-helper-demo.netlify.app)

### Installation

```
npm i @donskelle/pwa-helpers
```

### Requirements

- Only support es module
- Your Web App need to meet the pwa critera.
  - Create Manifest
  - Create and init service worker
  - Lookup minimal requirements in [demo folder](https://github.com/Donskelle/pwa-helpers/tree/master/demo)

#### Manifest

Lookup manifest properties [here](https://developer.mozilla.org/en-US/docs/Web/Manifest) or use this [generator](https://app-manifest.firebaseapp.com/)

Some examples of manifest:

- Tinder [manifest.json](https://tinder.com/manifest.json)
- Spotify https://open.spotify.com/ Manifest is hashed so lookup by inspecting network tab
- Alibaba https://www.alibaba.com/ Manifest is a/b tested. Lookup in network tab

Ios doens't support that file. You need set additional meta tags in head.

#### Service Worker

Your service worker should be generated.

This is because during build a hash of a all installed files get created and used to detect file changes.
The service worker gets updated on every page visit but if the service worker wouldn't contain hashes, changes to other installed files wouldn't be detected.
To generate a service worker goto [workbox](https://developers.google.com/web/tools/workbox) or lookup a libary based solution (e.g. create-react-app, vue-cli).
They will use workbox under the hood as well but hide some configuration.

### Example

```javascript
import { idleFramePromise } from '@donskelle/pwa-helpers';

const initFunctionBlockingMaintread = async () => {
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
import { preventAnchorLeavingScopeClick } from '@donskelle/pwa-helpers';

function usePreventAnchorLeavingScopeClick(ref) {
  useEffect(() => {
    if (!ref.current) return;

    return preventAnchorLeavingScopeClick(ref, 'tinder.com/app');
  }, [ref]);
}
```

#### Vue

```javascript
import { ref, watch } from 'vue';
import { preventAnchorLeavingScopeClick } from '@donskelle/pwa-helpers';

function usePreventAnchorLeavingScopeClick(target) {
  let unSubscribeFunction = ref();

  onMounted(() => {
    unSubscribeFunction = target.value.addEventListener(type, listener, options);
  });

  onUnmounted(() => {
    if (unSubscribeFunction.value) unSubscribeFunction();
  });
}
```
