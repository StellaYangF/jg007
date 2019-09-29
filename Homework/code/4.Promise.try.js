//  Promise.try实现

Reflect.defineProperty(Promise.prototype, "try", {
    value: function(fn) {

    }
})

// 验证
function add(a, b) {
    console.log(a + b);
}

Promise.try(() => add(1, 2));
Promise.try(setTimeout(() => console.log("timeout")));
console.log("end");