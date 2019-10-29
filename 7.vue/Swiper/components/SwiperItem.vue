<template>
  <transition>
    <div class="swiper-itme" v-if="isShow" :class="{reverse}">
      <slot></slot>
    </div>
  </transition>
</template>
<script>
export default {
  computed: {
    isShow() {
      return this.selected === this.name;
    }
  },
  data() {
    return { selected:"", reverse: "" }
  },
  props: {
    name: {
      type: String,
      required: true,
    }
  }
}
</script>

<style lang="stylus">
  .v-enter-active, .v-leave-active 
    transisiton all .5s linear
  .v-leave-to
    transform translate(-100%)
    .reverse
      transform translate(100%)
  .v-enter 
    transform translate(100%)
    .reverse
      transform translate(-100%)
  .v-enter-active
    position absolute
    width 100%
    top 0
    left 0
</style>