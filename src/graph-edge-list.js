export default class Graph {
  constructor() {
    // lista de nodos
    this.nodes = [];
    // lista de aristas
    this.edges = [];
  }

  addNode(value) {
    // agrega el nuevo nodo a la lista de nodos
    this.nodes.push(value);
  }

  addConnection(i, j, weight = 1) {
    // Check if the edge already exists
    if (!this.isConnected(i, j)) {
      // If not, add the new edge
      this.edges.push({ start: i, end: j, weight: weight });
    }
  }

  getWeight(i, j) {
    for (let edge of this.edges) {
      if (edge.start === i && edge.end === j) return edge.weight;
      else if (edge.start === j && edge.end === i) return edge.weight;
    }
    return null;
  }

  isConnected(i, j) {
    // se recorre toda la lista de aristas
    for (let edge of this.edges) {
      // preguntando si se encuentra la arista i---j o la arista j---i
      if (edge.start === i && edge.end === j) return true;
      else if (edge.start === j && edge.end === i) return true;
    }
    // si no se encontró niguna coincidencia, retorna false
    return false;
  }

  getNeighbors(index) {
    // empezamos con una lista de vecinos vacía
    let neighbors = [];

    // se recorre la lista de aristas en busca de vecinos
    for (let edge of this.edges) {
      // si se encontró a index como start de una arista, se agrega a end como vecino
      if (edge.start === index) neighbors.push(edge.end);
      // si se encontró a index como end de una arista, se agrega a start como vecino
      else if (edge.end === index) neighbors.push(edge.start);
    }

    // se retorna la lista de vecinos encontrados
    return neighbors;
  }

  print() {
    // se imprimen los nodos
    console.log("nodos:");
    this.nodes.forEach((node, i) => {
      console.log(i + ": " + node);
    });

    // se imprimen las conexiones
    console.log("conexiones:");
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        if (this.isConnected(i, j)) {
          console.log(i + " --- " + j + " : " + this.getWeight(i, j));
        }
      }
    }
  }

  getValue(index) {
    return this.nodes[index];
  }
}
