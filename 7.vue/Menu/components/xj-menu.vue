<template>
  <ul>
    <slot name="default"></slot>
  </ul>
</template>
<script>
export default {
  name: "xj-menu"
}
</script>
<style scoped>
  ul {
    padding: 5px 20px !important;
    list-style: none;
  }
</style>