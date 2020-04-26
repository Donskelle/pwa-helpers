import { createObserver } from '../utils';

const { addObserver, removeObserver, updateData } = createObserver();

/**
 * Prevent Pwa Install Prompt
 * You can add callbacks and access install prompt via preventedInstallCallback
 */
const setupInstallListener = () => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    updateData(e);
    e.userChoice.then(() => {
      updateData(null);
    });
  });
};

export {
  setupInstallListener,
  addObserver as addInstallAvailableObserver,
  removeObserver as removeInstallAvailableObserver,
};
