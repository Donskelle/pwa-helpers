let pwaStatus;

/**
 * Check if app is started as pwa.
 * Use this function to:
 * - Performance: reduce dom interactions
 * - reduce state management
 * @returns {boolean} isPwa
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
