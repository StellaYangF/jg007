<template>
  <xj-submenu>
    <template #title>{{data.name}}</template>
    <template v-for="menu in data.children">
      <resub :data="menu" :key="menu.id" v-if="menu.children"></resub>
      <xj-menu-item v-else :key="menu.id">{{menu.name}}</xj-menu-item>
    </template>
  </xj-submenu>
</template>
<script>
export default {
  name: "resub",
  props: {
    data: {
      type: Object,
      default:() => ({}),
    }
  }
}
</script>