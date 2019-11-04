// 五个钩子函数
// bind inserted update componentUpdated unbind

// el: 指令所绑定的元素
// vnode: Vue编译时的虚拟节点 -- 当前组件Vue实例

export default {
  "click-outside": {
    inserted(el, binding, vnode) {
      document.addEventListener('click', e => {
        if (!el.contains(e.target)) {
          let { expression: eventName } = binding;
          vnode.context[eventName]();
        }
      })
    }
  },

  'focus': {
    inserted(el) {
      el.focus();
    }
  }
};
