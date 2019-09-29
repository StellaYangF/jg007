function cloneDeep (obj, hash = new WeakMap()) {
  // 类型校验
  //  if (typeof obj == "undefined" ) return obj;
  // 校验null/ undefined不能用上述方法
  if (obj == null ) return obj;
  if (typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);

  // []/ {}   cloneObj
  let val = hash.get(obj);  
  if (val) { // 映射表 存在  直接将结果返回  避免重复地址
    return val; // 递归的终止条件
  }

  // 获取传入对象/方法的构造函数
  let cloneObj = new obj.constructor;
  
  for (let key in obj) {
    // 添加对象/ 数组 的自由属性，继承属性过滤
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = cloneDeep(obj[key], hash);
      hash.set(obj, cloneObj);
    }
  }
  return cloneObj;
}

let null1 = null;
let null2 = cloneDeep(null);
// console.log(null1 === null2);   // true

let date = new Date();
let date2 = cloneDeep(date);
console.log(date === date2);   // false

let obj = { a: 1};
let obj2 = cloneDeep(obj);
obj2.a = 2;
console.log(obj.a);   // 1

let arr = [1, 2, 3, 4];
let arr1 = cloneDeep(arr);
arr1.unshift(0);
console.log(`arr: ${arr}; arr1 ${arr1}`);
// arr: 1,2,3,4; arr1 0,1,2,3,4

let cobj = { a: 1 };
cobj.b = cobj;
let cobj1 = cloneDeep(cobj);
cobj1.a = 2;
console.log(cobj, cobj1);