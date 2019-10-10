// reduce 收敛 把一个数组 转化成 一个值

let arr = [ {count: 3, price: 5}, {count: 3, price: 5}, {count: 3, price: 5} ];
let arr2 = [ 1, 2, 3, 4, 5 ];

// 运用一
arr2.reduce((prev, next, index) => {
  // console.log(prev, next, index);
  return prev + next;
})

// 运用二：求和
let res = arr.reduce((prev, { count, price }) => prev + count * price , 0)
console.log(res); // 45

// 运用三：compose函数
// 方法一：
function compose(...fns) {
  return function (...args) {
    let lastFn = fns.pop();
    return fns.reduceRight((prev, next) => next(prev), lastFn(...args))
  }
}

// 简写：
const compose = (...fns) => (...args) => {
  let lastFn = fns.pop();
  return fns.reduceRight((prev, next) => next(prev), lastFn(...args))
}

// 方法二：
function compose(...fns) {
  return fns.reduce((prev, next) => {
    return function (...args) {
      return prev((next(...args)))
    }
  })
}

// return function (...args) {
//   return prev((next(...args)))
// }
//  这个结果会作为下一次的prev

// 第二次遍历  参数、返回值分别是
// prev: 
//   function (...args) { 
//     return getCurreny(len(...args)) 
//   }  
// next: sum
// return function (...args) {
//   return function (...args) { 
//     return getCurreny(len(...args)) 
//   }((sum(...args))) // ...args = a,b
// }


// 简写
const compose = (...fns) => fns.reduce((prev, next) => (...args) => prev((next(...args))));

let sum = (a, b) => a + b;
let len = str => str.length;
let getCurreny = len => `$${len}`;
let a = "hello";
let b = "world";

let res = getCurreny(len(sum(a, b)));
console.log(res); // $10;
res = compose(getCurreny, len, sum)(a,b);
console.log(res); // $10;


// reduce实现
Array.prototype.reduce = function (callback = undefined, init = undefined) {
  // 初始化callback的四个参数
  let prev = undefined,
  next = undefined,
  index = undefined,
  current = this;
  
  // 判断是否传入callback
  if (!callback) {
    throw new Error("undefined is not a function");
  }
  
  // 判断是否传入了init 
  // undefined/ null 等同于没有传值
  if (init == null) {
    if (!current.length) throw new Error("Reduce of empty array with no initial value");
    prev = init;
  } else  prev = init; 
   
  for (let i = 0; i < current.length; i++) {
    // 每一轮循环都有返回值
    let res = callback(prev, next, index, current);
  }

  // 调用callback

};

// [].reduce(); undefined is not a function
// [].reduce(prev=>{}); // Reduce of empty array with no initial value