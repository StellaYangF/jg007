export default {
  data() {
    return { val: "Bonjour"}
  },
  props: {
    type: Number
  },
  methods: {
    input(e) {
      this.val = e.target.value;
    }
  },
  render(h) {
    let tag = `h${this.type}`;
    return <tag>hello</tag>
  }
}