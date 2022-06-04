let savedUrlScope: string | undefined;

/**
 * A common problem in Pwa's is navigating out of the pwa scope.
 * Your app will turn in browser without adress bar. This won't happen if you use target: _blank on all your anchor links
 * This function will listen for any anchor clicks and change the anchor to _blank, if it is a navigation which leaves your pwa scope and not opening new browser tab.
 *
 * @param {string} urlScope Eg. "google.de/pwa-sub-domainscope". Use url without protocol (www/https)
 * @param {object} element Optimal parameter to reduce watched elements. Otherwise it will listen on any click
 * @returns {function} function to remove added Listener
 */
const preventAnchorLeavingScopeClick = (urlScope: string, element = document.body) => {
  const isAbsoluteUrl = (href: string) => /^(?:[a-z]+:)?\/\//i.test(href);
  const isAnchorElement = ({ tagName }: HTMLElement) => tagName === 'A';
  const hasHrefAbsoluteValue = ({ href }: HTMLAnchorElement) => href && isAbsoluteUrl(href);
  const targetNotBlank = ({ target }: HTMLAnchorElement) => !target || target !== '_blank';
  const notInCurrentScope = ({ href }: HTMLAnchorElement) => {
    if (!savedUrlScope) {
      savedUrlScope = urlScope || window.location.href;
    }
    return !href.includes(savedUrlScope!);
  };

  const checks = [isAnchorElement, hasHrefAbsoluteValue, targetNotBlank, notInCurrentScope];

  const checkAndPreventEvent = (event: MouseEvent) => {
    const { target } = event;

    if (checks.every((fn) => fn(target as HTMLAnchorElement))) {
      (target as HTMLAnchorElement).setAttribute('target', '_blank');
    }
  };

  element.addEventListener('click', checkAndPreventEvent);

  return () => element.removeEventListener('click', checkAndPreventEvent);
};

export { preventAnchorLeavingScopeClick };
