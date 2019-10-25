<template>
  <li>
    <div @click="change">
      <span class="prefix">{{prefix}}</span>
      <slot name="title"></slot>
    </div>
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
  li, div {
    padding: 10px;
  }
  div:hover {
    background: #F4F6F9;
  }
  .prefix {
    padding: 0 10px;
    display: inline-block;
    width: 40px;
    box-sizing: border-box;
  }
</style>