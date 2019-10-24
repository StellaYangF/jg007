<template>
  <zf-submenu>
    <template slot="title">{{data.name}}</template>
    <template v-for="menu in data.children">
      <a-sub :data="menu" :key="menu.id" v-if="menu.children"></a-sub>
      <zf-menu-item v-else :key="menu.id"> {{menu.name}}</zf-menu-item>
    </template>
  </zf-submenu>
</template>
<script>
export default {
  name: "a-sub",
  props: {
    data:{
      type: Object,
      default: () => ({})
    }
  }
}
</script>