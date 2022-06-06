import {
  setupPreventPwaInstallPromptListener,
  preventAnchorLeavingScopeClick,
} from '../src/index.ts';
// This needs be called befored the service worker got installed
setupPreventPwaInstallPromptListener();
preventAnchorLeavingScopeClick();
