
function isPromise(data) {
  if ((typeof data === "object" && data !== null) || typeof data === "function") return typeof data.then === "function";
  else return false;
}

Reflect.defineProperty(Promise, "all", {
  value: function (promises) {
    let arr = [],
        index = 0,
        length = promises.length;
    
    return new Promise((resolve, reject) => {
      function processData (data, i) {
        arr[i] = data;
        if (++index === promises.length) resolve(arr);
      }

      for (let i = 0; i < length; i++) {
        let current = promises[i];
        if (isPromise(current)) {
          current.then(
            data => processData(data, i),
            reject  // 只要有一个状体是rejected状态就会导致返回的promise对象状态为rejected
          )
        } else {
          // 先转为Promise对象
          Promise
            .resolve(current)
            .then(data => processData(data, i));
        }
      }
    })
  }
})

Reflect.defineProperty(Promise, "race", {
  value: function (promises) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i< promises.length; i++) {
        
        try {
          let current = promises[i];
          if (isPromise(current)) {
            current.then( resolve, reject )
          } else {
            resolve(current);
          }
        } catch (err) {
          reject(err);
        }
      }
    })
  }
})

function isPromise(promise) {
  if((typeof promise === "object" && promise !== null) || promise === "function") {
    return typeof promise.then === "function";
  }
}

// Review
Promise.race = function(promises) {
  return new Promise((resolve, reject) => {
    try {
      promises.forEach(data => {
        if( isPromise(data)) {
          data.then(resolve, reject);
        }else {
          resolve(data);
        }
      })
    } catch (error) {
      reject(error);
    }
  })
}

let p1 = new Promise(resolve => setTimeout(() => resolve("p1")));
let p2 = "p2";
let p3 = new Promise((resolve, reject) => setTimeout(() => resolve("p3")));
let pAll = Promise.all([ p1, p2, p3]);
let pRace = Promise.race([ p1, p3, p2]);
let { log } = console;

pRace.then(log).catch(log);

pAll.then(log).catch(log);
// [ 'p1', 'p2', 'p3' ]
