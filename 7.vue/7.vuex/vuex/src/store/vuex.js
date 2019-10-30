let Vue;

/**
 * 默认Vue.use 就会使用调用install方法
 * 三种用处：1） 注册全局组件 2) 注册全局指令 3) 往原型上添加方法 、属性
 * 此处：给注入store属性的Vue实例，及其所有 子组件 添加$store实例  进行共享
 * @param {*Vue} _vue Vue构造函数
 */ 
const install = _vue => {
  Vue = _vue;
  console.log("install");
  Vue.mixin({
    beforeCreate() {
      if (this.$options && this.$options.store) {
        this.$store = this.$options.store;
      } else {
        this.$store = this.$parent && this.$parent.$store;
      }
    }
  });
};

/**
 * 循环处理 对象 键 值 
 * @param {*Object} obj 
 * @param {*Function} cb 
 */
const forEach = (obj, cb) => {
  Object.keys(obj).forEach(key => {
    cb(key, obj[key]);
  });
};

class ModuleCollection {
  constructor(options) {
    this.register(options);
  }
  register(rootModule, path = []) {
    let module = {
      _rawModule: rootModule,
      _children: {},
      state: rootModule.state
    };

    if (path.length === 0) {
      this.root = module;
    }else {
      parent = path.slice(0, -1).reduce((root, current) => {
        return root._children[current]
      }, this.root);
      parent._children[path[path.length-1]] = module;
    }

    if (rootModule.modules) {
      forEach(rootModule.modules, (moduleName, module) => {
        this.register(module, path.concat(moduleName));
      })
    }
  }
}

class Store {
  constructor(options = {}) {
    this._vm = new Vue({
      data() {
        return { state: options.state };
      }
    });
    this.getters = {};
    this._mutations = {};
    this._actions = {};
    this._subscribes = [];
    this._modules = new ModuleCollection(options);
    this.registerModule(this, this.state, [], this._modules.root);

    options.plugins.forEach(plugin => plugin(this));

  }

  subscribe = fn => {
    this._subscribes.push(fn);
  }

  /**
 * 注册状态信息
 * @param {*Store} store Store实例
 * @param {*Object} rootState store.state根状态对象
 * @param {*Array} path 子模块数组
 * @param {*Object} rootModule 当前模块的对象
 */
  registerModule = (store, rootState, path, rootModule) => {
    if (path.length > 0) {
      let parent = path.slice(0, -1).reduce((root, current) => {
        return root[current]
      }, rootState);
      Vue.set(parent, path[path.length - 1], rootModule.state);
  
    }
  
    let getters = rootModule._rawModule.getters;
    let mutations = rootModule._rawModule.mutations;
    let actions = rootModule._rawModule.actions;
    
    if (getters) {
      forEach(getters, (type, fn) => {
        Object.defineProperty(store.getters, type, {
          get: () => fn(rootModule.state)
        })
      })
    }
    if (mutations) {
      forEach(mutations, (type, fn) => {
        let mutations = store._mutations[type] || [];
        mutations.push(payload => {
          fn(rootModule.state, payload);
        })
        store._mutations[type] = mutations;
      })
    }
    if (actions) {
      forEach(actions, (type, fn) => {
        let actions = store._actions[type] || [];
        actions.push(payload => {
          fn(store, payload);
        })
        store._actions[type] = actions;
      })
    }
  
    forEach(rootModule._children, (moduleName, module) => {
      this.registerModule(store, rootState, path.concat(moduleName), module);
    })
  }

  dispatch = (type, payload) => {
    this._actions[type].forEach(fn => fn(payload));
  };

  commit = (type, payload) => {
    //this永远指向当前实例  => es7
    // 源码变量 控制 是否 是通过 mutation来更新状态
    this._mutations[type].forEach(fn => fn(payload));
  };

  /**
   * 实现响应式数据
   * @readonly
   * @memberof Store
   */
  get state() {
    return this._vm.state;
  }
}

export default {
  install,
  Store
};
