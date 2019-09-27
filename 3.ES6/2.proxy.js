// cons:
// 兼容性不高，es11
// 不用重写defineProperty
// 拦截代理
let obj = {
    name: "stella",
    age: 18,
    experiences: {
        job1: "teacher"
    }
}

// 取两次时
let hash = new WeakMap();

let handler = {
    set(target, key, value) {
        console.log("update");
        return Reflect.set(target, key, value);
    },

    get(target, key) {
        if (hash.has(key)) return hash.get(key);
        if (typeof target[key] === "object") {
            let p = new Proxy(target[key], handler);
            hash.set([key, p]);
            return p;
        }
        return Reflect.get(target, key);
    }
}

let proxy = new Proxy(obj, handler)

proxy.name = "Stella";
proxy.experiences.job1 = "programmer"; // 性能高于observer
proxy.experiences.job1 = "dancer";
console.log(proxy.name);

// 数组
// 取两次时
let hash = new WeakMap();
let handler = {
    set(target, key, value) {
        if (key === "length") return true; // 长度变化，不需要更新
        console.log("update", key);
        return Reflect.set(target, key, value);
    },

    get(target, key) {
        if (hash.has(key)) return hash.get(key);
        if (typeof target[key] === "object") {
            let p = new Proxy(target[key], handler);
            hash.set([key, p]);
            return p;
        }
        return Reflect.get(target, key);
    }
}

let arr = [1, 2, 3];
let proxy = new Proxy(arr, handler);
proxy.push(4);
console.log(arr);
// 没有筛选set()方法key值时，结果：
// update 3
// update length
// 设置后 结果：
// update 3
// [ 1, 2, 3, 4 ]