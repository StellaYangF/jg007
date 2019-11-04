import Vue from "vue";
import App from './App';
import store from "./store";
import directives from './directives';

// custom-directive
Object.keys(directives).forEach(key => Vue.directive(key, directives[key]));

new Vue({
  el: "#app",
  store,
  render: h => h(App),
})