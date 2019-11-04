const forEach = (obj, callback) => Object.keys(obj).forEach(key => callback(key, obj[key]));

export default {
  forEach,
}