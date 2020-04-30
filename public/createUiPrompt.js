import { idleFramePromise } from './index.js';
/**
 * Create beautiful ui prompt
 * @param {String} content
 * @returns {Promise}
 */
const createUiPrompt = (title = '', content = '') =>
  new Promise((resolve, reject) => {
    let lightboxContainer = window.lightbox;
    if (lightboxContainer) {
      lightboxContainer.remove();
    } else {
      lightboxContainer = document.createElement('div');
      lightboxContainer.id = 'lightbox';
    }

    lightboxContainer.innerHTML = `
      <div class= "window">
        <div class="title-bar">
          <div class="title-bar-text">
            ${title}
          </div>

          <div class="title-bar-controls">
            <button aria-label="Minimize"></button>
            <button aria-label="Maximize"></button>
            <button aria-label="Close"></button>
          </div>
        </div>
        <div class="window-body">
          ${content}
        </div>
        <section style="display: flex; justify-content: flex-end">
        <button>OK</button>
        <button>Cancel</button>
        </section>
      </div>
    `;

    idleFramePromise()
      .then(() => {
        document.body.append(lightboxContainer);
        return idleFramePromise;
      })
      .then(() => {
        lightboxContainer.addEventListener('click', ({ target }) => {
          const deny = () => {
            lightboxContainer.remove();
            reject();
          };
          const accept = () => {
            lightboxContainer.remove();
            resolve();
          };

          if (target === lightboxContainer) {
            deny();
          }

          if (target.tagName === 'BUTTON') {
            if (target.innerText) {
              switch (target.innerText) {
                case 'OK':
                  accept();
                  break;
                default:
                  deny();
                  break;
              }
            } else if (target.ariaLabel) {
              switch (target.ariaLabel) {
                case 'Close':
                  deny();
                  break;
                default:
                  break;
              }
            }
          }
        });
      });
  });

export { createUiPrompt };
