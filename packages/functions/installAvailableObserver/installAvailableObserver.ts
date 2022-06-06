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

export const addInstallAvailableObserver = (cb: (event?: BeforeInstallPromptEvent) => void) =>
  addObserver(cb);

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

export { removeObserver as removeInstallAvailableObserver };
