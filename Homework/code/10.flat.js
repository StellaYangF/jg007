// 工具函数
let isArray = obj => Array.isArray(obj);
let flatArray = (flatArr, prev) => flatArr.concat(prev);

Array.prototype.flat = function(n = 1) {
  let flatArr = [], 
      current = this;
  // 判断是否 空数组
  if ()

  // 返回扁平的数组
  return flatArr;
};


let arr = [ 1, [ 2, [ 3, [4, [5]]]]];
console.log(arr.flat(2));

// arr.flat(Infinity); 
// [1, 2, 3, 4, 5]