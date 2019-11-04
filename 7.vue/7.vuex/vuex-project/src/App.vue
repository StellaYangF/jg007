<template>
  <div>
    <p>Tom is {{$store.state.age}} years old.</p>

    <div 
      v-click-outside:[direction].foo="change" 
      class="test"
    >
      <input type="text" @focus="flag=true" v-focus/>
      <div v-show="flag" class="test-content">contenter</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      flag: false,
      direction: 'left',
    };
  },
  methods: {
    change() {
      this.flag = false;
    }
  },
  // directives: {
  //   "click-outside"(el, bindings, vnode) {
  //     document.addEventListener("click", e => {
  //       if (!el.contains(e.target)) {
  //         let eventName = bindings.expression;
  //         vnode.context[eventName]();
  //       }
  //     });
  //   }
  // }
};
</script>
<style >
.test {
  width: 300px;
}
.test-content {
  border-radius: 10px;
  box-shadow: 0 0 20px 0 rgba(0,0,0,.2);
  height: 300px;
  width: 300px;
}
</style>