const Tile = require('./tile.js');

const DIRECTIONS = [
  [1, 0], [-1, 0], [-1, 1], [1, 1],
  [0, 1], [0, -1], [1, -1], [-1, -1],
]

class Board {
  constructor(dimension) {
    this.board = this.emptyBoard(dimension);
    this.dimension = dimension;
    this.start = false;
    this.end = false;
    this.solver = 'aStar'
    this.possibleMove = []; // Array of posCode
    this.usedMove = []; // Array of posCode
  }

  emptyBoard(dimension) {
    let emptyBoard = new Array(dimension[0]);
    for (let i = 0; i < emptyBoard.length; i++) {
      emptyBoard[i] = new Array(dimension[1]);
    }
    for (let x = 0; x < dimension[0]; x++) {
      for (let y = 0; y < dimension[1]; y++) {
        emptyBoard[x][y] = new Tile([x, y]);
      }
    }
    return emptyBoard;
  }

  inRange(num, min, max) {
    if (!Number.isInteger(num)) return false;
    return ((num - min) * (num - max) <= 0);
  }

  validPosition([x, y]) {
    return (this.inRange(x, 0, this.dimension[0] - 1) && this.inRange(y, 0, this.dimension[1] - 1));
  }

  isWall([x,y]) {
    return (this.board[x][y].type === 'wall');
  }

  posToCode(pos) {
    return pos[0] * this.dimension[1] + pos[1];
  }

  codeToPos(posCode) {
    return [Math.floor(posCode/this.dimension[1]), posCode%this.dimension[1]]
  }

  fullReset() {
    this.board = this.emptyBoard(this.dimension);
    this.start = false;
    this.end = false;
  }

  softReset() {
    for (let x = 0; x < this.dimension[0]; x++) {
      for (let y = 0; y < this.dimension[1]; y++) {
        this.board[x][y].reset();
      }
    }
  }

  buildBoard(dimension) {
    this.board = this.emptyBoard(dimension);
    this.dimension = dimension;
  }

  changeTileType(pos, type) {
    const [x, y] = pos;
    if (!this.validPosition(pos)) return false;
    const tile = this.board[x][y];
    switch (type) {
      case 'start':
        if (typeof this.start === 'number') return false;
        this.start = this.posToCode(pos);
        break;
      case 'end':
        if (typeof this.end === 'number') return false;
        this.end = this.posToCode(pos);
        break;
    }
    const prevType = tile.type;
    if (!tile.changeType(type)) return false;
    switch (prevType) {
      case 'start':
        this.start = false;
        break;
      case 'end':
        this.end = false;
        break;
    }
    return true;
  }

  run() {
    this.possibleMove = [];
    this.usedMove = [];
    this.nextMove(this.start);
    let finish = false;
    while(!finish) {
      const currentPosCode = this.determineNextPosition();
      if (currentPosCode) {
        this.nextMove(currentPosCode);
        finish = this.finish();
      } else {
        finish = true;
      }
    }
    const endPos = this.codeToPos(this.end);
    this.board[endPos[0]][endPos[1]].changeType('end');
    console.log('Print Solution: ');
    this.printSolution();
  }

  runMove(step) {
    switch(step) {
      case 'start':
        this.possibleMove = [];
        this.usedMove = [];
        this.nextMove(this.start);
      default:
        const currentPosCode = this.determineNextPosition();
        if (currentPosCode) {
          this.nextMove(currentPosCode);
        } else {
          return true
        }
    }
    return true;
  }

  finish() {
    if (this.possibleMove.includes(this.end)) return true;
    return (this.possibleMove.filter(move => !this.usedMove.includes(move)).length === 0) 
  }

  printSolution() {
    const [x, y] = this.codeToPos(this.end);
    let endTile = this.board[x][y];
    if (!endTile.parent) return console.log('No Solution');
    console.log(endTile.pos);
    while (!!endTile.parent) {
      endTile = endTile.parent;
      console.log(endTile.pos);
    }
  }

