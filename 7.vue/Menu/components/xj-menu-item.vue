<template>
  <li class="menu-item ">
    <slot></slot>
  </li>
</template>
<script>
export default {
  name:"xj-menu-item"
}
</script>
<style scoped>
  li.menu-item {
    padding: 10px 60px;
  }
  li:hover {
    background: #F4F6F9;
  }
</style>