let Promise1 = require("./promise.js");

let p = new Promise1((resolve, reject)=>{
  setTimeout(reject,0,"Oops! Something goes wrong!");
  setTimeout(resolve,300,"OKOKOOK");
})
p.then(value => value, reason => {
  throw reason;
}).finally(()=>console.log("tom")).then(console.log, console.log);