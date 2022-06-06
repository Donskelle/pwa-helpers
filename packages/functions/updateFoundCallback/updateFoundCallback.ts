let isReloading = false;

export const updateFoundCallback = async (cb: (triggerUpdateAndReload: () => void) => void) => {
  let newWorker: ServiceWorker | null = null;

  const skipWaiting = () => {
    if (!newWorker) return;

    newWorker.postMessage({ type: 'SKIP_WAITING' });

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (isReloading) return;

      window.location.reload();
      isReloading = true;
    });
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
  }
};
