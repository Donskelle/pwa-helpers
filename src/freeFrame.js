const freeFrameCallback = (cb) =>
  (window.requestIdleCallback || window.setTimeout)(cb);

const freeFramePromise = () =>
  new Promise((resolve) => getFreeFrameCallback(resolve));

export { freeFrameCallback, freeFramePromise };
