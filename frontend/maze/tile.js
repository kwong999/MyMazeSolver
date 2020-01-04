const TYPE =[
  'blank',
  'wall',
  'start',
  'end'
]
class Tile {
  constructor(pos, parent = false) {
    this.pos = pos;
    // possible type: 
    this.type = 'blank';
    this.parent = parent;
    this.possibleMove = false;
    this.usedMove = false;
    this.solution = false;
    this.g = false;
    this.h = false;
    this.f = false;
  }

  changeType(type) {
    if (TYPE.includes(type)) {
      this.type = type;
      return true;
    } else {
      return false;
    }
  }

  reset() {
    this.parent = false;
    this.possibleMove = false;
    this.usedMove = false;
    this.solution = false;
    this.g = false;
    this.h = false;
    this.f = false;
  }
}

module.exports = Tile;