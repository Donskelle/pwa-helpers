import { addInstallAvailableObserver, removeInstallAvailableObserver } from '../src/index.ts';
import { createUiPrompt } from './createUiPrompt.js';

// Github's way to handle instance state thats not related to attributes / properties.
// Using current InstallPwaButton instance (this) as key
const state = new WeakMap();

export class PwaInstallButton extends HTMLElement {
  static is() {
    return 'pwa-install-button';
  }

  constructor() {
    super();
    this.setAttribute('hidden', '');

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <slot>Install</slot>
    `;
  }

  connectedCallback() {
    this.addEventListener('click', this.onInstallClick);
    addInstallAvailableObserver((event) => {
      if (event) {
        this.removeAttribute('hidden');
      } else {
        this.setAttribute('hidden', '');
      }
      state.set(this, { installEvent: event });
    });
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.onInstallClick);
    removeInstallAvailableObserver(() => this.setAttribute('hidden', ''));
  }

  onInstallClick() {
    createUiPrompt(
      'Install Windows 98',
      `
      <ul>
        <li>No Features</li>
        <li>No Offline</li>
        <li>No Cache</li>
        <li>No Updates</li>
        <li>Just a regular Website without Install Banners</li>
      </ul>
      `
    )
      .then(() => {
        const { installEvent } = state.get(this);
        installEvent.prompt();
        return installEvent.userChoice;
      })
      // .then(({ outcome }) => {
      //   if (outcome === 'accepted') {
      //     // installed
      //   }
      // })
      .catch((err) => console.log(err));
  }
}

window.customElements.define(PwaInstallButton.is(), PwaInstallButton);
