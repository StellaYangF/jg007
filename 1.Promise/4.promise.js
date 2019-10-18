let Promise = require("./promise.js");

let p = new Promise((resolve, reject)=>{
  setTimeout(reject,0,"Oops! Something goes wrong!");
  setTimeout(resolve,300,"OKOKOOK");
})
p.then(value => value, reason => {
  throw reason;
}).then(console.log, console.log);