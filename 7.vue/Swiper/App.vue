<template>
  <div class='container'>
    <Swiper v-model="selected">
      <SwiperItem name="box1">
        <div class="content one">Content 1</div>
      </SwiperItem>
      <SwiperItem name="box2">
        <div class="content two">Content 2</div>
      </SwiperItem>
      <SwiperItem name="box3">
        <div class="content three">Content 3</div>
      </SwiperItem>
    </Swiper>
  </div>
</template>

<script>
import Swiper from "./components/Swiper";
import SwiperItem from "./components/SwiperItem";
export default {
  data() {
    return {
      selected: "box2"
    }
  },
  components:{
    Swiper,
    SwiperItem,
  }
}
</script>

<style lang="stylus">
* 
  margin 0
  padding 0
.container
  margin 0 10px
.content  
  width 100%
  height 150px
  .one
    background #ff66bb
  .two
    background #ff88bb
  .three
    background #ffaabb
  
</style>