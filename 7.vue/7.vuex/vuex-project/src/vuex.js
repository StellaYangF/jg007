import utils from './utils';

let Vue;

const install = _vue => {
  Vue = _vue;
  Vue.mixin({
    beforeCreate() {
      if (this.$options && this.$options.store) {
        this.$store = this.$options.store;
      } else {
        this.$store = this.$parent && this.$parent.$store;
      }
    },
  })
};

const installModule = () => {};

class Store{
  constructor(options) {
    this._vm = new Vue({
      data() {
        return { state: options.state };
      }
    })
    this._getters = {};
    this._mutations = {};
    this._actions = {};
    this._subscribes = [];
    this._modules = new ModuleCollection(options);

    installModule(this, this.state, [], this._modules.root);
  }

  get state() {
    return this._vm.state;
  }

  commit(type, payload) {
    this.mutations[type].forEach(fn => fn(payload));
  }

  dispatch(type, payload) {
    this.actions[type].forEach(fn => fn(payload));
  }

  subscribe(fn) {
    this._subscribes.push(fn);
  }

}

class ModuleCollection{
  constructor(options) {
    this.register([], options);
  }

  register(path, currentRootModule) {
    let module = {
      _rawModule: currentRootModule,
      _children : [],
      state: currentRootModule.state,
    };
    if (path.length == 0) {
      this.root = module;
    } else {
      let parent = path.silce(0, -1).reduce((root, current) => root._children[current], this.root);
      parent._children[path[path.length - 1]] = module;
    }
    if (currentRootModule.modules) {
      forEach(currentRootModule.modules, (moduleName, module) => this.register(path.concat(moduleName), module));
    }
  }
}


export default {
  install,
  Store,
}