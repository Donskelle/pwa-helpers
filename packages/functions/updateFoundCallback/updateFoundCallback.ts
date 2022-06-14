let shouldReload = false;

export const updateFoundCallback = async (
  cb: (triggerUpdateAndReload: (options?: { reload: boolean }) => void) => void
) => {
  let newWorker: ServiceWorker | null = null;

  const skipWaiting = ({ reload }: { reload: boolean } = { reload: false }) => {
    if (!newWorker) return;

    newWorker.postMessage({ type: 'SKIP_WAITING' });

    shouldReload = reload;
  };
  const initCurrentServiceWorker = async () => {
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
  };

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    initCurrentServiceWorker();

    if (shouldReload) {
      window.location.reload();
      shouldReload = false;
    }
  });

  initCurrentServiceWorker();
};
