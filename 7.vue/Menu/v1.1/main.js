import Vue from "vue";
import App from "./App";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/en";

import ZfMenu from './components/zf-menu';
import ZfMenuItem from './components/zf-menu-item';
import zfSubmenu from './components/zf-submenu';
Vue.component('ZfMenu', ZfMenu)
Vue.component('ZfMenuItem', ZfMenuItem)
Vue.component('zfSubmenu', zfSubmenu)

Vue.use(ElementUI, { locale });

new Vue({
  el: "#app",
  render: h => h(App),
})