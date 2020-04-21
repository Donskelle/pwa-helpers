let pwaStatus;

/**
 * Check if app is started as pwa.
 * Use this function to reduce dom interactions, stay in js thread
 * and reduce state management
 * @returns {boolean}
 */
const isPwa = () => {
  if (typeof pwaStatus === 'undefined') {
    pwaStatus =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true;
  }
  return pwaStatus;
};

export { isPwa };
