// 对比：
// 1.) 2.0 默认会递归 2).数组改变length 是无效的 3） 对象不存在的属性不能被拦截

// 基于proxy代理对象实现 兼容性差 ie11不兼容

let toRaw = new WeakMap();
let toProxy = new WeakMap();

// Tool： function
function isObject(value) {
  return typeof value === "object" && value !== null;
}

function hasOwnProperty(target, key) {
  return target.hasOwnProperty(key);
}

function reactive(target) {
  return createReativeObject(target);
}

function createReativeObject(target) {
  if(!isObject(target)) return target;

  let proxy = toProxy.get(target);

  if(proxy) return proxy;

  if(toRaw.has(target)) return target;

  let baseHandler = {
    get(target, key, receiver) {
      let result = Reflect.get(target, key, receiver);
      track(target, key);
      return isObject(result) ? reactive(result) : result;
    },
    set(target, key, value, receiver) {
      let hadKey = hasOwnProperty(target, key);

      let oldValue = target[key];

      let result = Reflect.set(target, key, value, receiver);
      if (!hadKey) {
        trigger(target, "add", key);
      } else if (oldValue !== value) {
        trigger(target, "set", key);
      }
      return result;
    },
    deleteProperty(target, key) {
      let result = Reflect.deleteProperty(target, key);
      console.log(`Delete ${target}'s ${key}`);
      return result;
    }
  };

  let observed = new Proxy(target, baseHandler);
  toProxy.set(target, observed);
  toRaw.set(observed, target);
  return observed;
}

let activeEffectStacks = [];

let targetsMap = new WeakMap();
function track(target, key) { // target中的可以变化 就执行数组里的方法
  let effect = activeEffectStacks[activeEffectStacks.length-1];
  if(effect) {
    let depsMap = targetsMap.get(target);
    if(!depsMap) {
      targetsMap.set(target, depsMap = new Map);
    }
    let deps = depsMap.get(key);
    if(!deps) {
      depsMap.set(key, deps = new Set);
    }
    if(!deps.has(effect)) {
      deps.add(effect);
    }
  }
}

function trigger(target, type, key) {
  let depsMap = targetsMap.get(target);
  if (depsMap) {
    let deps = depsMap.get(key);
    if(deps) {
      deps.forEach(effect => effect());
    }
  }
}

function effect(fn) {
  let effect = createReactiveEffect(fn);
  effect();
}

function createReactiveEffect(fn) {
  let effect = function() {
    return run(effect, fn);
  }
  return effect;
}

function run(effect, fn) {
  try {
    activeEffectStacks.push(effect);
    fn();
  } finally {
    activeEffectStacks.pop();
  }
}

let obj = reactive({ name: "stella" });
effect(()=> console.log(obj.name));

obj.name = "OK";