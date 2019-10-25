<template>
  <xj-menu>
    <template v-for="menu in data">
      <Resub :key="menu.id" :data="menu" v-if="menu.children"></Resub>
      <xj-menu-item :key="menu.id" v-else>{{menu.name}}</xj-menu-item>
    </template>
  </xj-menu>
</template>
<script>
import Resub from "./Resub";
export default {
  props:{
    data: {
      type: Array,
      default: () => [],
    }
  },
  components: { Resub }
}
</script>