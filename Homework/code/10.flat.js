// 第一版

// 工具函数
// let isArray = obj => Array.isArray(obj);
// let flatArray = (flatArr, prev) => flatArr.concat(prev);

// Array.prototype.flat = function(n = 1) {
//   let flatArr = [];

//   // 判断是否 空数组
//   if (!this.length) {
//     return flatArr;
//   }

//   this.reduce((prev, next, index, current) =>{
//     flatArr.concat(prev, next);
//   })

//   return flatArr;
// };


// let arr = [ 1, [ 2, [ 3, [4, [5]]]], 6];
// console.log(arr.flat(2));

// arr.flat(Infinity); 
// [1, 2, 3, 4, 5]

// 成熟版
Array.prototype.flat = function(n = 1) {
  let current = this;
  let count = 0;
  
  if(current == null) throw new Error('Cannot convert undefined or null to object');

  if (n === 0 || !current.length) return current = [];

  try {
    while(count++ < n) {
      if (!current.some(item => Array.isArray(item))) return current;
      current = current.reduce((prev, next)=> prev.concat(next), []);
    }
  }catch(error) {
    throw error;
  }

  return current;
}

// Array.prototype.flat.call("tom");
let arr = [1, [1, [3, [4, [5]]]]];
console.log(arr.flat(Infinity));