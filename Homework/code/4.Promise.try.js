//  Promise.try实现

Reflect.defineProperty(Promise.prototype, "try", {
  value: function (fn) {
     let p = new Promise( (resolve, reject) => {
      resolve(fn());
    });
    if(p.status === "pending") {
      return p.then(data => data);
    }
  }
})

// 验证
function add(a, b) {
  console.log(a + b);
}

Promise.try(() => add(a, b));
Promise.try(setTimeout(()=>console.log("timeout")));
console.log("end");