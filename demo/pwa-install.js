import {
  addInstallAvailableObserver,
  removeInstallAvailableObserver,
} from 'https://unpkg.com/@donskelle/pwa-helpers/src/index.js?module';
import { createUiPrompt } from './createUiPrompt.js';

// github way to handle instance state thats not related attributes.
// Using current InstallPwaButton instance (this) as key
const state = new WeakMap();

export class InstallPwaButton extends HTMLElement {
  static is() {
    return 'pwa-install-button';
  }

  constructor() {
    super();
    state.set(this, { installEvent: null });

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `<slot>Install</slot>`;
  }

  connectedCallback() {
    this.setAttribute('hidden', '');
    this.addEventListener('click', this.onInstallClick);

    addInstallAvailableObserver((event) => this.updateLocalData(event));
  }

  disconnectedCallback() {
    // no need to remove
    this.removeEventListener('click', this.onInstallClick);
    const localState = state.get(this);
    localState.installEvent = null;

    removeInstallAvailableObserver((event) => this.updateLocalData(event));
  }

  updateLocalData(event) {
    if (event) {
      const localState = state.get(this);
      localState.installEvent = event;
      this.removeAttribute('hidden');
    } else {
      this.setAttribute('hidden', '');
    }
  }

  onInstallClick(e) {
    if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'A') {
      return;
    }
    createUiPrompt(
      'Install Windows 98',
      `
      <ul>
        <li>Offline</li>
        <li>No other features</li>
        <li>but it works offline</li>
      </ul>
      `
    )
      .then(() => {
        const { installEvent } = state.get(this);
        installEvent.prompt();
        return installEvent.userChoice;
      })
      .then(({ outcome }) => {
        if (outcome === 'accepted') {
          // installed
        }
      })
      .catch((err) => console.log(err));
  }
}

if (!window.customElements.get(InstallPwaButton.is())) {
  console.log(InstallPwaButton.is());
  window.customElements.define(InstallPwaButton.is(), InstallPwaButton);
}
