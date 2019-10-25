<template>
  <div>
    <Menu :data="data"></Menu>
  </div>
</template>

<script>
import Menu from "./Menu";
let {data} = require("./data.json");
export default {
  data(){
    return { data }
  },
  components: { Menu } 
}
</script>