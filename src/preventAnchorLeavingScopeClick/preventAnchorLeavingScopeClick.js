let savedUrlScope;

/**
 * A common problem in Pwa's is navigating out of the pwa scope. Your app will turn in browser without adress bar.
 * This function will listen for any anchor clicks and prevent events wich leave your pwa scope.
 * This Problem can happen for many reasons.
 * - Display external content
 * - You dont wanna watch pwa status all the time. To be aware of web app -> pwa event and change anchor targets
 * - You have some code generation e.g. markdown -> html and cant control anchor targets
 *
 * @param {object} element Optimal parameter to reduce watched elements. Otherwise it will listen on any body clicks
 * @param {string} urlScope Optimal Eg. "google.de/pwa-sub-domainscope". Use url without protocol (www/https)
 * @returns {function} function to remove added Listener
 */
const preventAnchorLeavingScopeClick = (element = document.body, urlScope) => {
  const isAbsoluteUrl = (href) => /^(?:[a-z]+:)?\/\//i.test(href);
  const isAnchorElement = ({ tagName }) => tagName === 'A';
  const hasHrefAbsoluteValue = ({ href }) => href && isAbsoluteUrl(href);
  const targetNotBlank = ({ target }) => !target || target !== '_blank';
  const notInCurrentScope = ({ href }) => {
    if (!savedUrlScope) {
      savedUrlScope = urlScope || window.location.href;
    }
    return !href.contains(savedUrlScope);
  };
  const checks = [isAnchorElement, hasHrefAbsoluteValue, targetNotBlank, notInCurrentScope];

  const checkAndPreventEvent = (event) => {
    const { target } = event;

    if (checks.every((fn) => fn(target))) {
      target.setAttribute('target', '_blank');
    }
  };

  element.addEventListener('click', checkAndPreventEvent);

  return () => element.removeEventLister('click', checkAndPreventEvent);
};

export { preventAnchorLeavingScopeClick };
