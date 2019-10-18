//队列 先进先出
class Stack {
  constructor() {
    this.arr = [];
  }

  push(element) {
    this.arr.push(element);
  }

  pop() {
    return this.pop();
  }
}
let stack = new Stack;

// 链表 队列 性能不好
// 队列在长度变化的时候，会不断更新下标 和 其对应的位置

// node流 多个异步 并发执行

// 100个 写入操作 同一个文件中写入 链表的方式