const callbacks = [];
let installEvent;

window.addEventListener(
  "beforeinstallprompt",
  (e) => {
    e.preventDefault();
    installEvent = e;
    callbacks.forEach((cb) => cb(installEvent));
    callbacks = undefined;
  },
  { once: true }
);

/**
 * Setups Install Listener on Import (not function execution) and saves prompt for later use.
 * Pass Function wich gets called when install event was recieved
 * @param {function} preventCallback gets called with prevented Install Event as Parameter
 */
const getInstallCallback = (preventCallback) => {
  if (installEvent) return preventCallback(installEvent);

  callbacks.push(preventCallback);
};

export { getInstallCallback };
