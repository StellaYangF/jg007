<template>
  <xj-menu>
    <template v-for="menu in data">
      <Resub v-if="menu.children" :key="menu.id" :data="menu"></Resub>
      <xj-menu-item v-else :key="menu.id">{{menu.name}}</xj-menu-item>
    </template>
  </xj-menu>
</template>

<script>
import Resub from "./Resub";
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    }
  },
  components: { Resub }
}
</script>