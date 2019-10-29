<template>
  <div
    class="swiper"
    @mouseenter="mouseenter"
    @mouseleave="mouseleave"
    @touchstart="touchstart"
    @touchmove="touchmove"
    @touchend="touchend"
  >
    <div class="viewport">
      <slot></slot>
    </div>
    <!-- dots -->
    <div class="dots">
      <span
        v-for="(item,index) in len"
        :key="index"
        :class="{active: active === index}"
        @click="select(index)"
      >{{item}}</span>
    </div>
    <div class="btn-list">
      <button @click="select(active - 1)">Left</button>
      <button @click="select(active + 1)">Right</button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    autoplay: {
      type: Boolean,
      default: true,
    },
    value: {
      type: String,
      default: "",
    }
  },
  data() {
    return {
      currentSelected: "",
      len: 0,
    }
  },
  methods: {
    mouseenter() {
      clearInterval(this.timer);
      this.timer = null;
    },
    mouseleave() {
      if (!this.timer) {
        this.run();
      }
    },
    touchstart(e) {
      this.mouseenter();
      this.startX = e.targets[0].clientX;
    },
    touchmove() {},
    touchend(e) {
      let endX = e.changedTouches[0].clientX;
      let distance = endX - this.startX;

      if (distance < 0) {
        this.select(this.active + 1)
      } else{
        this.select(this.active - 1)
      };
      this.run();
    },
    select(newIndex) {
      this.prevPosition = this.active;
      if (newIndex === this.names.length) newIndex = 0;
      if (newIndex === -1) newIndex = this.names.length - 1;
      this.$emit("input", this.names[newIndex]);
    },
    showChild() {
      this.currentSelected = this.value || this.$children[0].name;
      this.$children.forEach(vm => {
        this.$nextTick(()=> {
          vm.selected = this.currentSelected;
        });
        let reverse = this.prevPosition > this.value ? true : false;
        vm.reverse = reverse;
        if (this.timer) {
          if (this.prevPosition === 0 && this.active === this.len -1) {
            vm.reverse = true;
          }
          if (this.prevPosition === this.len -1 && this.active === 0) {
            vm.reverse = false;
          }
        }
      })
    },
    run() {
      if (this.autoplay) {
        this.timer = setInterval(() => {
          let index = this.active;
          let newIndex = index -1;
          this.select(newIndex);
        }, 3000)
      }
    },
  },

  computed: {
    active() {
      return this.names.indexOf(this.currentSelected);
    }
  },

  beforeDestroy() {
    clearInterval(this.timer);
  },

  watch: {
    value() {
      this.showChild();
    }
  },

  mounted() {
    this.names = this.$children.map(child => child.name);
    this.len = this.name.length;
    this.showChild();
  },
}
</script>

<style lang="stylus">
  .swiper {
    margin: 0 auto 
    border: 10px solid purple 
  }
  .viewport {
    position 
    overflow hidden
    height 150px
  }
  .dots {
    display flex
    justify-content center
  }
    .dots span  {
      cursor pointer
      width 30px
      height 30px
      text-align center
      line-height 30px
      border-radius 50%
      border 1px solid #cccccc
      margin 0 10px
    }
  .active {
    background green 
    color #fff
  }

</style>