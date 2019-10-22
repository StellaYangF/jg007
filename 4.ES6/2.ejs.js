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
  return new Function("name", s)(obj); //立即执行函数IIFE： Imediately-Invoked Function Expression
};
let obj = { name: [1,2,3,4]};

let res = render(str, obj);
console.log(res);


// 解析结果入如下
res = (function (name) {
  let str="";
  with(name){
  str = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
  </head>
  <body>
    ` 
    name.forEach(item=>{ str+=`
      <li>${item}</li>
    `
  })
  str+=`
  </body>
  </html>`
  }
   return str

}(obj))

// regExp Review正则表达式 复习
// '<span><%=data.list[i]%></span>'.match(/<%=(.+?)%>/)

// '<span><%=data.list[i]%></span>'.match(/<%=([\s\S]+?)%>/)