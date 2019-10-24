let Vue;

class ModuleCollection{
  constructor(options) {
    this.register([], options);
  }
  register(path, rootModule) {
    let module = {
      _raModule: rootModule,
      _children: {},
      state: rootModule.state
    }
    if(path.length == 0) {
      this.root = module;
    }else {
      let parent = path.slice(0, -1).reduce((root, current) => {
        return root._children[current]
      }, this.root);
      parent._children[path[path.length -1]] = module;
    }
    if(rootModule.modules) {
      forEach(rootModule.modules, (moduleName, module) => {
        this.register(path.concat(moduleName), module)
      })
    }
  }
}

const forEach = (obj,cb) => Object.keys(obj).forEach(key => cb(key, obj[key]));

const installModule = (store, rootState, path, rootModule) => {
  if (path.length > 0) {
    let parent = path.slice(0,-1).reduce((root, current) => {
      return root[current];
    }, rootState);
    Vue.set(parent, path[path.length-1], rootModule.state);
  }
  
  let getters = rootModule._rawModule.getters;
  if (getters) {
    forEach(getter, (getterName, fn) => {
      Object.defineProperty(store.gettters, getterName, {
        get() {
          return fn(rootModule.state);
        }
      })
    })
  };

  let mutations = rootModule._raModule.mutations;
  if(mutations) {
    forEach(mutations, (mutationName, fn) => {
      let mutations = store.mutations[mutationName] || [];
      mutations.push(payload => {
        fn(rootModule.state, payload);
        store._subscribes.forEach(fn => fn({ type: mutationName, payload}, rootState))
      });
      store.mutations[mutationName] = mutations;
    })
  }

  let actions = rootModule._raModule.actions;
  if(actions) {
    forEach(actions, (actionName, fn) => {
      let actions = store.actions[actionName] || [];
      actions.push(payload => fn(store, payload));
      store.actions[actionName] = actions;
    })
  }

  forEach(rootModule._children, (moduleName, module) => {
    installModule(store, rootState, path.concat(moduleName), module);
  })
}


class Store {
  constructor(options = {}) {
    // debugger;
    this.s = new Vue({
      data() {
        return { state: options.state };
      }
    });
    this.getters = {};
    this.mutations = {};
    this.actions = {};
    this._subscribes = [];
    this._modules = new ModuleCollection(options);

    installModule(this, this.state, [], this._modules.root);

    options.plugins.forEach(plugin => plugin(this));
  }

  subscribe(fn) {
    this._subscribes.push(fn);
  }

  commit = (mutationName, payload) => {
    this.mutations[mutationName].forEach(fn => fn(payload));
  }

  dispatch = (actionName, payload) => {
    this.actions[actionName](payload);
  }
  get state() {
    return this.s.state;
  }
}

const install = _Vue => {
   Vue = _Vue;
   Vue.mixin({
     beforeCreate() {
       if (this.$options && this.$options.store) {
         this.$store = this.$options.store;
       } else {
         this.$store = this.$parent && this.$parent.$store
       }
     },
   })
}

export default {
  install,
  Store,
}