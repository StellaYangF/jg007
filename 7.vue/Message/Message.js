import MessageComponent from "./Message.vue";

let instance, Vue;
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
};

export {
  Message
}

export default {
  install(_vue) {
    Vue = _vue;
    let $message = {};
    Object.keys(Message).forEach(key => $message[key] = Message[key]);
    Vue.prototype.$message = $message;
  }
}