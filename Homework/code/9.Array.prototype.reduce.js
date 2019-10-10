// reduce实现
Array.prototype.reduce = function(callback, init) {
    // 初始化callback的四个参数
    let prev, next, current = this;

    // 判断是否传入callback
    if (!callback) throw new Error("undefined is not a function");

    // 判断是否传入了init 
    // undefined/ null 等同于没有传值
    if (init == null) {
        if (!current.length) throw new Error("Reduce of empty array with no initial value");
        prev = current[0];
        index = 1;
    } else {
        prev = init;
        index = 0;
    }
    next = current[index];

    try {
        while (index < current.length) {
            // 每一轮循环都有返回值
            prev = callback(prev, next, index, current);
            next = current[++index];
        }
    } catch (error) {
        throw error;
    }

    return prev;
};

// [].reduce(); undefined is not a function
// [].reduce(prev=>{}); // Reduce of empty array with no initial value
// console.log([1, 2, 3].reduce((prev, next) => prev + next, 2)); // 8
console.log([1, 2, 3].reduce((prev, next) => prev + next, 2)); // 8