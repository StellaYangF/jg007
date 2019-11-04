import Vue from "vue";
import App from './App';
import store from "./store";
import directives from './directives';
import utils from './utils';

// custom-directive
// Object.keys(directives).forEach(key => Vue.directive(key, directives[key]));
utils.forEach(directives, (key, value) => Vue.directive(key, value));

new Vue({
  el: "#app",
  store,
  render: h => h(App),
})