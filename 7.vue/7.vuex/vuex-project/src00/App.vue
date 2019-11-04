<template>
  <div id="app">
     Tom的年龄是:{{$store.state.age}}
     我的年龄是{{$store.getters.myAge}}

     <br>
     <button @click="add">按钮</button>

      <button @click="minus">异步减少</button>
      <p>computedC: {{this.$store.getters.computedC}}</p>
      <p>module a: {{this.$store.state.a.a}}</p>
  </div>
</template>


<script>
export default {
  mounted(){
    console.log(this.$store._modules)
  },  
  methods:{
    add(){
      this.$store.commit('syncAdd',10); // 载荷
    },
    minus(){
      this.$store.dispatch('asyncMinus',5);
    }
  },
}
</script>