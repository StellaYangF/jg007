// console.log(process.argv);
// 直接右键run node 

// 默认参数为:
[
  'C:\\Program Files\\nodejs\\node.exe',  // node根目录
  'c:\\Users\\Dell\\Desktop\\Stella\\WEB\\zfpx\\jg007\\6.EventLoop\\2.core\\2,argv.js'  //当前执行node目录
]

// win + r: cmd
// 输入： node argv.js -p 3000
[
  'C:\\Program Files\\nodejs\\node.exe',  // node根目录
  'c:\\Users\\Dell\\Desktop\\Stella\\WEB\\zfpx\\jg007\\6.EventLoop\\2.core\\2,argv.js',  //当前执行node目录
  '-p',
  '3000'
]


// commander 库
let program = require('commander');
// console.log(program.version());
program
  .option('-d, --debug', 'output extra debugging')
  .option('-s, --small', 'small pizza size')
  .option('-p, --pizza-type <type>', 'flavour of pizza');
program.parse(process.argv);
// console.log(program.opts());

process.env.bar = "bar";
console.log(process.env.bar);
// console.log(process.env);

