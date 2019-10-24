import Vue from "vue";
import App from "./App";
import Message from "./Message.js";

Vue.use(Message);

new Vue({
  name: "root",
  render: h => h(App)
}).$mount("#app");