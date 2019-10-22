import vnode from "./vnode.js";
const hasOwnProperty = Object.prototype.hasOwnProperty;

function h(type, config, ...children) {
    const props = {};
    let key;
    if (config) {
        if (config.key) {
            key = config.key;
        }
    }
    for (let propName in config) {
        if (hasOwnProperty.call(config, propName) && propName != 'key') {
            props[propName] = config[propName];
        }
    }

    return vnode(type, key, props, children.map((child, index) => (typeof child == "string" || typeof child == "number" ? vnode(undefined, undefined, undefined, undefined, child) : child)));
}

export default h;