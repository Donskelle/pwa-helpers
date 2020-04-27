/**
 * Use this to split your js tasks into smaller frames
 * @param {function} callback
 */
const idleFrameCallback = (cb) => (window.requestIdleCallback || window.setTimeout)(cb);

/**
 * Promise Version of idleFrameCallback
 * just call: `await idleFrameCallback()` to wait for a free taskslist
 */
const idleFramePromise = () => new Promise((resolve) => idleFrameCallback(resolve));

export { idleFrameCallback, idleFramePromise };
