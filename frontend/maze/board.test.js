const Board = require('./board.js');
const Tile = require('./tile');
jest.mock('./tile');

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  Tile.mockClear();
});
// Board creation
test('Create Board', () => {
  expect(new Board([10,10])).toBeTruthy();
  expect(Tile).toHaveBeenCalledTimes(100);
});

// Board initialization
describe('Board initialization', () => {
  const board = new Board([4, 5]);
  test('build empty board according to dimension', () => {

    expect(board.board[0][0].constructor.name).toMatch(/Tile/);
    expect(board.board.length).toEqual(4);
    expect(board.board[0].length).toEqual(5);
  });
  test('store input dimension', () => {
    expect(board.dimension.constructor.name).toMatch(/Array/);
    expect(board.dimension[0]).toEqual(4);
    expect(board.dimension[1]).toEqual(5);
  });
  test('start is false', () => {
    expect(board.start).toBeFalsy();
  });
  test('end is false', () => {
    expect(board.end).toBeFalsy();
  });
  test('solver is aStar', () => {
    expect(board.solver).toMatch(/aStar/);
  });
  test('possibleMove is empty array', () => {
    expect(board.possibleMove.constructor.name).toMatch(/Array/);
    expect(board.possibleMove.length).toEqual(0);
  });
  test('usedMove is empty array', () => {
    expect(board.usedMove.constructor.name).toMatch(/Array/);
    expect(board.usedMove.length).toEqual(0);
  });
});

// Board functions
describe("Board functions", () => {
  describe("Helper functions", () => {
    const board = new Board([4, 5]);
    describe("inRange", () => {
      test("return true if in range", () => {
        expect(board.inRange(0, 0, 10)).toBeTruthy();
        expect(board.inRange(1, 0, 10)).toBeTruthy();
      });
      test("return false if out range", () => {
        expect(board.inRange(11, 0, 10)).toBeFalsy();
        expect(board.inRange(-1, 0, 10)).toBeFalsy();
      });
    });
    describe("validPosition", () => {
      test("return true if in range", () => {
        expect(board.validPosition([3, 4])).toBeTruthy();
        expect(board.validPosition([0, 0])).toBeTruthy();
      });
      test("return false if out range", () => {
        expect(board.validPosition([5, 5])).toBeFalsy();
        expect(board.validPosition([-1, 0])).toBeFalsy();
      });
    });
    describe("isWall", () => {
      
    });
    describe("posToCode", () => {

    });
    describe("codeToPos", () => {

    });
  });
});

// fullReset
// softReset
// changeTileType
// solverFull
// finish
// setSolution