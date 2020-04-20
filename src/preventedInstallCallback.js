const callbacks = [];
let installEvent;

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

/**
 * Setups Install Listener on first Import of this file (not function execution) and saves install prompt for later use.
 * Pass Function wich gets called when install event was recieved
 *
 * Make sure you import this file early. Otherwise you could miss the beforeinstallprompt
 * @param {function} preventCallback gets called with prevented Install Event as Parameter
 */
const preventedInstallCallback = (preventCallback) => {
  if (installEvent) return preventCallback(installEvent);

  callbacks.push(preventCallback);
};

export { preventedInstallCallback };
