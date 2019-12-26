const Tile = require('./tile.js');

const DIRECTIONS = [
  [1, 0], [-1, 0], [-1, 1], [1, 1],
  [0, 1], [0, -1], [1, -1], [-1, -1],
]

class Board {
  constructor(dimension) {
    this.board = this.newBoard(dimension);
    this.dimension = dimension;
    this.start = false;
    this.end = false;
    this.solver = 'aStar'
    this.possibleMove = [];
    this.usedMove = [];
  }

  newBoard(dimension) {
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

  inRange = (num, min, max) => {
    if (!Number.isInteger(num)) return false;
    return ((num - min) * (num - max) <= 0);
  }

  validPosition([x, y]) {
    return this.inRange(x, 0, this.dimension[0]) && this.inRange(y, 0, this.dimension[1]);
  }

  posToCode(pos) {
    return pos[0] * this.dimension[1] + pos[1];
  }

  codeToPos(posCode) {
    return [Math.floor(posCode/this.dimension[1]), posCode%this.dimension[1]]
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
    const prevType = tile.type
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

  solver() {
    next_move(this.start);
    this.possibleMove = [];
    this.usedMove = [];
    let finish = false;
    while(!finish) {
      currentPosCode = determine_next_position();
      next_move(currentPosCode);
      finish = this.possibleMove.includes(this.end);
      if (this.usedMove.length == this.possibleMove.length) {
        // no more possible move, still not reach the end
        finish = true;
        console.log('No Solution');
      }
    }
    console.log('Print Solution');
  }

  // return an array with all possible move
  next_move(currentPosCode) {
    const [currentX, currentY] = this.codeToPos(currentPosCode);
    this.usedMove.push(currentPosCode);
    for (let [x, y] of DIRECTIONS) {
      const potentialPos = [currentX + x, currentY + y]
      if (!this.validPosition(potentialPos)) continue;
      const potentialTile = new Tile(potentialPos, this.board[currentX][currentY]);
      potentialTile.g = this.GScore([x, y], potentialTile); // update GScore
      potentialTile.h = this.HScore(this.codeToPos(this.end), potentialTile); // update HScore
      potentialTile.f = potentialTile.g + potentialTile.h; // update FScore
      this.board[currentX][currentY] = potentialTile;
      this.possibleMove.push(potentialTile);
    }
  }

  determineNextPosition() {

  }

  GScore([x, y], potentialTile) {
    const parentGScoce = (potentialTile.parent.G) ? potentialTile.parent.G : 0;
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

//test start
let b = new Board([3, 3]);
b.changeTileType([0, 0], 'start');
b.changeTileType([4, 4], 'started');
b.changeTileType([2, 2], 'end');
b.next_move(b.start);

