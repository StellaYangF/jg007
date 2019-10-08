let pp = Promise.prototype;

Reflect.defineProperty(pp, "finally", {
  value (callback) {
    let P = this.constructor;
    return this.then(
      val => P.resolve(callback()).then( ()=> val),
      err => P.resolve(callback()).then( () => { throw err})
      )
  }
})



Reflect.defineProperty(pp, "all", {
  val (promises) {
    debugger;
    let len = promises.length,
        index = 0;

    return new Promise((resolve, reject) => {
      let arr = [];      

      let handlePromise = (promise, i) => {
        console.log(i);
        arr[i] = promise;
        if (++index === len) return resolve(arr);
      }

      try {
        promises.forEach((promise, i) => {
          if(isPromise(promise)) {
            promise.then(
              data => handlePromise(data, i),
              reject  
            )
          } else {
            Promise
              .resolve(promise)
              .then(
                  data => handlePromise(data, i),
                  reject
              );
          }
        })
      } catch (err) {
        reject(err);
      }
    })
  }
})

Reflect.defineProperty(pp, "race", {
  value (promises) {
    return new Promise ((resolve, reject) => {
      promises.forEach(p => {
        try {
          if (isPormise) {
            p.then(resolve, reject);
          } else {
            resolve(p)
          }
        } catch (error) {
          reject(error);
        }
      })
    })
  }
})

function isPormise (data) {
  if ((typeof data === "object" && data !== null) || typeof data === "function") {
    return typeof data.then === "function"
  }
  return false;
}

let p1 = new Promise((resolve, reject) => setTimeout(reject("oops")));
let p2 = new Promise(resolve => resolve("hello"));
let p3 = "Bonjour!";
Promise
  .race([p1, p2, p3])
  .then(console.log)
  .catch(console.log)