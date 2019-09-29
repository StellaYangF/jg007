// code
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value => P.resolve(callback()).then( () => value) ,
    err => P.resolve(callback()).then( () => { throw err }),
  )
}

// test
let p = new Promise(resolve => resolve("hello"));
let p1 = new Promise((resolve, reject) => reject("Oops!"));

p.finally(()=>console.log("world")).then(console.log);
// world
// hello
p1.finally(() => console.log("world")).catch(console.log);
// world
// Oops!