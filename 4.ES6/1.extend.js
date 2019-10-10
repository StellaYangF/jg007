class Animal {
  constructor() {
    this.name = "animal";
    // 抽象类 不能被new实例化
    if (new.target === Animal) throw new Error("Super class cannot be instanced.")
  }
  static say () {
    return "say";
  }
}

class Tiger extends Animal {
  sing() {
    return "sing";
  }
 }

// let a = new Animal();
let t = new Tiger("tiger");
// console.log(t.name);

// 每个类都有prototype 对象   每个人都有 __proto__ 指向的是所属类的原型

// console.log(Tiger.prototype);
// console.log(Tiger.say());   // 静态方法也能被子类继承
// console.log(Tiger.__proto__ === Animal);
// console.log(Tiger.prototype.__proto__ === Animal.prototype);   // true
// console.log(Animal.prototype.constructor === Animal);
// console.log(t.__proto__ === Tiger.prototype); // true
// console.log(Tiger.prototype.__proto__ === Animal.prototype);  // true
// console.log(Animal.prototype.__proto__ === Object.prototype); // true
// console.log(Object.prototype.__proto__);  // Object.prototype为顶层原型
// console.log(Object.__proto__ === Function.prototype);  // true
console.log(Function.__proto__ === Object.__proto__);  // true
// __proto__ 继承自莫个类的原型 查找属性和方法

