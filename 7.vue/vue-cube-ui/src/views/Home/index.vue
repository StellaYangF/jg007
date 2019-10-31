<template>
  <div class="home">
    <HomeHeader :categories='categories' @change='change'></HomeHeader>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
import HomeHeader from './HomeHeader.vue';
import types from '@/store/actions-type';

const { mapActions, mapState } = createNamespacedHelpers('home');
export default {
  components: {
    HomeHeader,
  },
  computed: {
    ...mapState(['categories']),
  },
  methods: {
    change(value) {
      console.log(value[0]);
    },
    ...mapActions([types.SET_CATEGORIES]),
  },
  mounted() {
    this[types.SET_CATEGORIES]();
    // this.$store.dispatch(`/home/${types.SET_CATEGORIES}`);
  },
};
</script>
