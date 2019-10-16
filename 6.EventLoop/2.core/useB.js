const fs = require("fs");
const path = require("path");
const vm = require("vm");

function Module(id) {
  this.id = id;
  this.exports = {};
}

Module.extensions = {};

Module.extensions['.js'] = function (module) {
  let script = fs.readFileSync(path.resolve(__dirname,module.id), "utf8");
  let content = wrapper[0] + script + wrapper[1];
  let fn = vm.runInThisContext(content);
  fn.call(module.exports, module.exports, req, module, __dirname, module.id);
}

Module._resolveFilename = function (id) {
  let absPath = path.resolve(__dirname, id);
  if(fs.existsSync(absPath)) return absPath;

  let extensions = Object.keys(Module.extensions);
  for(let i = 0; i< extensions.length; i++){
    let ext = extensions[i];
    let currentPath = absPath + ext;
    if (fs.existsSync(currentPath)) {
      return currentPath;
    } else {
      throw new Error(`no such file or directory, open '${currentPath}'`)
    }
  }
}

let wrapper = [
  '(function (exports, require, module, __dirname, __filename) {\r\n',
  '\r\n})'
]

function tryModuleLoad(module) {
  let ext = path.extname(module.id); // 获取 路径 字符串最后 .扩展名： ".xx"
  Module.extensions[ext](module);
}

function req (id) {
  let filename = Module._resolveFilename(id);

  let module = new Module(filename);

  tryModuleLoad(module);
  return module.exports;
}

let str = req("./a");
console.log(str);