class Map {
  constructor() {
    this.arr = [];
  }

  calcKey(key) {
    let hash = [...key].reduce((init, current) => init + current.charCodeAt() ,0);
    return hash%100;
  }

  set(key, value){
    let k = this.calcKey(key);
    this.arr[k] = { [key]: value};
  }

  get(key) {
    let k = this.calcKey(key);
    return this.arr[k];
  }

  get [Symbol.toStringTag]() {
    return `Map`
  }

}

let map = new Map();
map.set("hellow", "world");
map.get("hellow");
// {hellow: "world"}