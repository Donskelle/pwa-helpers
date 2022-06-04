import { createObserver } from '../utils';

const { addObserver, removeObserver, updateData } = createObserver();

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

const addInstallAvailableObserver = (cb: (event?: BeforeInstallPromptEvent) => void) =>
  addObserver(cb);
/**
 * Prevent Pwa Install Prompt and lets you access install event and controll when fired
 *
 * Relies on:
 * https://developer.mozilla.org/en-US/docs/Web/API/BeforeInstallPromptEvent
 * You can add callbacks and access install prompt via preventedInstallCallback
 */
export const setupPreventPwaInstallPromptListener = () => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    updateData(e);
    // Add listener to keep track of install availability
    e.userChoice.then(() => {
      updateData(null);
    });
  });
};

export { addInstallAvailableObserver, removeObserver as removeInstallAvailableObserver };
