 <template>
   <Menu :data="data"></Menu>
 </template>

 <script>
import { data } from "./data.json";
import Menu from "./Menu";
export default {
  data() {
    return { data}
  },
  components: { Menu }
 }
 </script>