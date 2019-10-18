// vue2.0的数据劫持

// get Array.prototype to avoid editing original Array.prototype
let arrayPrototype = Array.prototype;
let proto = Object.create(arrayPrototype);
let arrayMethods = ["unshift", "shift", "push", "pop", "splice", "reverse", "splice"];

// rewrite array mutation method && nofity
arrayMethods.forEach(method => {
  proto[method] = function (...args) {
    let addedElement;
    switch (method) {
      case "unshift":
        addedElement = args;
        break;
      case "push":
        addedElement = args;
        break;
      case "splice":
        addedElement = args.slice(2);
        break;
      default: 
        break;
    }
    arrayPrototype[method].call(this, ...args);
    notify();
    addedElement && arrayObserver(addedElement);
  }
})

// tool: observe array
function arrayObserver(array) {
  array.forEach(item => observer(item));
};

// notify when views changed
function notify() {
  console.log("Update view!");
};

// defineReactive
function defineReactive(target, key, value) {
  observer(value);
  Reflect.defineProperty(target, key, {
    get () {
      return value;
    },
    set (newValue){
      if (value !== newValue) {
        observer(newValue);
        notify();
        value = newValue;
      }
    }
  }
)
}; 

// observe data
function observer(target) {
  
  if (typeof target !== "object" || target === null) return target;

  if (Array.isArray(target)) {
    Reflect.setPrototypeOf(target, proto);
    arrayObserver(target);
  } else {
    for (let key in target) {
      defineReactive(target, key, target[key]);
    }
  }
};

// TEST
let obj = { name: "tom", hobbies: ["reading", "shopping", "travelling"]};
observer(obj);
obj.name ="stella ";
obj.hobbies.unshift({ length: 3});
obj.hobbies.pop();
obj.hobbies[0].length = 2;


// (function(exports, require, module, __dirname, __filename) {
//   module.exports.a = { name:"tom"};
// })(exports, require, module, __dirname, __filename);