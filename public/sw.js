/* eslint-disable no-restricted-globals */
self.addEventListener('message', (event) => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

self.addEventListener('install', () => {});

self.addEventListener('activate', () => {});

self.addEventListener('fetch', () => {});
