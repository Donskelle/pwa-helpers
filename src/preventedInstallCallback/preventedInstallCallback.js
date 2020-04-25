const callbacks = [];
let installEvent;

const invalidateInstallEvent = () => {
  console.log('invalidateInstallEvent');
};

// Extends the Install UserChoice Promise to keep track of outcome
const proxyUserChoice = ({ userChoice }) => {
  console.log(userChoice);
  return new Proxy(userChoice, {
    get(target, prop) {
      if (prop === 'then') {
        console.log('proxyUserChoice');

        const originalThen = target.then.bind(target);

        const newThen = function (userThenFunction) {
          return originalThen((value) => {
            if (value.outcome !== 'accepted') {
              invalidateInstallEvent();
            }
            return userThenFunction(value);
          });
        }; // .bind(target);

        return newThen;
      }
    },
  });
};

/**
 * Prevent Pwa Install Prompt
 * You can add callbacks and access install prompt via preventedInstallCallback
 */
const preventPwaInstallAndSavePrompt = () => {
  window.addEventListener(
    'beforeinstallprompt',
    (e) => {
      e.preventDefault();
      installEvent = proxyUserChoice(e);

      callbacks.forEach((cb) => cb(installEvent));
      callbacks.slice(0, callbacks.length);
    },
    { once: true }
  );
};

/**
 * Add Callback that gets called when install is availble or availble event gets invalid
 * Pass Callback Function
 *
 * @param {function} preventCallback gets called with prevented Install Event as Parameter or null when install is unvalid
 */
const addInstallCallback = (preventCallback) => {
  callbacks.push(preventCallback);

  if (installEvent) return preventCallback(installEvent);
};

/**
 * Add Callback that gets called when install is availble or availble event gets invalid
 * Pass Callback Function
 *
 * @param {function} preventCallback gets called with prevented Install Event as Parameter or null when install is unvalid
 */
const removeInstallCallback = (preventCallback) => {
  callbacks.push(preventCallback);

  if (installEvent) return preventCallback(installEvent);
};

export { preventPwaInstallAndSavePrompt, addInstallCallback, removeInstallCallback };
