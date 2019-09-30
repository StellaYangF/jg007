const PENGDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

const resolvePromise = (promise2, x, resolve, reject) => {
  // if (promise2 === x) 
}

const isPromise = data => {
  if ((typeof data === "object" && data !== null) || typeof data === "function") {
    return typeof data.then === "function"
  } else {
    return false;
  }
}

class Promise {
  
}