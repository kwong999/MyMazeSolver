const BFS = require('./bfs');
const Board = require('../board');
const Tile = require('../tile');
jest.mock('../tile',
  function() {
    return jest.fn().mockImplementation(
      function (pos, parent = false) {
        this.pos = pos;
        this.type = 'blank';
        this.parent = parent;
        this.possibleMove = false;
        this.usedMove = false;
        this.solution = false;
        this.g = false;
        this.h = false;
        this.f = false;
        return this;
      }
    );
  });
jest.mock('../board');

describe("nextMove", () => {
  let board = new Board([3, 3]);
  board.board = new Array(3).fill(0).map(() => new Array(3));
  board.start = 4;
  board.usedMove = [];
  board.possibleMove = [];
  board.board[0][1] = new Tile();
  board.board[2][1] = new Tile();
  board.board[1][1] = new Tile();
  board.board[1][0] = new Tile();
  board.board[1][2] = new Tile();
  const mCodeToPos = jest
    .spyOn(board, 'codeToPos')
    .mockImplementation(val => [Math.floor(val / 3), val % 3]);
  const mPosToCode = jest
    .spyOn(board, 'posToCode')
    .mockImplementation(([x, y]) => 3*x + y);
  board.validPosition = jest.fn(() => true);
  // mock board[0, 1] is wall
  board.isWall = jest.fn(([x,y]) => (x === 0 && y === 1));
  BFS.nextMove(board, 4, "");
  test("will update usedMove list", () => {
    expect(mCodeToPos).toHaveBeenCalledTimes(1);
    expect(mPosToCode).toHaveBeenCalledTimes(6);
  });
  test("will update possibleMove list", () => {
    expect(board.possibleMove[0]).toEqual(7);
    expect(board.possibleMove[1]).toEqual(5);
    expect(board.possibleMove[2]).toEqual(3);
  });
  test("will update used Tile", () => {
    expect(board.usedMove[0]).toEqual(4);
  });
  test("will update possible Tile parent", () => {
    expect(board.board[2][1].parent === board.board[1][1]).toBeTruthy();
    expect(board.board[1][2].parent === board.board[1][1]).toBeTruthy();
    expect(board.board[1][0].parent === board.board[1][1]).toBeTruthy();
  });
});

describe("determineNextPosition", () => {
  test("return false when possibleMove is empty", () => {
    const board = new Board([3, 3]);
    board.possibleMove = [];
    expect(BFS.determineNextPosition(board)).toBeFalsy();
  });
  test("return false when all possibleMove were used", () => {
    const board = new Board([3, 3]);
    board.usedMove = [0, 1]
    board.possibleMove = [1];
    expect(BFS.determineNextPosition(board)).toBeFalsy();
  });
  test("return possible move with lowest FScore", () => {
    const board = new Board([3, 3]);
    board.board = new Array(3).fill(0).map( () => new Array(3));
    board.usedMove = [0];
    board.possibleMove = [1, 3];
    board.board[0][1] = new Tile();
    board.board[1][0] = new Tile();
    board.board[0][1].f = 10;
    board.board[1][0].f = 10;
    const mCodeToPos = jest.fn()
      .mockImplementation(val => [Math.floor(val / 3), val % 3]);
    board.codeToPos = mCodeToPos;
    expect(BFS.determineNextPosition(board)).toEqual(1);
  });
});

describe("FScore", () => {
  const tileP = new Tile([1, 1]);
  const tileC1 = new Tile([0, 1]);
  const tileC2 = new Tile([2, 1]);
  const tileC3 = new Tile([1, 0]);
  const tileC4 = new Tile([1, 2]);
  const tileCC1 = new Tile([0, 0]);
  tileP.f = false;
  tileC1.f = 10;
  tileC1.parent = tileP;
  tileC2.parent = tileP;
  tileC3.parent = tileP;
  tileC4.parent = tileP;
  tileCC1.parent = tileC1;
  test("calculate FScore", () => {
    expect(BFS.FScore([-1, 0], tileC1)).toEqual(10);
    expect(BFS.FScore([1, 0], tileC2)).toEqual(10);
    expect(BFS.FScore([0, -1], tileC3)).toEqual(10);
    expect(BFS.FScore([0, 1], tileC4)).toEqual(10);
    expect(BFS.FScore([0, -1], tileCC1)).toEqual(20);
  });
});