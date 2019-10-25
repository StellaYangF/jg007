<template>
  <div>
    <!-- template -->
    <Level :type="1">h1</Level>
    <Level :type="2">h2</Level>
    <Level :type="3">h4</Level>
    <Level :type="4">h4</Level>
    <Level :type="5">h5</Level>
    <Level :type="6">h6</Level>

    <!-- scope-slot -->
    <List :arr="arr">
      <template #title="{a, b}">
        <li>#  {{a}} - {{b}}</li>
      </template>
    </List>
  </div>
</template>
<script>
// import Level from "./components/Level";
import Level from "./components/LevelFunctional";
import List from "./components/List";

export default {
  components: { Level, List },
  methods: {
    render(h, item) {
      return <li># {item}</li>;
    }
  },
  data() {
    return {
      arr: [1, 2, 3]
    };
  }
};

</script>
