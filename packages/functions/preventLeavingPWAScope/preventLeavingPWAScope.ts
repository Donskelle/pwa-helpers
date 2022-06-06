let savedUrlScope: string | undefined;

/**
 * preventLeavingPWAScope
 * @param {string} urlScope Optimal Eg. "google.de/pwa-sub-domainscope". Use url without protocol (www/https)
 * @param {object} element Optimal parameter to reduce watched elements. Otherwise it will listen on any click
 * @returns {function} function to remove added Listener
 */
const preventLeavingPWAScope = (urlScope?: string, element = window) => {
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

export { preventLeavingPWAScope };
