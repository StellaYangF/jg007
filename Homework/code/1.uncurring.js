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
    arr = [...arr, ...args];
    let currentLength = arr.length;
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

// 优化uncurryig
const uncurrying = fn => {
  return (context, ...args) => {
    // Function.prototype.apply.call(fn, context, args );
    Reflect.apply(fn, context, args)
  }
}


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


uncurrying(Toast.prototype.show)(obj);


// 优化currying
const curring = (fn,arr = [])=>{
  let len = fn.length
  return (...args)=>{
      // arr保存了上一次传入的值 ，下面函数体内，不能再修改arr的值，否则会影响后面的参数 
      // arr = [...arr, ...args];  
      // 上述写法导致，arr的值会改变： arr = ["String"] => arr = [ "String", "hello", "3"]
      args =  [...arr,...args]// [1]  [1,2,3] < 5
      if(args.length < len){
          return curring(fn,args)
      }
      console.log("arr: ", arr, "\r\nargs: ", args)
      return fn(...args)
  }
}
// let r = curring(add)(1)(2)(3)(4); // [1,2,3,4,5]
// console.log(r);
const checkType = (type, content) => {
  return Object.prototype.toString.call(content) === `[object ${type}]`;
};
let types = ["Number", "String", "Boolean"];
let utils = {};
types.forEach(type => {
  utils["is" + type] = curring(checkType)(type); // 先传入一个参数
});
console.log(utils.isString('hello'));
console.log(utils.isString(3));

return (...args) => {
args = [ ...arr, ...args];
return currying(fn, args);
}