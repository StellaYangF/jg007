<template>
  <div id="app">
    <button @click="show">Dialog</button>
  </div>
</template>

<script>
// import { Message } from "./Message";
export default {
  name: "App",
  mounted(){
    console.log(this);
  },
  methods: {
    show() {
      // Message.success({
      //   message: "OK",
      //   duration: 3000
      // });
      this.$message.success({
        message: "Success",
      })
    }
  }
};
</script>