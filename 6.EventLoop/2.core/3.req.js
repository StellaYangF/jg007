const fs = require("fs");
const path = require("path");
const vm = require("vm");

function Module(id) {
  this.id = id;
  this.exports = {};
}

Module.extensions = {};

Module.extensions['.json'] = function (module) {
  let script = fs.readFileSync(path.resolve(__filename, module.id));
  module.exports = JSON.parse(script);
}

Module.extensions['.js'] = function (module) {
  let script = fs.readFileSync(path.resolve(__filename, module.id));
  let content = wrapper[0] + script + wrapper[1];
  let fn = vm.runInThisContext(content);
  let __dirname = path.dirname(module.id);
  fn.call(module.exports, module.exports, req, module, __dirname, module.id)
}

Module.__resolveFileName = function (id) {
  let abstractPath = path.resolve(__dirname, id);
  let currentPath = "";

  if(fs.existsSync(abstractPath)) return abstractPath;
  let extensions = Object.keys(Module.extensions);
  for(let i = 0 ; i < extensions.length; i++) {
     currentPath = abstractPath + extensions[i];
     if (fs.existsSync(currentPath)) {
       return currentPath
    };
  }
  
  throw new Error(`no such file or directory ${abstractPath}`)
}

let wrapper = [
  '(function ( exports, require, module, __dirname, __filename ) {\r\n',
  '\r\n})'
]

function tryModuleLoad(module) {
  let ext = path.extname(module.id);
  Module.extensions[ext](module);
}

function req(id) {
  let filename = Module.__resolveFileName(id);
  let module = new Module(id);
  tryModuleLoad(module);
  return module.exports;
}

let {a} = require("./a");
console.log(a);
