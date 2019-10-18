class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(){
    this.root = null;
  }

  insertTree(currentNode, newNode) {
    if (newNode.value < currentNode.value) {
      currentNode.left == null ? currentNode.left = newNode : this.insertTree(currentNode.left, newNode);
    } else {
      currentNode.right == null ? currentNode.right = newNode : this.insertTree(currentNode.right, newNode);
    }
  }

  set(value) {
    let node = new Node(value);
    !this.root ? this.root = node : this.insertTree(this.root, node);
  }
}

let tree = new Tree();
tree.set(100);
tree.set(80);
tree.set(70);
tree.set(100);
tree.set(999);