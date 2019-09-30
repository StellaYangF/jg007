const uncurrying = fn => (...args) => fn.call(...args);

let toString = uncurrying(Object.prototype.toString);
toString("tom");


Function.prototype.uncurrying = function () {
  return (...args) => this.call(...args);
}

let toString = Object.prototype.toString.uncurrying();
console.log(toString([]));  
// [object Array]