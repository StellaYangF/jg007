setTimeout(() => {
  console.log('timeout1');
  Promise.resolve().then(data => {
      console.log('promise2')
  })
}, 0);

setTimeout(() => {
  console.log('timeout2')
}, 0);

console.log('hello');
// node 10+版本 结果
// hello
// timeout1
// timeout2
// promise2

// 浏览器 & node 12.12 结果
// hello
// timeout1
// promise2
// timeout2
// 异步代码 会等待同步代码执行完毕


// 执行顺序的问题  // 我们写node 现在 11 和 浏览器是一致的
// node < 11;  
setTimeout(() => {
  console.log(9);
  Promise.resolve().then(() => {
      console.log(7)
  })
}, 0) ;
setTimeout(() => {
  console.log(1)
}, 0);
// 9 7 1