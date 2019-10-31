<template>
  <div id="app">
    <div id="container">
    <router-view/>
    </div>
    <div class="fotter">
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
      selectedLabelDefault: "/",
      tabs: [
        { label: 'Home', value: '/', icon: 'iconfont icon-duoyun'},
        { label: 'courses', value: '/course', icon: 'iconfont icon-react'},
        { label: 'admin', value: '/profile', icon: 'iconfont icon-xiaolian'},
      ]
    }
  },
  watch: {
    $route: {
      handler(to, from) {
        this.selectedLabelDefault = to.path;
      },
      immediate: true,
    }
  },
  methods: {
    changeHanlder(label) {
      this.$router.push(label);
    }
  }
}
</script>

<style lang="stylus">
</style>
