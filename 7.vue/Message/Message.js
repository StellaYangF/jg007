import MessageComponent from "./Message.vue";
import Vue from "vue";

let instance;
let getInstance = () => {
  instance = new Vue({
    render: h => h(MessageComponent),
  }).$mount();
  document.body.appendChild(instance.$el);
}


const Message = {
  success(options) {
    !instance && getInstance();
    instance.$children[0].add(options);
  }
}



export {
  Message,
}

export default {
  install() {
    let $message = {};
    Object.keys(Message).forEach(key => $message[key] = Message[key]);
    Vue.prototype.$message = $message;
  }
}