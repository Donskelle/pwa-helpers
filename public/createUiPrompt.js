import { delayPromise } from '../src/index.ts';
/**
 * Create beautiful ui prompt
 * @param {String} title
 * @param {String} content
 * @returns {Promise} resolve if clicked ok, reject if clicked cancel
 */
const createUiPrompt = (title = '', content = '') =>
  new Promise((resolve, reject) => {
    let lightboxContainer = window.lightbox;
    if (!lightboxContainer) {
      lightboxContainer = document.createElement('div');
      lightboxContainer.id = 'lightbox';
    } else {
      lightboxContainer.remove();
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

    delayPromise()
      .then(() => {
        document.body.append(lightboxContainer);
        return delayPromise();
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

          if (target === lightboxContainer || target.ariaLabel === 'Close') {
            deny();
          }

          if (target.tagName === 'BUTTON' && target.innerText) {
            switch (target.innerText.toUpperCase()) {
              case 'OK':
                accept();
                break;
              case 'CANCEL':
                deny();
                break;
              default:
                break;
            }
          }
        });
      });
  });

export { createUiPrompt };
