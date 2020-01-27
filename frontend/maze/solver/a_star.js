const Tile = require('../tile');

const DIRECTIONS = [
  [1, 0], [-1, 0], [-1, 1], [1, 1],
  [0, 1], [0, -1], [1, -1], [-1, -1]
]

const DIRECTIONS_NO_DIAGONAL = [
  [1, 0], [-1, 0],
  [0, 1], [0, -1]
]

const AStar = {
  nextMove(currentBoard, currentPosCode, movement) {
    const [currentX, currentY] = currentBoard.codeToPos(currentPosCode);
    currentBoard.usedMove.push(currentPosCode);
    currentBoard.board[currentX][currentY].usedMove = true;
    const directions = (movement === 'All Direction') ? DIRECTIONS : DIRECTIONS_NO_DIAGONAL;
    for (let [x, y] of directions) {
      const potentialPos = [currentX + x, currentY + y]
      if (!currentBoard.validPosition(potentialPos)) continue;
      if (currentBoard.isWall(potentialPos)) continue;
      if (currentBoard.board[currentX + x][currentY + y].usedMove) continue;
      if (currentBoard.start === currentBoard.posToCode(potentialPos)) continue;
      const potentialTile = new Tile(potentialPos, currentBoard.board[currentX][currentY]);
      potentialTile.possibleMove = true;
      potentialTile.g = this.GScore([x, y], potentialTile); // update GScore
      potentialTile.h = this.HScore(currentBoard.codeToPos(currentBoard.end), potentialTile); // update HScore
      potentialTile.f = potentialTile.g + potentialTile.h; // update FScore
      if (!!currentBoard.board[currentX + x][currentY + y].f && potentialTile.f > currentBoard.board[currentX + x][currentY + y].f) continue;
      currentBoard.board[currentX + x][currentY + y] = potentialTile;
      currentBoard.possibleMove.push(currentBoard.posToCode(potentialPos));
    }
  },
  determineNextPosition(currentBoard) {
    if (currentBoard.possibleMove.length === 0) return false;
    let possibleMove = currentBoard.possibleMove
      .filter(posCode => !currentBoard.usedMove.includes(posCode));
    if (possibleMove.length === 0) return false;
    let possibleMoveFScore = possibleMove
      .map(posCode => {
        const [x, y] = currentBoard.codeToPos(posCode);
        return currentBoard.board[x][y].f
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
  },
  GScore([x, y], potentialTile) {
    const parentGScoce = (potentialTile.parent.g) ? potentialTile.parent.g : 0;
    if (Math.abs(x + y) === 2 || x + y === 0) {
      return 14 + parentGScoce;
    } else {
      return 10 + parentGScoce;
    }
  },
  HScore([x, y], potentialTile) {
    const x_movement = Math.abs(x - potentialTile.pos[0])
    const y_movement = Math.abs(y - potentialTile.pos[1])
    return Math.min(x_movement, y_movement) * 14 + Math.abs(x_movement - y_movement) * 10;
  }
}

module.exports = AStar;