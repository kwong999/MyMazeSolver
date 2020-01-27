const Tile = require('../tile');

const DIRECTIONS = [
  [1, 0], [-1, 0], [-1, 1], [1, 1],
  [0, 1], [0, -1], [1, -1], [-1, -1]
]

const DIRECTIONS_NO_DIAGONAL = [
  [1, 0], [-1, 0],
  [0, 1], [0, -1]
]

const BFS  = {
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
      potentialTile.f = this.FScore([x, y], potentialTile); // update FScore
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
  FScore([x, y], potentialTile) {
    const parentFScoce = (potentialTile.parent.f) ? potentialTile.parent.f : 0;
    if (Math.abs(x + y) === 2 || x + y === 0) {
      return 14 + parentFScoce;
    } else {
      return 10 + parentFScoce;
    }
  }
}

module.exports = BFS;