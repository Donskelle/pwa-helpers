import { addInstallCallback } from 'https://unpkg.com/@donskelle/pwa-helpers/src/index.js?module';

// hacky github way to handle instance state. Using current context as key
const state = new WeakMap();

export class InstallPwaButton extends HTMLElement {
  static is() {
    return 'pwa-install-button';
  }

  constructor() {
    super();
    console.log('constructor');
    state.set(this, { installEvent: null });

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `<slot><button>Install</button></slot>`;
    this.setAttribute('hidden', '');
  }

  connectedCallback() {
    console.log('connectedCallback');

    addInstallCallback((e) => {
      console.log('preventedInstallCallback');
      const localState = state.get(this);
      if (!localState) return;
      localState.installEvent = e;

      this.removeAttribute('hidden');
    });

    this.addEventListener('click', this.onInstallClick);
  }

  disconnectedCallback() {
    const localState = state.get(this);
    localState.installEvent = null;
    this.removeEventListener('click', this.onInstallClick);
  }

  async onInstallClick(e) {
    e.preventDefault();
    const { installEvent } = state.get(this);

    installEvent.prompt();
    const { outcome } = await installEvent.userChoice;
    if (outcome === 'accepted') {
      alert('installing !');
      this.setAttribute('hidden', '');
    }
  }
}

if (!window.customElements.get(InstallPwaButton.is())) {
  console.log(InstallPwaButton.is());
  window.customElements.define(InstallPwaButton.is(), InstallPwaButton);
}
