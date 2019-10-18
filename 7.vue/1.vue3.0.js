let toRaw = new WeakMap();
let toProxy = new WeakMap();

function isObject(value) {
  return typeof value === "object" && value !==null;
}

function hasOwnProperty(target, key) {
  return target.hasOwnProperty(key);
}

function reactive(target) {
  return createReactiveObject(target)
}

function createReactiveObject(target) {
  if(!isObject(target)) return target;

  let proxy = toRaw.get(target);
  if (proxy) return target;
  if(toRaw.has(target)) return target;

  let baseHandler = {
    get(target, key, receiver) {
      let result = Reflect.get(target, key, receiver);
      track(target, key);
      return isObject(result) ? reactive(result) : result;
    },

    set(target, key, value, receiver) {
      let oldValue = target[key];
      let result = Reflect.set(target, key, value, receiver);
      if(!hasOwnProperty(target, key)) {
        trigger(target, "add", key);
      } else if(oldValue !== value){
        trigger(target, "set", key);
      }
      return result;
    },

    deleteProperty(target, key) {
      let result = Reflect.deleteProperty(target, key);
      console.log(`Delete ${target}' ${key}`);
      return result;
    },
  }

  let observed = new Proxy(target, baseHandler);
  toProxy.set(target, observed);
  toRaw.set(observed, target);
  return observed;
}

let activeEffectStacks = [];
// {
//   target: { // new WeakMap()
//     key: [ fn, fn] // new WeakSet()
//   }
// }

let targetsMap = new WeakMap();

function track(target, key) {
  let effect = activeEffectStacks[activeEffectStacks.length - 1];
  if (effect) {
    let depsMap = targetsMap.get(target);
    if (!depsMap) {
      targetsMap.set(target, despsMap = new Map);
    }
    let deps = despsMap.get(key);
    if (!deps) {
      despsMap.set(key, deps = new Set())
    }
    if (!deps.has(effect)) {
      deps.add(effect);
    }
  }
}

function trigger(target, type, key) {
  let depsMap = targetsMap.get(target);
  if(depsMap) {
    let deps = despsMap.get(key);
    if (deps) {
      deps.forEach( effect => effect());
    }
  }
}

function effect(fn) {
  let effect = createReactiveEffect(fn);
  effect();
}

function createReactiveEffect(fn) {
  let effect = function () {
    return run(effect, fn);
  }
  return effect;
}

function run(effect, fn) {
  try{
    activeEffectStacks.push(effect);
    fn();
  }finally {
    activeEffectStacks.pop();
  }
}

let obj = reactive({name: "tom"});
effect(() => console.log(obj.name));
// effect(() => console.log(obj));
obj.name = "Ok";
obj.age = 18;
console.log(obj);