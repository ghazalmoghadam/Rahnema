class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

const list = new Node("a", new Node("b"));
const nodes = [];

const insert = (value, nodes) => {
  const count = nodes.length;
  const newNode = [];
  newNode.push(new Node(value, nodes[0]));
  return newNode.concat(nodes);
};

const recInsert = (value, nextNode) => {
  //in start point node= start node
  node = new Node(value);
  node.next = nextNode;
};

const insertList = (value, nodes) => {
  const newNode = new Node(value);
  if (nodes.length > 0) {
    nodes.at(-1).next = newNode;
  }
  return [...nodes, newNode];
};

const recInsertList = (value, startNode) => {
  if (!startNode) throw Error("Can't insert at end of empty list");

  if (startNode.next == null) {
    startNode.next = new Node(value);
    return;
  }

  recInsertList(value, startNode.next);
};

const size = (nodes) => {
  return nodes.length;
};
const recSize = (node) => {
  function rec(node, size) {
    if (!node) return size;
    return rec(node.next, size + 1);
  }

  return rec(node, 0);
};

const at = (n, nodes) => nodes.at(n);

const recAt = (n, startNode) => {
  if (!startNode) return;
  if (n == 0) return startNode;
  return recAt(n - 1, startNode.next);
};

const join = (sep, nodes) => {
  return nodes.map(node => node.value).join(sep);
  // return nodes.map(node => String(node.value)).reduce((acc, curr) => acc + sep + curr);
};
const recJoin = (separatorStr, startNode, result) => {
  if (!startNode) return result;
  result = result.concat(separatorStr, startNode.value);
  return recJoin(separatorStr, startNode.next, result);
};

const map = (fn, nodes) => {
  return nodes.map((x) => fn(x.value));
};
const recMap = (fn, startNode, newNodes) => {
  if (!startNode) return newNodes;
  const newNode= new Node(fn(startNode.value));
  if(newNodes !=[]){
    newNodes.at(-1).next = newNode;
  }
  newNodes.push(newNode);
  return recMap(fn, startNode.next, newNodes);
};

const filter = (fn, nodes) => {
  return nodes.filter((x) => fn(x.value));
};
const recFilter = (fn, startNode, newNodes) => {
  if (!startNode) return newNodes;
  if (fn(startNode.value)) 
    newNodes.push(startNode); //newNodes=[...newNodes, startNode];
  return recFilter(fn, startNode.next, newNodes);
};

const find = (fn, nodes) => {
  return nodes.find((x) => fn(x.value));
};
const recFind = (fn, startNode) => {
  if (!startNode) return -1;
  if (fn(startNode.value)) return startNode;
  return recFind(fn, startNode.next);
};
