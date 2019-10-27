import { isSameNode, isVnode } from "./vnode.js";

function updateProperties(vnode, oldProps = {}) {
  let newProps = vnode.props;
  let domElement = vnode.domElement;
  let oldStyle = oldProps.style || {};
  let newStyle = newProps.style || {};

  for (let oldAttrName in oldStyle) {
    if(!newStyle[oldAttrName]) {
      domElement.style[oldAttrName] = "";
    }
  }

  for (let oldPropName in oldProps) {
    if (!newProps[oldPropName]) {
      delete domElement[oldPropName];
    }
  }

  for (let newPropName in newProps) {
    if(newPropName === "style") {
      let styleObject = newProps.style;
      for (let newAttrName in styleObject) {
        domElement.style[newAttrName] = styleObject[newAttrName];
      }
    } else {
      domElement[newPropName] = newProps[newPropName];
    }
  }
}

function createDOMElementFromVnode(vnode) {
  let { type, children } = vnode;

  if (type) {
    let domElement = vnode.domElement = document.createElement(type);
    updateProperties(vnode);
    if (Array.isArray(children)) {
      children.forEach(child => domElement.appendChild(createDOMElementFromVnode(child)));
    }
  } else {
    vnode.domElement = document.createTextNode(vnode.text);
  }
  return vnode.domElement;
}

function updateChildren(parentDomElement, oldChildren, newChildren) {
  let oldStartIndex = 0, oldStartVnode = oldChildren[0];
  let oldEndIndex = oldChildren.length - 1, oldEndVnode = oldChildren[oldEndIndex];

  let newStartIndex = 0, newStartVnode = newChildren[0];
  let newEndIndex = newChildren.length - 1, newEndVnode = newChildren[newEndIndex];

  let oldKeyToIndexMap = createKeyToIndexMap(oldChildren);

  while(oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    if(!oldStartVnode) {
      oldStartVnode = oldChildren[++oldStartIndex];
    } else if (!oldEndVnode) {
      oldEndVnode = oldChildren[--oldEndVnode];
    } else if(isSameNode(newStartVnode, oldStartVnode)) {
      patch(oldStartVnode, newStartVnode);
      oldStartVnode = oldChildren[++oldStartIndex];
      newStartVnode = newChildren[++newStartIndex];
    } else if(isSameNode(newEndVnode, oldEndVnode)) {
      patch(oldEndVnode, newEndVnode);
      oldEndVnode = oldChildren[--oldEndIndex];
      newEndVnode = newChildren[--newEndIndex];
    } else if(isSameNode(newStartVnode, oldEndVnode)) {
      patch(oldEndVnode, newStartVnode);
      parentDomElement.insertBefore(oldEndVnode.domElement, oldStartVnode.domElement);
      oldEndVnode = oldChildren[--oldEndIndex];
      newStartVnode = newChildren[++newStartIndex];
    } else if(isSameNode(newEndVnode, oldStartVnode)) {
      patch(oldStartVnode, newEndVnode);
      parentDomElement.insertBefore(oldStartVnode.domElement, oldEndVnode.domElement.nextElementSibling);
      oldStartVnode = oldChildren[++oldStartIndex];
      newEndVnode = newChildren[--newEndIndex];
    } else {
      let oldIndexByKey = oldKeyToIndexMap[newStartVnode.key];
      if (oldIndexByKey == null){
        parentDomElement.insertBefore(createDOMElementFromVnode(newStartVnode), oldStartVnode.domElement);
      } else {
        let oldVnodeToMove = oldChildren[oldIndexByKey];
        if (oldVnodeToMove.type !== newStartVnode.type) {
          parentDomElement.insertBefore(createDOMElementFromVnode(newStartVnode), oldStartVnode.domElement);
        } else {
          patch(oldVnodeToMove, newStartVnode);
          oldChildren[oldIndexByKey] = undefined;
          parentDomElement.insertBefore(oldVnodeToMove.domElement, oldStartVnode.domElement);
        }
      }
      newStartVnode = newChildren[++newStartIndex];
    }
  }
  if (newStartIndex <= newEndIndex) {
    let beforeDOMElement = newChildren[newEndIndex + 1] == null ? null : newChildren[newEndIndex + 1].domElement;
    for (let i = newStartIndex; i <= newEndIndex; i++) {
      parentDomElement.insertBefore(createDOMElementFromVnode(newChildren[i]), beforeDOMElement);
    }
  }
  if (oldStartIndex <= oldEndIndex) {
    for(let i = oldStartIndex; i <= oldEndIndex; i++) {
      parentDomElement.removeChild(oldChildren[i].domElement);
    }
  }
}

function createKeyToIndexMap(children) {
  let map = {};
  for (let i = 0; i < children.length; i++) {
    let key = children[i].key;
    if (key) {
      map[key] = i;
    }
  }
  return map;
}

export function mount(vnode, contianer) {
  let newDOMElement = createDOMElementFromVnode(vnode);
  contianer.appendChild(newDOMElement);
}

export function patch(oldVnode, newVnode) {
  if (oldVnode.type !== newVnode.type) {
    oldVnode.domElement.parentNode.replaceChild(createDOMElementFromVnode(newVnode), oldVnode.domElement);
  }
  if (typeof newVnode.text !== "undefined") {
    return oldVnode.domElement.textContent = newVnode.text;
  }

  let domElement = newVnode.domElement = oldVnode.domElement;

  updateProperties(newVnode, oldVnode.props);
  let oldChildren = oldVnode.children;
  let newChildren = newVnode.children;
  if (oldChildren.length > 0 && newChildren.length > 0 ) {
    updateChildren(domElement, oldChildren, newChildren);
  } else if (oldChildren.length > 0 ) {
    domElement.innerHTML = "";
  } else if (newChildren.length > 0 ) {
    newChildren.forEach(child => domElement.appendChild(createDOMElementFromVnode(child)));
  }
}
