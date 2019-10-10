function Animal(name) {
  this.name = name;
}
Animal.prototype.getName = function () {
  return this.name;
}

function MockNew (className, ...args) {
  // 1. 创建(或者说构造)一个全新的对象
  let obj = {};
  
  // 2. 这个对象会被执行[[原型]]链接
  // obj.__proto__ = className.prototype
  obj = Object.create(className.prototype);
  
  // 3. 这个新对象会绑定到函数调用的this
  result = className.call(obj, ...args);

  // 4. 如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象
  if(!result) return obj;
}

let animal = MockNew(Animal, "tiger");
