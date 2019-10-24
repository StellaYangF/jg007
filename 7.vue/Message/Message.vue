<template>
  <div class="message-contianer">
    <div v-for="layer in layers" :key="layer.id" class="message-item">{{layer.message}}</div>
  </div>
</template>

<script>
export default {
  name: "dialog-item",
  data(){
    return {
      layers: [],
      id: 0,
      durationDedault: 1000,
    }
  },
  methods: {
    add(options) {
      let layer = { ...options, id: this.id++};
      this.layers.push(layer);
      layer.timer = setTimeout(() => {
        this.remove(layer);
      }, layer.duration || this.durationDedault);
    },
    remove(layer) {
      this.layers = this.layers.filter(item => item.id !== layer.id);
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
  }
</style>