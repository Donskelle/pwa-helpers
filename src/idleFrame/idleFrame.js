const idleFrameCallback = (cb) =>
  (window.requestIdleCallback || window.setTimeout)(cb);

const idleFramePromise = () =>
  new Promise((resolve) => idleFrameCallback(resolve));

export { idleFrameCallback, idleFramePromise };
