/* eslint-env serviceworker */
/* eslint-disable no-restricted-globals */
self.addEventListener('message', (event) => {
  console.log('message sw1', event);

  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
self.addEventListener('install', () => {
  console.log('install sw1');
});
self.addEventListener('activate', (event) => {
  console.log('activate sw1');

  event.waitUntil(clients.claim());
});
// Only needed for chromium based browser (https://web.dev/install-criteria/#criteria)
// Experiment to remove: https://groups.google.com/a/chromium.org/g/blink-dev/c/0uhGufIFLeo/m/qp9QKQXoEwAJ?utm_medium=email&utm_source=footer&pli=1
self.addEventListener('fetch', () => {
  console.log('fetch sw1');
});
