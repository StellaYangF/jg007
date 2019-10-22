<template>
  <div>
    <button @click='show'>Dialog</button>
  </div>
</template>

<script>
import Vue from "vue";
// import Message from "./Message";
// Vue.use(Message);
import { Message } from "./Message.js";


export default {
  methods: {
    show() {
      Message.success({
        // this.$message.success({
        message: "hello",
        duration: 1000,
      });
    }
  },
}
</script>