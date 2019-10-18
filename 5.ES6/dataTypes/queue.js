// 栈 先进后出
class Queue{
  constructor() {
    this.arr = [];
  }

  enqueue(element) {
    this.arr.push(element);
  }

  dequeue() {
    return this.arr.shift();
  }
}


let queue =  new Queue();

queue.enqueue(1);
queue.enqueue(2);
queue.dequeue();
// 数组会根其下标重新排序


