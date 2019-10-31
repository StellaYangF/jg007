<template>
  <div>
    <div class='header'>
      <img src="@/assets/images/logo.png" class='logo'>
      <span class='iconfont icon-icon-test1' @click='show'></span>
    </div>

    <cube-drawer
      ref='drawer'
      title='select'
      :data='data'
      @select='selectHandler'
    ></cube-drawer>
  </div>
</template>
<script>
export default {
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    data() {
      const defaultActive = [{ text: 'All courses', value: -1 }];
      if (this.categories.length > 0) {
        return [[...defaultActive, ...this.categories]];
      }
      return [defaultActive];
    },
  },
  methods: {
    selectHandler(value) {
      this.$emit('change', value);
    },
    show() {
      this.$refs.drawer.show();
    },
  },
};
</script>
<style lang="stylus">
.header {
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  background: #2a2a2a;
}

.logo {
  width: 150px;
}

.icon-icon-test1 {
  color: #fff;
  font-size 30px
}
</style>
