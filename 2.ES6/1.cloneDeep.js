function cloneDeep (obj, hash = new WeakMap()) {
  // 类型校验
  if (typeof obj == null ) return obj;
  if (typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);

  let val = hash.get(obj);
  if (val) {
    return val;
  }

  let cloneObj = new obj.constructor;

  hash.set(obj,cloneObj);
  
  for (let key in obj) {
    cloneObj[key] = cloneDeep(obj[key], hash);
  }
  return cloneObj;
}

let obj = null;
let date = new Date();
let newObj = cloneDeep(obj);
let newDate = cloneDeep(date);
console.log(newDate);

let circularObj = { a: 1};
circularObj.b = circularObj;
let newCircularObj = cloneDeep(circularObj);
console.log(newCircularObj);