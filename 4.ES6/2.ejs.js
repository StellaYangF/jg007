const fs = require('fs');
const path = require("path");

let str = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");

function render(str, obj) {
  // 当前作用域下保存的 obj 供with作用域消费 直接拿去name 
  let head, content, tail;

  head = 'let str="";\r\nwith(name){\r\nstr = `\r\n';

  str = str.replace(/<%=([\s\S]+?)%>/g, function(){
    return '${' + arguments[1] + '}';
  });

  content = str.replace(/<%([\s\S]+?)%>/g, function() {
    return '`\r\n' + arguments[1] + '\r\nstr+=`'
  })

  tail = '`\r\n}\r\n return str'
  let s = head + content + tail;
  return new Function("name", s)(obj);
}

let res = render(str, {name: [1,2,3,4]});
console.log(res);


