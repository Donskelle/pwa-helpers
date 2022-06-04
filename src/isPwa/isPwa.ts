const pwaDisplayModesMediaQueryList =
  '(display-mode: standalone), (display-mode: minimal-ui), (display-mode: fullscreen)';
let pwaStatus: boolean | undefined;

/**
 * Check if app is displayed as pwa
 * Use this function to:
 * - Performance: reduce dom interactions
 * - reduce state management
 * @returns {boolean} isPwa
 */
const isPwa = (): boolean => {
  if (typeof pwaStatus === 'undefined') {
    pwaStatus = window.matchMedia(pwaDisplayModesMediaQueryList).matches;

    // if currently not shown as pwa, init a listener
    if (!pwaStatus) {
      window.matchMedia(pwaDisplayModesMediaQueryList).addEventListener('change', ({ matches }) => {
        pwaStatus = matches;
      });
    }
  }
  return pwaStatus!;
};

export { isPwa };
