class Element {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

class LinkList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  append (element) {
    let node = new Element(element);
    if(!this.head) this.head = node;
    else {
      let current = this.head;
      // 查找最后一个next，并指向为当前追加的element
      while (current.next) { 
        current = current.next;
      }
      current.next = node;
    }
    this.length ++;
    return true;
  }

  insert (position, element) {
    if(position >= 0 && position < this.length)  {
      let node = new Element(element);
      if (position == 0) {
        let oldNode = this.head;
        this.head = node ;
        node.next = oldNode;
      } else{
        let current = this.head;
        let previous = null;
        let index = 0;
        while ( index++ < position) {
          previous = current;
          current = current.next;
        }
        previous.next = node;
        node.next = current;
      }
      this.length ++;
      // 插入成功 返回true
      return true; 
    }
    // 插入失败 返回false  
  }

  remove (position) {
    if (position >= 0 && position < this.length) {
      let current = this.head;
      let index = 0;
      let next = current.next;
      let previous = null;

      if (position == 0) {
        this.head = next;
      } else {
        while(index++ < position) {
          previous = current;
          current = current.next;
          next = current.next;
        }
        previous.next = next;
      }

      this.length--;
      return true;
    }
    return false;
  }

  get(position)  {
    if (position >= 0 && position < this.length) {
      let current = this.head;
      let index = 0;
      
      while (index++< position) {
        current = current.next;
      }
      return current;
    }
  }

  set (position, element) {
    if (position >= 0 && position < this.length) {
      let current = this.head;
      let index = 0;
      while( index++ < position) {
        current = current.next;
        next = current.next;
      }
      current.element = element;
      return true;
    } 
    return false;
  }
}

let link = new LinkList();
link.append({name: "tom"});
link.append({name: "Jerry"});
link.append({name: "Richard"});
link.insert(0, {name:"Amy"});
link.insert(2, {name: "Eva"});
link.remove(3);
link.get(0);
link.set(0,{ name: "newAmy"});
console.log(link);