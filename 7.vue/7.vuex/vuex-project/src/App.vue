<template>
  <div>
    <h4>vuex test</h4>
    <p>Tom is <span class='age'>{{$store.state.age}}</span> years old.</p>
    <button @click='addAge'>Add</button>

    <h4>custom-directives</h4>
    <div v-click-outside:[direction].foo="change" class="test">
      <input type="text" @focus="flag=true"/>
      <div v-show="flag" class="test-content">contenter</div>
    </div>
  </div>
</template>

<script>
import { ADD_AGE } from './type.constants';
export default {
  data() {
    return {
      flag: false,
      direction: "left"
    };
  },
  methods: {
    change() {
      this.flag = false;
    },

    addAge() {
      this.$store.commit(ADD_AGE, 2);
    }
  }
};
</script>

<style >
.test {
  width: 300px;
}
.age {
  color: red;
  font-weight: bolder;
}
.test-content {
  border-radius: 10px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
  height: 300px;
  width: 300px;
}
</style>