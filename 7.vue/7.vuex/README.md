# Vuex Source Coding
`Vuex`源码解析

## 1. 如何使用
### 项目目录
```bash
| store.js
| main.js
| vuex.js
```
### store.js文件
```js
import Vue from "Vue";
import Vuex from "vuex";

Vue.use(Vuex);
export default new Vuex.install({
 modules: {
    a: { state: { a: 1 } },
    b: { state: { b: 1 } }
  },
  state: {
    age: 10
  },
  getters: {
    myAge(state) {
      return state.age + 10;
    }
  },
  mutations: {
    syncAdd(state, payload) {
      state.age += payload;
    },
    syncMinus(state, payload) {
      state.age -= payload;
    }
  },
  actions: {
    asyncMinus({ commit }, payload) {
      setTimeout(() => {
        commit("syncMinus", payload);
      }, 1000);
    }
  }
})
```

### main.js文件
```js
import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

new Vue({
    // 添加$store属性
    store, 
    render: h => h(App)
}).$mount('#app')
```

### vuex.js源码实现

## 2. Outlines 目录要求
- `install` 方法: 供`Vue.use()`调用
- `forEach` 工具函数：循环取出+处理一个对象的 键 值
- `ModuleCollection` 类：收集状态模块
- `Store` 类：实现状态共享

直接导出(如下：)
```js
export default {
  install,
  Store
}
```

## 3. `forEach`工具函数
- forEach 循环取出 对象的 键 值
- callback 循环处理
```js
const forEach = (obj, callback) => Object.keys(obj).forEach(key => callback(key, obj[key]));
```

## 4. `install` 方法
### (1) install 基本用法
- 注册全局组件
- 注册全局指令
- 给原型上添加方法、属性
> 此处 但凡具有`store`属性的`Vue`实例，及其 所有子组件 添加`$store`(`Store`实例)，实现状态共享

### (2) install 方法实现
- 准备好Vue变量，来接收`Vue.use()`调用时传入的Vue的`constructor`构造函数
- `Vue.mixin({})`为 vue实例 及其 所有子组件添加`$store`状态对象

```js
let Vue;
const install = _vue => {
  Vue = _vue;
  Vue.minxin({
    beforeCreate() {
      if (this.$options && this.$options.store) {
        this.$store = this.$options.store;
      }else {
        this. $Store = this,$parent && this.$parent.$store;
      }
    }
  })
}
```
## 5. `ModuleCollection`类
通过给`Store`传入的`options`，格式化Store实例信息
```js
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
      // 根模块
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
```

## 6. `Store` 类
```js
class Store {
  constructor(options = {}) {
    // 响应式原理
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
```