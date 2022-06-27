const Links = [
  // { text: 'Export Size', link: '/exportsize' }
  { text: 'Changelog', link: '/changelog' },
];
const Introduction = [
  { text: 'Get Started', link: '/guide/' },
  { text: 'Best Practice', link: '/guide/best-practice' },
];
const Functions = [
  {
    text: 'injectPWAStyles',
    link: '/functions/injectPWAStyles/',
  },
  {
    text: 'isPWA',
    link: '/functions/isPWA/',
  },
  {
    text: 'preventLeavingPWAScope',
    link: '/functions/preventLeavingPWAScope/',
  },
  {
    text: 'preventPWAInstallPromptObserver',
    link: '/functions/preventPWAInstallPromptObserver/',
  },
  {
    text: 'updateFoundCallback',
    link: '/functions/updateFoundCallback/',
  },
];
const Performance = [
  {
    text: 'delayCallback',
    link: '/functions/perf/delay',
  },
  {
    text: 'idleFrameCallback',
    link: '/functions/perf/idle',
  },
];

export default {
  lang: 'en-US',
  title: 'PWA Helpers',
  description: 'PWA Helpers',
  lastUpdated: true,
  themeConfig: {
    logo: '/rocket.svg',
    editLink: {
      repo: 'Donskelle/pwa-helpers',
      branch: 'master',
      dir: 'packages',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/donskelle/pwa-helpers' },
      { icon: 'twitter', link: 'https://twitter.com/zehecks' },
    ],
    // footer: {
    //   message: 'Released under the MIT License.',
    //   copyright: 'Copyright © 2022-present Donskelle'
    // },
    sidebar: [
      {
        text: 'Introduction',
        items: Introduction,
      },
      {
        text: 'Functions',
        items: Functions,
      },
      {
        text: 'Performance',
        items: Performance,
      },
    ],
    nav: [
      { text: 'Introduction', items: Introduction },
      {
        text: 'Functions',
        items: [
          {
            text: 'Functions',
            items: Functions,
          },
          {
            text: 'Performance',
            items: Performance,
          },
        ],
      },
      { text: 'Changelog', link: '/changelog' },
    ],
  },
  head: [
    ['meta', { name: 'theme-color', content: '#42b883' }],
    ['link', { rel: 'icon', href: '/favicon-32x32.png', type: 'image/png' }],
    ['link', { rel: 'icon', href: '/rocket.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'author', content: 'Donskelle' }],
    ['meta', { property: 'og:title', content: 'PWA Helpers' }],
    [
      'meta',
      {
        property: 'og:image',
        content: 'https://pwa-helper.netlify.app/android-chrome-512x512.png',
      },
    ],
    [
      'meta',
      {
        property: 'og:description',
        content: 'Collection of PWA Functions',
      },
    ],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:creator', content: '@zehecks' }],
    [
      'meta',
      {
        name: 'twitter:image',
        content: 'https://pwa-helper.netlify.app/android-chrome-512x512.png',
      },
    ],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-GLDH45D9XS' }],
    ['script', { async: '', src: '/initgoogle.js' }],
  ],
};
