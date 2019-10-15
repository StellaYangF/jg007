function isObject(data) {
    if (typeof data === "object" && data !== null) {
        return true;
    } else false;
}

Function.prototype.uncurrying = function() {
    return (...args) => this.call(...args);
}

let toString = Object.prototype.toString.uncurrying();

const mergeOptions = (target, source) => {
    if (isObject(target) && isObject(source)) {
        Reflect.ownKeys(source).forEach(key => {
            if (target.hasOwnProperty(key)) {
                let value2 = source[key],
                    value1 = target[key];
                if (toString(value1) === toString(value2)) {
                    target[key] = [...new Set([value1, value2])]
                } else {
                    target[key] = value2;
                }
            } else {
                target[key] = source[key];
            }
        });
        return target;
    } else return new Error("Object required")
}

let target = {
    name: "tom",
    hobbies: "dancing",
    food: {
        meat: "pork"
    },
}

let source = {
    age: 18,
    name: "Jerry",
    hobbies: ["dancing", "travelling"],
    food: "mutton"
}


let t = [1, 2, 3, 4];

console.log(mergeOptions(target, source));

// Review
const mergeOptions = (target, source) => {
  if(typeof target !== typeof source) return source;

  if()
}