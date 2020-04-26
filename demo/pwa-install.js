import { addInstallAvailableObserver, removeInstallAvailableObserver } from '../src/index';

// hacky github way to handle instance state. Using current InstallPwaButton instance (this) as key
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

    addInstallAvailableObserver((data) => this.updateLocalData(data));
  }

  disconnectedCallback() {
    // no need to remove
    this.removeEventListener('click', this.onInstallClick);
    const localState = state.get(this);
    localState.installEvent = null;

    removeInstallAvailableObserver((data) => this.updateLocalData(data));
  }

  updateLocalData(data) {
    if (data) {
      const localState = state.get(this);
      localState.installEvent = data;
      this.removeAttribute('hidden');
    } else {
      this.setAttribute('hidden', '');
    }
  }

  async onInstallClick(e) {
    if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'A') {
      return;
    }
    const { installEvent } = state.get(this);

    installEvent.prompt();
    const { outcome } = await installEvent.userChoice;
    if (outcome === 'accepted') {
      // this.setAttribute('hidden', '');
      console.log();
    }
  }
}

if (!window.customElements.get(InstallPwaButton.is())) {
  console.log(InstallPwaButton.is());
  window.customElements.define(InstallPwaButton.is(), InstallPwaButton);
}
