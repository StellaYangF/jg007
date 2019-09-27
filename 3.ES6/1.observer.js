let obj = {
    name: "stella",
    age: 10,
    experience: {
        job1: "teacher"
    }
}

function update() {
    console.log("update");
}

function observer(obj) { // 数据劫持
    if (typeof obj !== "object") return;

    for (let key in obj) {
        // 多次调用产生闭包
        defineProperty(obj, key, obj[key]);
    }
}

function defineProperty(obj, key, value) {
    observer(value);

    Reflect.defineProperty(obj, key, {
        configurable: true,
        enumerable: true,
        get() {
            return value;
        },
        set(newValue) {
            if (typeof newValue === "object") {
                observer(newValue);
            }
            update(); // 视图更新
            value = newValue;
        }
    })
}

observer(obj);
obj.name = "Stella";
obj.experience.job1 = "programmer";
obj.experience = { job2: "teacher" };
obj.intest = "dancing"; // 无法监控 => 先申明，再修改
console.log(obj.name);

// 数组劫持
let arr = [1, 2, 3, 4];
observer(arr);
arr.push(4); // 无法监控到数组数据类型  
// vue： 将shift, unshift重写了
// 对象性能不好的原因，对象不要多层嵌套 => 拉平
// 属性不存在，，新增加属性，无法响应

// proxy弥补上述缺点