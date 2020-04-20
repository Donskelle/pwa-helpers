const getFreeFrameCallback = () =>
  window.requestIdleCallback || window.setTimeout;

const getFreeFramePromise = () =>
  new Promise((resolve) => getFreeFrameCallback(resolve));

export { getFreeFrameCallback, getFreeFramePromise };
