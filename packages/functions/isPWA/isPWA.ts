const pwaDisplayModesMediaQueryList =
  '(display-mode: standalone), (display-mode: minimal-ui), (display-mode: fullscreen)';
let pwaStatus: boolean | undefined;

// Check if website is displayed as pwa.
const isPWA = (): boolean => {
  if (typeof pwaStatus === 'undefined') {
    pwaStatus = window.matchMedia(pwaDisplayModesMediaQueryList).matches ?? false;

    // if currently not shown as pwa, init a listener
    if (!pwaStatus) {
      window.matchMedia(pwaDisplayModesMediaQueryList).addEventListener('change', ({ matches }) => {
        pwaStatus = matches;
      });
    }
  }
  return pwaStatus!;
};

export { isPWA };
