// 重写数组
const oldArrayPrototye = Array.prototype;
const proto = Object.create(oldArrayPrototye);
["push", "shift", "unshift", "pop"].forEach(method => {
  proto[method] = function() {
    updateView();
    oldArrayPrototye[method].call(this, ...arguments);
  }
})

function observer(target) {
  if (typeof target !=="object" || target == null) return target;

  if (Array.isArray(target)) {
    Object.setPrototypeOf(target, proto);
    for (let i = 0; i< target.length; i++) {
      observer(target[i]);
    }
  } else {
    for(let key in target) {
      defineReactive(target, key, target[key]);
    }
  }
}

function defineReactive(target, key, value){
  observer(value);
  Object.defineProperty(target, key, {
    get() {
      return value
    },
    set(newValue) {
      if (newValue !== value) {
        observer(newValue);
        updateView();
        value = newValue;
      }
    }
  })
}
function updateView() {
  console.log('View updated.')
}

let data = { name: "stella", age: [1,2,3, { name: "array"}] };
observer(data);
// data.name = "tom";
// data.class = 7;  // 新增对象属性 无法被观察
// data.name.fullname = "Chen"; // 属性下新增属性与值 无法被观察
// data.age.push(1);  // 默认数组也无法被观察
data.age.name = "new array";



