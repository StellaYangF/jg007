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