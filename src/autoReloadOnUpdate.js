const autoUpdateAndReload = async () => {
  let isReloading = false;
  let newWorker;

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
            skipWaiting();
          }
        });
      });

      if (reg.waiting && navigator.serviceWorker.controller) {
        newWorker = reg.waiting;
        skipWaiting();
      }
    }

    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (isReloading) return;
      window.location.reload();
      isReloading = true;
    });
  }
};

export { autoUpdateAndReload };
