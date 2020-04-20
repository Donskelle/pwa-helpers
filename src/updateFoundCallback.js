/**
 * Setups Listener for Service Worker Update. Calls given Callback
 * @param {function} cb with skipWaiting function as parameter. This functions sends
 * SKIP_WAITING Message to Service Worker to force skipWaiting execution
 * Setup handler in service worker manually by adding:
 *  self.addEventListener("message", (event) => {
 *    if (event.data && event.data.type === "SKIP_WAITING") {
 *      self.skipWaiting();
 *    }
 *  s});
 * Or use workbox / sw-precache. These libaries set up such handlers by default
 */
const updateFoundCallback = async (cb) => {
  let newWorker;
  let isReloading = false;


  const skipWaiting = () => {
    if (!newWorker) return;
    newWorker.postMessage({ type: "SKIP_WAITING" });
  };

  if ("serviceWorker" in navigator) {
    const reg = await navigator.serviceWorker.getRegistration();
    if (reg) {
      reg.addEventListener("updatefound", () => {
        newWorker = reg.installing;
        newWorker.addEventListener("statechange", () => {
          if (
            newWorker.state === "installed" &&
            navigator.serviceWorker.controller
          ) {
            cb(skipWaiting);
          }
        });
      });

      if (reg.waiting && navigator.serviceWorker.controller) {
        newWorker = reg.waiting;
        cb(skipWaiting);
      }
    }

    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (isReloading) return;

      window.location.reload();
      isReloading = true;
    });
  }
}

export { updateFoundCallback };
