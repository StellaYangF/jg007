/* currying */
// Core function: extract a tiner function

function add(a, b, c, d, e) {
  return a + b + c+ d + e;
}

// 实现一
let r = currying(add)(1, 2)(3)(4)(5); // 15

// (1) Full version
function currying(fn, arr = []) {
  let len = fn.length;  // get current function "fn" params

  return function (...args) {
    // [ 1, 2 ] 
    // Here args do not restrict param's number
    arr = [ ...arr, ...args];
    if (arr.length < len) {
      return currying(fn, arr);
    } else return fn(...arr);
  }
}

// (2) Simplified version  ES6
const currying = (fn, arr = []) => {
  let originLength = fn.length;

  return (...args) => {
    arr = [...arr, ...args], currentLength = arr.length;
    // merge two arguments
    return currentLength < originLength ? currying(fn, arr) : () => fn(...arr);
  }
}

// 实现二
let r = currying(add)(1, 2)(3)(4)(5)(); // 15

const currying = (fn, arr = []) => {
  let originLength = fn.length;

  return (...args) => {
    arr = [...arr, ...args], currentLength = arr.length;
    // merge two arguments
    return currentLength < originLength ? currying(fn, arr) : () => fn(...arr);
  }
}


/* uncurrying */
Function.prototype.unCurrying = function () {
  return (...args) => this.call(...args);
}

let toString = Object.prototype.toString.unCurrying();
console.log(toString("tom"));
console.log(toString([]));


const unCurrying = fn => (...args) => fn.call(...args);

class Toast {
  constructor () {
    this.template = "template";
  }

  show () {
    console.log(this.template);
  }
}

let obj = {
  template : 'template1',
}


unCurrying(Toast.prototype.show)(obj);

