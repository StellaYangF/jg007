<template>
  <div id="app">
    <div class="container">
    <router-view/>
    </div>
    <div class="footer">
      <cube-tab-bar
        v-model='selectedLabelDefault'
        :data="tabs"
        @change='changeHanlder'
      ></cube-tab-bar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedLabelDefault: '/',
      tabs: [
        { label: 'Home', value: '/', icon: 'iconfont icon-shouye-' },
        { label: 'courses', value: '/course', icon: 'iconfont icon-fenlei-' },
        { label: 'admin', value: '/profile', icon: 'iconfont icon-wode-' },
      ],
    };
  },
  watch: {
    $route: {
      handler(to) {
        this.selectedLabelDefault = to.path;
      },
      immediate: true,
    },
  },
  methods: {
    changeHanlder(label) {
      this.$router.push(label);
    },
  },
};
</script>

<style lang='stylus'>
html, body, #app
  width 100%
  height 100%
#app
  display flex
  flex-direction column
.container
  flex 1
  overflow-y scroll
.footer
  border-top 1px solid #ccc
  font-size 14px
</style>
