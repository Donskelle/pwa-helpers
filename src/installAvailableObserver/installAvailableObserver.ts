import { createObserver } from '../utils';

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

const { addObserver, removeObserver, updateData } = createObserver<
  BeforeInstallPromptEvent | undefined
>(undefined);

const addInstallAvailableObserver = (cb: (event?: BeforeInstallPromptEvent) => void) =>
  addObserver(cb);

/**
 * NON STANDARD: Prevent PWA Install Prompt and lets you access install event and controll when fired
 *
 * Only supported by few browsers (got removed from manifest standart).
 * Relies on:
 * https://developer.mozilla.org/en-US/docs/Web/API/BeforeInstallPromptEvent
 */
export const setupPreventPwaInstallPromptListener = () => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    updateData(e);
    // Add listener to keep track of install availability
    e.userChoice.then(() => {
      updateData(undefined);
    });
  });
};

export { addInstallAvailableObserver, removeObserver as removeInstallAvailableObserver };
