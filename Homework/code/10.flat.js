// 工具函数
let isArray = obj => Array.isArray(obj);
let flatArray = (flatArr, prev) => flatArr.concat(prev);

Array.prototype.flat = function(n = 1) {
  let flatArr = [];

  // 判断是否 空数组
  if (!this.length) {
    return flatArr;
  }

  this.reduce((prev, next, index, current) =>{
    flatArr.concat(prev, next);
  })

  return flatArr;
};


let arr = [ 1, [ 2, [ 3, [4, [5]]]], 6];
console.log(arr.flat(2));

// arr.flat(Infinity); 
// [1, 2, 3, 4, 5]