let currentScope;
/**
 * A common problem in Pwa's is navigating out of the pwa scope
 * This can happen for many reasons.
 * - External content
 * - You dont wanna watch pwa status all the time. To be aware of web app -> pwa event and change anchor targets
 * - You have some code generation e.g. markdown -> html and cant control anchor targets
 * @param {object} element Optimal parameter to reduce watched elements. Otherwise listen on body
 * @returns {function} function to remove added Listener
 */
const watchAnchorClick = (element = document.body) => {
  // const createCurrentScope = () =>
  const isAnchorElement = (ele) => ele.tagName === 'A';
  const hasUrlHrefValue = (ele) => ele.href;
  const inCurrentScope = (ele) => ele.tagName === 'A';

  element.addEventListener('click', (event) => {
    const { target } = event;
    if(isAnchorElement(target) && hasHref())
  });

  return () => element.removeEventLister();
};

export { watchAnchorClick };
