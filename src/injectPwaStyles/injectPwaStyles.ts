/**
 * You shouldn't apply pwa styles like that.
 * Use css to style your content. Use css-selector dependending if your content is viewn as pwa:
 * @media all and (display-mode: standalone), (display-mode: minimal-ui), (display-mode: fullscreen) {
 *  body {
 *   margin: 0;
 *   border: 5px solid black;
 *  }
 * }
 *
 * Maybe this gives you an insight what you should do
 */
const injectPwaStyles = () => {
  // body overscroll-behavior none
  // disable context menu
  // blur none
};
export { injectPwaStyles };
