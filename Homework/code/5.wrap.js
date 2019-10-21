const wrap = promise => {
  let abort = null;
  let res= null;
  let _p = new Promise((resolve, reject) => {
    res = resolve;
    abort = reject;
  })
  _p.abort = abort;
  promise.then(res, abort);
  return _p;
}

let p = wrap(new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, 3000);
}) )
p.then(()=>{},()=>{console.log("Error")});
p.abort();
// Error

// Review
function wrap (promise) {
  let dfd = {};
  let p = new Promise((resolve, reject) => {
    dfd.reject = reject;
  })
  let race = Promise.race([promise, p]);
  race.abort = dfd.reject;
  return race;
}

let result = wrap(new Promise(resolve => {
  setTimeout(() => {
    resolve("hello");
  },3000);
}));

setTimeout(() => {
  result.abort("失败");
}, 1000);
result.then(console.log, console.log);