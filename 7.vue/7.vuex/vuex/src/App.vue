<template>
  <div id="app">
   I am <span class='age'>{{$store.state.age}}</span> years old!
   <br>
    Ten years later, I'll be <span class='age two'>{{$store.getters.myAge}}</span>.
    <br>
    <p>{{$store.state}}</p>
    <button @click='add'>add</button>
    <button @click='minus'>async minus</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted(){
  //  setInterval(()=>{
  //    this.$store.state.age++;// reactive data with Vue
  //  },1000)
  console.log(this.$store);
  },
  methods: {
    add() {
      this.$store.commit("syncAdd", 10)
    },
    minus() {
      this.$store.dispatch('asyncMinus', 5);
    }
  }
}
</script>
<style>
  #app {
    font-size: 20px;
    width: 300px;
    margin: 20px auto;
    box-shadow: 0 0 20px 0 rgba(0,0,0,0.2);
    border-radius: 5px;
    padding: 40px;
  }
  .age {
    color: red;
    font-size: 24px;
    font-weight: bolder;
  }
  .age.two {
    color: blueviolet;
  }
</style>