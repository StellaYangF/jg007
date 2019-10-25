<template>
  <ul>
    <template v-for="a in arr">
        <slot name="title" :a="a" :b="1">
        <li :key="a">{{a}}</li>
      </slot>
    </template>
  </ul>
</template>
<script>
export default {
  props: {
    arr: {
      type: Array,
      default: () => [],
    }
  }
}
</script>