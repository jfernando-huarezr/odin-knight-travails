import Graph from "./graph-edge-list.js";
import Dijkstra from "./dijkstra.js";

//chess board have 64 squares
const BOARD_WIDTH = 8;
//valid moves for a knight
let moves = [
  [-2, -1],
  [-2, 1],
  [-1, -2],
  [-1, 2],
  [1, -2],
  [1, 2],
  [2, -1],
  [2, 1],
];

let graph = new Graph();

//We create the same number of nodes as there are
//squares on our chess board
for (let i = 0; i < BOARD_WIDTH; i++) {
  for (let j = 0; j < BOARD_WIDTH; j++) {
    graph.addNode([i, j]);
  }
}

//now we have to add the connections
for (let col = 0; col < BOARD_WIDTH; col++) {
  for (let row = 0; row < BOARD_WIDTH; row++) {
    //from each square, a knight can have 8 possible connections
    for (let move of moves) {
      let newCol = col + move[0];
      let newRow = row + move[1];
      if (
        newCol >= 0 &&
        newRow >= 0 &&
        newCol < BOARD_WIDTH &&
        newRow < BOARD_WIDTH
      ) {
        // (newCol, newRow) is a valid position on the board
        const firstNode = col * BOARD_WIDTH + row;
        const secondNode = newCol * BOARD_WIDTH + newRow;
        graph.addConnection(firstNode, secondNode);
      }
    }
  }
}

export function knightMoves(start, finish) {
  if (!Array.isArray(start) || !Array.isArray(finish)) return;
  if (start.length !== 2 || finish.length !== 2) return;

  if (
    start[0] < 0 ||
    start[0] >= BOARD_WIDTH ||
    start[1] < 0 ||
    start[1] >= BOARD_WIDTH ||
    finish[0] < 0 ||
    finish[0] >= BOARD_WIDTH ||
    finish[1] < 0 ||
    finish[1] >= BOARD_WIDTH
  )
    return;

  const startNode = start[0] * BOARD_WIDTH + start[1];
  const finishNode = finish[0] * BOARD_WIDTH + finish[1];

  const path = Dijkstra.getMinPath(graph, startNode, finishNode);

  const pathArray = [];
  for (let node of path) {
    pathArray.push(graph.getValue(node));
  }

  console.log(`
    You made it in ${
      pathArray.length - 1
    } moves! Here's your path: ${JSON.stringify(pathArray)} 
  `);
}
