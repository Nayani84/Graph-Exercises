class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    if (vertex instanceof Node) {
      this.nodes.add(vertex);
    } else {
      throw new Error("must be an instance of Node");
    }
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    if (this.nodes.has(v1) && this.nodes.has(v2)) {
      v1.adjacent.add(v2);
      v2.adjacent.add(v1);
    } else {
      throw new Error ("v1 , v2 must exist in the graph");
    }
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    if (this.nodes.has(v1) && this.nodes.has(v2)) {
      v1.adjacent.delete(v2);
      v2.adjacent.delete(v1);
    } else {
      throw new Error ("v1 , v2 must exist in the graph");
    }
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    if (this.nodes.has(vertex)){
      for(let adjacentNode of vertex.adjacent) {
        adjacentNode.adjacent.delete(vertex);
      }
      this.nodes.delete(vertex);
    }
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const visited = new Set();
    const result = [];

    function dfs(vertex) {
      if(!vertex || visited.has(vertex)) return;
      visited.add(vertex);
      result.push(vertex.value);
      for (let neighbor of vertex.adjacent) {
        dfs(neighbor);
      }
    }

    dfs(start);
    return result;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const visited = new Set();
    const queue = [start];
    const result = [];

    visited.add(start);

    while (queue.length) {
      const vertex = queue.shift();
      result.push(vertex.value);

      for (let neighbor of vertex.adjacent) {
        if(!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
    return result;
  }
}

module.exports = {Graph, Node}