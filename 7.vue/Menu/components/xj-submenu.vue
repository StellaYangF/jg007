<template>
  <li>
    <span @click="change">
      {{prefix}}
      <slot name="title"></slot>
    </span>
    <ul v-if="isShow">
      <slot></slot>
    </ul>
  </li>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
    }
  },
  methods: {
    change() {
      this.isShow = !this.isShow;
    }
  },
  computed: {
    prefix() {
      return this.isShow ? "-" : "+"
    }
  }
}
</script>
<style scoped>
  li {
    padding: 10px;
  }
</style>