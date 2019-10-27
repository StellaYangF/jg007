<template>
  <h1 v-if="type==1">
    <slot></slot>
  </h1>
  <h1 v-else-if="type==2">
    <slot></slot>
  </h1>
  <h1 v-else-if="type==3">
    <slot></slot>
  </h1>
  <h1 v-else-if="type==4">
    <slot></slot>
  </h1>
  <h1 v-else-if="type==5">
    <slot></slot>
  </h1>
  <h1 v-else>
    <slot></slot>
  </h1>
</template>
<script>
export default {
  props: {
    type: {
      type: Number
    }
  }
};
</script>