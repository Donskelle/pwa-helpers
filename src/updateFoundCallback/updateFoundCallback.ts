let isReloading = false;

/**
 * Setups Listener for Service Worker Update
 * @param {function} cb with skipWaiting function as parameter. This functions sends
 * SKIP_WAITING Post Message to Service Worker to force skipWaiting execution in sw.
 * Reloads when cb calls first parameter and service worker has changed
 * Setup handler in service worker manually by adding:
 *  self.addEventListener("message", (event) => {
 *    if (event.data && event.data.type === "SKIP_WAITING") {
 *      self.skipWaiting();
 *    }
 *  s});
 * Or use workbox / sw-precache. These libaries set up such handlers by default
 */
export const updateFoundCallback = async (cb: (triggerUpdate: () => void) => void) => {
  let newWorker: ServiceWorker | null = null;

  const skipWaiting = () => {
    if (!newWorker) return;
    newWorker.postMessage({ type: 'SKIP_WAITING' });
  };

  if ('serviceWorker' in navigator) {
    const reg = await navigator.serviceWorker.getRegistration();
    if (reg) {
      reg.addEventListener('updatefound', () => {
        newWorker = reg.installing;
        newWorker?.addEventListener('statechange', () => {
          if (newWorker?.state === 'installed' && navigator.serviceWorker.controller) {
            cb(skipWaiting);
          }
        });
      });

      if (reg.waiting && navigator.serviceWorker.controller) {
        newWorker = reg.waiting;
        cb(skipWaiting);
      }
    }

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (isReloading) return;

      window.location.reload();
      isReloading = true;
    });
  }
};
