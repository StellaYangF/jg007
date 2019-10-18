const PENGDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

const resolvePromise = (promise2, x, resolve, reject) => {
  // if (promise2 === x)
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
    }

    let reject = reason => {
      if (this.state === PENGDING) {
        this.reason = reason;
        this.state = REJECTED;
        this.onRejectedStacks.forEach(onRejected => onRejected());
      }
    }

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    let promise2 = new Promise((resolve, reject) => {

      if(this.state === FULFILLED) {
        try {
          let x = onFulfilled(this.value);
          resolve(x);
        } catch (error) {
          reject(error);
        }
      }

      if(this.state === REJECTED) {
        try {
          let x = onRejected(this.reason);
          resolve(x);
        } catch (error) {
          reject(error);
        }
      }

      if(this.state === PENGDING) {
        this.onFulfilledStacks.push(()=> onFulfilled(this.value));
        this.onRejectedStacks.push(()=> onRejected(this.reason));
      }
    });
    return promise2;
  }
}

module.exports = Promise;
