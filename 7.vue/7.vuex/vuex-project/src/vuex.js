let Vue;

const install = _vue => {
  console.log(_vue);
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
    this.state = options.state;
  }
}

class ModuleCollection{}

export default {
  install,
  Store,
}