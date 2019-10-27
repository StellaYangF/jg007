<template>
  <div>
    <Menu :data="data"></Menu>
  </div>
</template>
<script>
import Menu from "./Menu";
export default {
  data() {
    return {
      data: [
        {
          name: "Navigation 1",
          id: 1,
          children: [
            {
              name: "Navigation 1.1",
              id: 1.1,
              children: [
                {
                  name: "Navigation 1.1.1",
                  id: 1.3,
                  children: [
                    { name: "Navigation 1.1.2", id: 1.4 },
                    { name: "Navigation 1.1.3", id: 1.5 }
                  ]
                }
              ]
            },
            { name: "Navigation 1.2", id: 1.2 }
          ]
        },
        { name: "Navigation 2", id: 2 },
        { name: "Navigation 3", id: 3 },
        { name: "Navigation 4", id: 4 }
      ]
    };
  },
  components: {
    Menu
  }
};
</script>