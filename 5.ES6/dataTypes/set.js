class Set {
  constructor() {
    this.obj = {}
  }

  hasOwn(element) {
    return this.obj.hasOwnProperty(element);
  }

  set(element) {
    // if this element exists then skip.
    if(!this.hasOwn(element)) {
      this.obj[element] = element;
    }
  }
}

let s = new Set();

s.set(1);
s.set(1)