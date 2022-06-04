/**
 * Use this to split your js tasks into smaller frames
 * @param {function} callback
 */
export const idleFrameCallback = (cb: (...params: any[]) => void) =>
  (window.requestIdleCallback || window.setTimeout)(cb);

/**
 * Promise Version of idleFrameCallback
 * just call: `await idleFrameCallback()` to wait for a free taskslist
 */
export const idleFramePromise = () => new Promise((resolve) => idleFrameCallback(resolve));

/**
 * Calls callback on next available frame
 */
export const delayCallback = (cb: (...params: any[]) => void, delayInMs = 0) =>
  window.setTimeout(cb, delayInMs);

/**
 * Promise Version of delayCallback (Calls callback on next available frame)
 * just call: `await idleFrameCallback()` to wait for a free taskslist
 */
export const delayPromise = (delayInMs = 0) =>
  new Promise((resolve) => delayCallback(resolve, delayInMs));
