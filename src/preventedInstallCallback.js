const callbacks = [];
let installEvent;

/**
 * Prevent Pwa Install Prompt
 * You can add callbacks and access install prompt via preventedInstallCallback
 */
const preventPwaInstallAndSavePrompt = () => {
  window.addEventListener(
    "beforeinstallprompt",
    (e) => {
      e.preventDefault();
      installEvent = e;

      callbacks.forEach(cb);
      callbacks = undefined;
    },
    { once: true }
  );
};

/**
 * Add Callback that gets called when install is availble
 * Pass Function wich gets called when install event was recieved
 *
 * @param {function} preventCallback gets called with prevented Install Event as Parameter
 */
const preventedInstallCallback = (preventCallback) => {
  if (installEvent) return preventCallback(installEvent);

  callbacks.push(preventCallback);
};

export { preventPwaInstallAndSavePrompt, preventedInstallCallback };
