const PENGDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

const resolvePromise = (promise2, x, resolve, reject) => {
  if (promise2 === x)
    return reject(
      new TypeError("Chaining cycle detected for promise #<Promise>")
    );
  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    let called;
    try {
      let then = x.then;
      if (typeof then === "function") {
        then.call(x, 
          y => {
            if(called) return;
            called = true;
            resolvePromise(promise2,y, resolve, reject)
          },
          r => {
            if (called) return;
            called = true;
            reject(r);
          })
      } else {
        resolve(x);
      }
    } catch(error) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
};

const isPromise = data => {
  if (
    (typeof data === "object" && data !== null) ||
    typeof data === "function"
  ) {
    return typeof data.then === "function";
  } else {
    return false;
  }
};

class Promise {
  constructor(executor) {
    this.state = PENGDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledStacks = [];
    this.onRejectedStacks = [];

    let resolve = value => {
      if (this.state === PENGDING) {
        this.value = value;
        this.state = FULFILLED;
        this.onFulfilledStacks.forEach(onFulfilled => onFulfilled());
      }
    };

    let reject = reason => {
      if (this.state === PENGDING) {
        this.reason = reason;
        this.state = REJECTED;
        this.onRejectedStacks.forEach(onRejected => onRejected());
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : val => val;
    onRejected = typeof onRejected === "function" ? onRejected : error => {
      throw error;
    }
    let promise2 = new Promise((resolve, reject) => {
      if (this.state === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }

      if (this.state === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }

      if (this.state === PENGDING) {
        this.onFulfilledStacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
        this.onRejectedStacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
      }
    });
    return promise2;
  }

//   catch(onRejected) {
//     this.then(null, onRejected);
//   }

//   finally(callback) {
//     return this.then(
//       val => Promise.resolve(callback()).then(() => val),
//       err => Promise.resolve(callback()).then(() => { throw err })
//     )
//   }

//   static resolve(value) {
//     return new Promise((resolve, reject) => resolve(value));
//   }

//   static reject(reason) {
//     return new Promise((resolve, reject) => reject(reason));
//   }

//   static all(promises) {
//     let arr = [];
//     let i = 0;

//     return new Promise((resolve, reject) => {
//       let processData = (index, data) => {
//         arr[index] = data;
//         if(++i === promises.length) {
//           resolve(arr);
//         }
//       }
//       for (let i = 0; i< promises.length; i ++) {
//         let current = promises[i];
//         if(isPromise(current)) {
//           current.then(data => processData(i, data),reject);
//         } else {
//           processData(i, current);
//         }
//       }
//     })
//   }

//   static race (promises) {
//     return new Promise((resolve, reject) => {
//       try {
//         promises.forEach(value => {
//           if (isPromise(value)) {
//             value.then(resolve, reject);
//           } else {
//             resolve(value);
//           }
//         })
//       } catch(error) {
//         reject(error);
//       }
//     })
//   }
}

// const wrap = promise => {
//   let abort = null;
//   let p = new Promise((resolve, reject) => {
//     abort = reject;
//   });
//   let race = Promise.race([promise, p]);
//   race.abort = abort;
//   return race;
// }

Promise.deferred = () => {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  })
  return dfd;
}

module.exports = Promise;
