const currying = (fn, arr = []) => {
  let originLength = fn.length;
  return (...args) => {
    arr = [...arr, ...args];
    let currentLength = arr.length;
    return originLength > currentLength ? currying(fn, arr) : () => fn(...arr);
  }
}

function add (a, b, c, d, e, f, g) {
  let sum = a + b + c + d + e + f + g;
  console.log(sum);
  return sum;
}

currying(add)(1)(2)(3)(4)(5)(6)(7)();


const checkType = type => content => Object.prototype.toString.call(content) === `[object ${type}]`;

let types = [ "String", "Number", "Boolean", "undefined", "null", "function", "Object", "Array", "Symbol" ];
let utils = {};
types.forEach(type => utils[`is${type}`] = checkType(type));
uitls.isString(""); //true