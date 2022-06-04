import { updateFoundCallback } from '../src/index.ts';
import { createUiPrompt } from './createUiPrompt.js';

// Github's way to handle instance state thats not related to attributes / properties.
// Using current InstallPwaButton instance (this) as key
const state = new WeakMap();

/**
 * Displays its content
 */
export class PwaUpdateButton extends HTMLElement {
  static is() {
    return 'pwa-update-button';
  }

  constructor() {
    super();
    this.setAttribute('hidden', '');

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <slot>Update</slot>
    `;
  }

  connectedCallback() {
    this.addEventListener('click', this.startSwUpdate);

    updateFoundCallback((cb) => {
      this.removeAttribute('hidden');
      state.set(this, { triggerUpdateCallback: cb });
    });
  }

  startSwUpdate() {
    createUiPrompt(
      'Service Worker Update Available',
      `
          <ul>
            <li>No Features</li>

            <li>Restart App?</li>
          </ul>
          `
    )
      .then(() => {
        state.get(this).triggerUpdateCallback();
      })
      .catch((err) => console.log(err));
  }
}

window.customElements.define(PwaUpdateButton.is(), PwaUpdateButton);
