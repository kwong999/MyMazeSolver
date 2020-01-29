const Tile = require('./tile.js');
// Tile creation
test('Create a tile', () => {
  expect(new Tile([0, 0])).toBeTruthy();
});

let testTile = new Tile([0, 0])
// Tile initialization
describe("Tile initialization", () => {
  test("type is blank", () => {
    expect(testTile.type).toMatch("blank");
  })

  test("parent is false", () => {
    expect(testTile.parent).toBeFalsy();
  })

  test("possibleMove is false", () => {
    expect(testTile.possibleMove).toBeFalsy();
  })

  test("usedMove is false", () => {
    expect(testTile.usedMove).toBeFalsy();
  })

  test("solution is false", () => {
    expect(testTile.solution).toBeFalsy();
  })

  test("g is false", () => {
    expect(testTile.g).toBeFalsy();
  })

  test("h is false", () => {
    expect(testTile.h).toBeFalsy();
  })

  test("f is false", () => {
    expect(testTile.f).toBeFalsy();
  })
});

// Tile functions
describe("changeType", () => {
  test("can change type to blank", () => {
    expect(testTile.changeType("blank")).toBeTruthy();
    expect(testTile.type).toMatch("blank");
  })
  test("can change type to wall", () => {
    expect(testTile.changeType("wall")).toBeTruthy();
    expect(testTile.type).toMatch("wall");
  })
  test("can change type to start", () => {
    expect(testTile.changeType("start")).toBeTruthy();
    expect(testTile.type).toMatch("start");
  })
  test("can change type to end", () => {
    expect(testTile.changeType("end")).toBeTruthy();
    expect(testTile.type).toMatch("end");
  })
  test("cannot change type to asdfg", () => {
    expect(testTile.changeType("asdfg")).toBeFalsy();
    expect(testTile.type).not.toMatch("asdfg");
  })
})

describe("reset", () => {
  test("will reset all entry expect type", () => {
    testTile.changeType("wall");
    testTile.parent = true;
    testTile.possibleMove = true;
    testTile.usedMove = true;
    testTile.solution = true;
    testTile.g = true;
    testTile.h = true;
    testTile.f = true;
    testTile.reset();
    expect(testTile.type).toMatch("wall");
    expect(testTile.parent).toBeFalsy();
    expect(testTile.possibleMove).toBeFalsy();
    expect(testTile.usedMove).toBeFalsy();
    expect(testTile.solution).toBeFalsy();
    expect(testTile.g).toBeFalsy();
    expect(testTile.h).toBeFalsy();
    expect(testTile.f).toBeFalsy();
  })
})