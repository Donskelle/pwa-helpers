// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme';
import DemoContainer from './components/DemoContainer.vue';
import './styles/demo.css';


export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // register global components
    app.component('DemoContainer', DemoContainer);
  },
};
