// 队列 先进后出
class Queue{
  constructor() {
    this.arr = [];
  }

  enqueue(element) {
    this.arr.push(element);
  }

  dequeue() {
    this.arr.shift();
  }
}

