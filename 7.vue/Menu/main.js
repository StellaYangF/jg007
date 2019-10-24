import Vue from "vue";
import App from "./App";

import XjMenu from "./components/xj-menu";
import XjMenuItem from "./components/xj-menu-item";
import XjSubmenu from "./components/xj-submenu";

Vue.component("XjMenu", XjMenu);
Vue.component("XjMenuItem", XjMenuItem);
Vue.component("XjSubmenu", XjSubmenu);

new Vue({
  el: "#app",
  render: h => h(App),
})