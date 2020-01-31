const Board = require('./board.js');
const Tile = require('./tile');
const BFS = require('./solver/bfs');
jest.mock('./tile');
jest.mock('./solver/bfs');

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  Tile.mockClear();
});
afterEach(() => {
  // Clear all instances and calls to constructor and all methods:
  jest.clearAllMocks();
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
      board.board[1][1].type = 'wall';
      board.board[0][0].type = 'blank';
      test("return true if tile is wall", () => {
        expect(board.isWall([1, 1])).toBeTruthy();
      });
      test("return false if tile is not wall", () => {
        expect(board.isWall([0, 0])).toBeFalsy();
      });
    });
    describe("posToCode", () => {
      test("return numerical position code",  () => {
        expect(board.posToCode([0, 4])).toEqual(4);
        expect(board.posToCode([2, 3])).toEqual(13);
      });
    });
    describe("codeToPos", () => {
      test("return array idx position", () => {
        expect(board.codeToPos(4)).toEqual([0, 4]);
        expect(board.codeToPos(13)).toEqual([2, 3]);
      });
    });
  });

  describe("Functions", () => {
    describe("fullReset", () => {
      const board = new Board([4, 5]);
      board.board[1][1].type = 'wall';
      board.start = 13;
      board.end = 4;
      board.possibleMove.push(4);
      board.usedMove.push(13);
      test("reset whole board", () => {
        expect(board.start).toBe(13);
        expect(board.end).toBe(4);
        expect(board.possibleMove.length).toEqual(1);
        expect(board.usedMove.length).toEqual(1);
        expect(board.isWall([1, 1])).toBeTruthy();
        board.fullReset();
        expect(board.start).toBeFalsy();
        expect(board.end).toBeFalsy();
        expect(board.possibleMove.length).toEqual(0);
        expect(board.usedMove.length).toEqual(0);
        expect(board.isWall([1, 1])).toBeFalsy();
      });
    });
    describe("softReset", () => {
      const board = new Board([4, 5]);
      board.board[1][1].type = 'wall';
      board.start = 13;
      board.end = 4;
      board.possibleMove.push(4);
      board.usedMove.push(13);
      test("reset to an unsolved board", () => {
        expect(board.possibleMove.length).toEqual(1);
        expect(board.usedMove.length).toEqual(1);
        expect(board.isWall([1, 1])).toBeTruthy();
        board.softReset();
        expect(board.start).toEqual(13);
        expect(board.end).toEqual(4);
        expect(board.possibleMove.length).toEqual(0);
        expect(board.usedMove.length).toEqual(0);
        expect(board.isWall([1, 1])).toBeTruthy();
      });
    });
    describe("changeTileType", () => {
      const board = new Board([4, 5]);
      const mChangeType = jest.fn()
      Tile.mockImplementation(() => {
        return { changeType: mChangeType };
      });
      mChangeType.mockReturnValue(true);
      test("change tile type to wall", () => {
        board.board[0][0] = new Tile([0, 0]);
        expect(board.changeTileType([0, 0], 'wall')).toBeTruthy();
        expect(mChangeType).toHaveBeenCalledTimes(1);
        expect(mChangeType.mock.calls[0][0]).toMatch(/wall/);
      });
      test("will not change second start tile on board", () => {
        board.board[2][1] = new Tile([2, 1]);
        board.board[2][2] = new Tile([2, 2]);
        expect(board.changeTileType([2, 1], 'start')).toBeTruthy();
        expect(board.changeTileType([2, 2], 'start')).toBeFalsy();
        expect(mChangeType).toHaveBeenCalledTimes(1);
        expect(mChangeType.mock.calls[0][0]).toMatch(/start/);
        expect(mChangeType.mock.calls[0][1]).toBeUndefined();
      });
      test("will not change second end tile on board", () => {
        board.board[3][1] = new Tile([3, 1]);
        board.board[3][2] = new Tile([3, 2]);
        expect(board.changeTileType([3, 1], 'end')).toBeTruthy();
        expect(board.changeTileType([3, 2], 'end')).toBeFalsy();
        expect(mChangeType).toHaveBeenCalledTimes(1);
        expect(mChangeType.mock.calls[0][0]).toMatch(/end/);
        expect(mChangeType.mock.calls[0][1]).toBeUndefined();
      });
    });
    describe("finish", () => {
      const board = new Board([3, 3]);
      test("will return true when end tile is a possible move", () => {
        board.end = 4;
        board.possibleMove = [1, 2, 4];
        expect(board.finish()).toBeTruthy();
      });
      test("will return true when all possible moves are used", () => {
        board.end = 8;
        board.possibleMove = [1, 2, 3, 6];
        board.usedMove = [1, 2, 3, 6];
        expect(board.finish()).toBeTruthy();
      });
    });
    describe("setSolution", () => {
      const board = new Board([3, 3]);
      board.start = 2;
      board.end = 6;
      board.board[2][0].parent = board.board[1][0];
      board.board[1][0].parent = board.board[0][0];
      board.board[0][0].parent = board.board[0][1];
      board.board[0][1].parent = board.board[0][2];
      board.setSolution();
      test("only update solution path tiles", () => {
        expect(board.board[1][0].solution).toBeTruthy();
        expect(board.board[0][0].solution).toBeTruthy();
        expect(board.board[0][1].solution).toBeTruthy();
        expect(board.board[0][2].solution).toBeTruthy();
        expect(board.board[1][1].solution).toBeFalsy();
      });
    });
    describe("solverFull", () => {
      test("solve the maze with solution path", () => {
        const board = new Board([3, 3]);
        board.board[0][2].type = 'start';
        board.board[2][0].type = 'end';
        board.start = 2;
        board.end = 6;
        const nextMove1 = jest.fn( () => {
          board.usedMove.push(2);
          board.possibleMove.push(5);
          board.board[1][2].parent = board.board[0][2];
          board.possibleMove.push(1);
          board.board[0][1].parent = board.board[0][2];
        })
        const nextMove2 = jest.fn(() => {
          board.usedMove.push(5);
          board.possibleMove.push(8);
          board.board[2][2].parent = board.board[1][2];
          board.possibleMove.push(4);
          board.board[1][1].parent = board.board[1][2];
        })
        const nextMove3 = jest.fn(() => {
          board.usedMove.push(1);
          board.possibleMove.push(4);
          board.board[1][1].parent = board.board[0][1];
          board.possibleMove.push(0);
          board.board[0][0].parent = board.board[0][1];
        })
        const nextMove4 = jest.fn(() => {
          board.usedMove.push(8);
          board.possibleMove.push(7);
          board.board[2][1].parent = board.board[2][2];
        })
        const nextMove5 = jest.fn(() => {
          board.usedMove.push(4);
          board.possibleMove.push(7);
          board.board[2][1].parent = board.board[1][1];
          board.possibleMove.push(3);
          board.board[1][0].parent = board.board[1][1];
        })
        const nextMove6 = jest.fn(() => {
          board.usedMove.push(0);
          board.possibleMove.push(3);
          board.board[1][0].parent = board.board[0][0];
        })
        const nextMove7 = jest.fn(() => {
          board.usedMove.push(7);
          board.possibleMove.push(6);
          board.board[2][0].parent = board.board[2][1];
        })
        BFS.nextMove
          .mockReturnValueOnce(nextMove1())
          .mockReturnValueOnce(nextMove2())
          .mockReturnValueOnce(nextMove3())
          .mockReturnValueOnce(nextMove4())
          .mockReturnValueOnce(nextMove5())
          .mockReturnValueOnce(nextMove6())
          .mockReturnValueOnce(nextMove7());
        BFS.determineNextPosition
          .mockReturnValueOnce(5)
          .mockReturnValueOnce(1)
          .mockReturnValueOnce(8)
          .mockReturnValueOnce(4)
          .mockReturnValueOnce(0)
          .mockReturnValueOnce(7);
        board.solverFull("", "Breadth First Search");
        expect(board.board[0][0].solution).toBeUndefined();
        expect(board.board[0][1].solution).toBeTruthy();
        expect(board.board[0][2].solution).toBeUndefined();
        expect(board.board[1][0].solution).toBeUndefined();
        expect(board.board[1][1].solution).toBeTruthy();
        expect(board.board[1][2].solution).toBeUndefined();
        expect(board.board[2][0].solution).toBeUndefined();
        expect(board.board[2][1].solution).toBeTruthy();
        expect(board.board[2][2].solution).toBeUndefined();
      });
      test("not solve if end tile is blocked", () => {
        const board = new Board([3, 3]);
        board.board[0][2].type = 'start';
        board.board[2][0].type = 'end';
        board.start = 2;
        board.end = 6;
        const nextMove1 = jest.fn(() => {
          board.usedMove.push(2);
          board.possibleMove.push(5);
          board.board[1][2].parent = board.board[0][2];
          board.possibleMove.push(1);
          board.board[0][1].parent = board.board[0][2];
        })
        const nextMove2 = jest.fn(() => {
          board.usedMove.push(5);
        })
        const nextMove3 = jest.fn(() => {
          board.usedMove.push(1);
        })
        BFS.nextMove
          .mockReturnValueOnce(nextMove1())
          .mockReturnValueOnce(nextMove2())
          .mockReturnValueOnce(nextMove3());
        BFS.determineNextPosition
          .mockReturnValueOnce(5)
          .mockReturnValueOnce(1);
        board.solverFull("", "Breadth First Search");
        expect(board.board[0][0].solution).toBeUndefined();
        expect(board.board[0][1].solution).toBeUndefined();
        expect(board.board[0][2].solution).toBeUndefined();
        expect(board.board[1][0].solution).toBeUndefined();
        expect(board.board[1][1].solution).toBeUndefined();
        expect(board.board[1][2].solution).toBeUndefined();
        expect(board.board[2][0].solution).toBeUndefined();
        expect(board.board[2][1].solution).toBeUndefined();
        expect(board.board[2][2].solution).toBeUndefined();
      })
    });
  });
});