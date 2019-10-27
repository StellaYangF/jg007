<template>
  <div>
    <button @click='show'>Dialog</button>
  </div>
</template>
<script>
import Message from "./Message";
import Vue from "vue";
Vue.use(Message);
// import { Message } from "./Message";
export default {
  methods: {
   show() {
     this.$message.success({message: "hello", duration: 2000});
    //  Message.success({message: "hello", duration: 2000});
   } 
  }
}
</script>