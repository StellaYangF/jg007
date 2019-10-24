<template>
  <div class="message-contianer">
    <div v-for="layer in layers" :key="layer.id" class="message-item">
      {{layer.message}} {{layer.id }}
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return { layers:[] }
  },
  mounted() {
    this.id = 0;
  },
  methods: {
    add(options) {
    let layer =  { ...options, id: ++this.id };
    this.layers.push(layer);
    layer.timer = setTimeout(() => {
      this.remove(layer);
    }, options.duration);
  },
  remove(layer) {
    clearTimeout(layer.timer);
    this.layers = this.layers.filter(item => layer.id !== item.id);
  }
  }
}
</script>
<style >
  .message-contianer {
    position: fixed;
    top: 20px;
    left: 30%;
    width: 400px;
  }
  div.message-item {
    color: #65C13E;
    background: #EFF8EA;
    border: 1px solid #E0F2D8;
    margin-top: 20px;
    border-radius: 6px;
    padding: 10px 20px;
    /* box-shadow: 0 0 20px 0 rgba(0,0,0,.2); */
  }
</style>