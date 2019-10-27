<template>
  <div id="app">
    <button @click="show">Dialog</button>
  </div>
</template>
<script>
export default {
  name: "app",
  methods: {
    show() {
      this.$message.success({
        message: "Success",
        duration: 1000
      })
    }
  },
}
</script>

<style>
  #app {
    padding: 20px;
  }
  button { 
    padding: 10px 15px;
    color: #f6b;
    background: #fff;
    font-size: 20px;
    outline: none;
    border: 2px solid #fff;
    box-shadow: 0 0 20px 0 rgba(0,0,0,.2);
    border-radius: 5px;
  }
</style>