  // step logic
  nextMove(currentPosCode) {
    const [currentX, currentY] = this.codeToPos(currentPosCode);
    this.usedMove.push(currentPosCode);
    this.board[currentX][currentY].usedMove = true;
    for (let [x, y] of DIRECTIONS) {
      const potentialPos = [currentX + x, currentY + y]
      if (!this.validPosition(potentialPos)) continue;
      if (this.isWall(potentialPos)) continue;
      if (this.start === this.posToCode(potentialPos)) continue;
      const potentialTile = new Tile(potentialPos, this.board[currentX][currentY]);
      potentialTile.possibleMove = true;
      potentialTile.g = this.GScore([x, y], potentialTile); // update GScore
      potentialTile.h = this.HScore(this.codeToPos(this.end), potentialTile); // update HScore
      potentialTile.f = potentialTile.g + potentialTile.h; // update FScore
      if (!!this.board[currentX + x][currentY + y].f && potentialTile.f > this.board[currentX + x][currentY + y].f) continue;
      this.board[currentX + x][currentY + y] = potentialTile;
      this.possibleMove.push(this.posToCode(potentialPos));
    }
  }

  determineNextPosition() {
    if (this.possibleMove.length === 0) return false;
    let possibleMove = this.possibleMove
      .filter(posCode => !this.usedMove.includes(posCode));
    let possibleMoveFScore = possibleMove 
      .map( posCode => {
        const [x, y] = this.codeToPos(posCode);
        return this.board[x][y].f
      })
    let nextPosCode = possibleMove[0];
    let FScorePointer = possibleMoveFScore[0];
    for (let idx in possibleMoveFScore) {
      if (possibleMoveFScore[idx] < FScorePointer) {
        FScorePointer = possibleMoveFScore[idx];
        nextPosCode = possibleMove[idx];
      }
    }
    return nextPosCode;
  }

  GScore([x, y], potentialTile) {
    const parentGScoce = (potentialTile.parent.g) ? potentialTile.parent.g : 0;
    if (Math.abs(x + y) === 2 || x + y === 0) {
      return 14 + parentGScoce;
    } else {
      return 10 + parentGScoce;
    }
  }

  HScore([x, y], potentialTile) {
    const x_movement = Math.abs(x - potentialTile.pos[0])
    const y_movement = Math.abs(y - potentialTile.pos[1])
    return Math.min(x_movement, y_movement) * 14 + Math.abs(x_movement - y_movement) * 10;
  }
}

module.exports = Board;

//test start
// let maze1 = new Board([3, 3]);
// maze1.changeTileType([0, 0], 'start');
// maze1.changeTileType([0, 2], 'end');
// maze1.changeTileType([0, 2], 'blank');
// maze1.changeTileType([0, 1], 'wall');
// maze1.changeTileType([1, 1], 'wall');
// maze1.changeTileType([1, 1], 'blank');

// let maze2 = new Board([6, 14]);
// maze2.changeTileType([5, 0], 'start');
// maze2.changeTileType([0, 13], 'end');
// maze2.changeTileType([1, 4], 'wall');
// maze2.changeTileType([2, 4], 'wall');
// maze2.changeTileType([3, 4], 'wall');
// maze2.changeTileType([4, 4], 'wall');
// maze2.changeTileType([5, 4], 'wall');
// maze2.changeTileType([0, 9], 'wall');
// maze2.changeTileType([1, 9], 'wall');
// maze2.changeTileType([2, 9], 'wall');
// maze2.changeTileType([3, 9], 'wall');
// maze2.changeTileType([4, 9], 'wall');
// maze2.changeTileType([1, 12], 'wall');
// maze2.changeTileType([1, 13], 'wall');

// b.changeTileType([4, 4], 'started');
// b.next_move(b.start);
// let nextPosCode = b.determineNextPosition()
// b.next_move(nextPosCode);
// b.printSolution();

// try {
//   maze2.run();
// } catch (error) {
//   console.log(error);
// }
// console.log('Done');