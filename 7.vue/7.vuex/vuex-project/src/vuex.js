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

class Store{
  constructor(options) {
    this._vm = new Vue({
      data() {
        return { state: options.state };
      }
    })
    this.mutations = {};
  
    utils.forEach(options.mutations, (type, fn) => this.mutations[type] = payload => fn(this.state, payload));
  }

  get state() {
    return this._vm.state;
  }

  commit(type, payload) {
    this.mutations[type](payload);
  }

}

class ModuleCollection{}


export default {
  install,
  Store,
}