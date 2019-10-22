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
  success(options){
    !instance && getInstance();
    instance.$children[0].add({...options, type: "success"})
  }
}

export {
  Message,
}

export default {
  install() {
    // 注册全局组件    注册全局指令   往原型上添加方法 、属性
    let $message = {};
    Object.keys(Message).forEach(key => {
      $message[key] = Message[key];
    })
    Vue.prototype.$message = $message;
  }
}