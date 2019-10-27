<template>
  <xj-submenu>
    <template #title>{{data.name}}</template>

    <template v-for="menu in data.children">
      <a-sub :data="menu" :key="menu.id" v-if="menu.children"></a-sub>
      <xj-menu-item v-else :key="menu.id">{{menu.name}}</xj-menu-item>
    </template>
  </xj-submenu>
</template>

<script>
export default {
  name: "a-sub",
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  mounted() {
    console.log(this.data);
  },
}
</script>