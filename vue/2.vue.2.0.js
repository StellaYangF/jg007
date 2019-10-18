const oldArrayPrototype = Array.prototype;
const proto = Object.create(oldArrayPrototype);

["unshift", "shift", "push", "pop", "reverse", "splice","sort"].forEach(method => {
  proto[method] =  function (...args) {
    let inserted;
    switch(method) {
      case "unshift":
        inserted = args;
        break;
      case "splice":
        inserted = args.slice(2);
        break;
      default: 
      break;  
    };
    updateView();
    arrayObserver(inserted);
    oldArrayPrototype[method].call(this, ...arguments);
  }
})

function arrayObserver(arr) {
  for (let i = 0; i < arr.length; i++){
    let item = arr[i];
    observer(item);
  }
}

function observer(target) {
  if (typeof target !== "object" || target == null) return target;
  if (Array.isArray(target)) {
    Object.setPrototypeOf(target, proto);
    arrayObserver(target);
  } else { // 数组类型
    for (let key in target) {
      defineReactive(target, key, target[key]);
    }
  }
}

function defineReactive(target, key, value) {
  observer(value); // 对象属性值观察
  Object.defineProperty(target, key, {
    get() {
      return value;
    },
    set(newValue) {
      if (value !== newValue) { 
        observer(newValue);// 新增的数组都观察一下
        updateView();
        value = newValue;
      }
    }
  })
}

function updateView () {
  console.log("View updated.");
}

let data = { name: "stella", age: [1,2,3, { name: "array"}] };
observer(data);
// data.name = "tom";
// data.age.unshift(0);
data.age.unshift({grade: 1});
data.age[0].grade = 2; // 此时如果不对age数组新增 第一个元素 进行观察，就不会被侦测到
// 需要对重写的数组的方法，加强判断，使得新增加的元素也被检测 是否也需要被观察
console.log(data.age);

// data.class = 7;  // 新增对象属性 无法被观察
// data.name.fullname = "Chen"; // 属性下新增属性与值 无法被观察
// data.age.push(1);  // 默认数组也无法被观察
// data.age.name = "new array";
