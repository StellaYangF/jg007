// const EventEmitter = require('events');
const EventEmitter = require('./events');
const util = require('util');

function Girl() {}

util.inherits(Girl, EventEmitter);
// Object.setPrototypeOf(Girl.prototype, EventEmitter.prototype);

let girl = new Girl;
// { "失恋": [fn, fn, ...] }
// girl.on('newListener', type => console.log(type));
// 一绑定事件，就会触发函数，但当前的fn还未添加到数组中
girl.on('newListener', type => {
    process.nextTick(() => {
        girl.emit(type, '谁');
    })
});
girl.on('失恋', who => console.log(who, '哭'));
girl.on('失恋', who => console.log(who, '逛街'));