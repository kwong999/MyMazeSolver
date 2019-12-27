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
    this.g = false;
    this.h = false;
    this.f = false;
  }

  changeType(type) {
    if (TYPE.includes(type)) {
      this.type = type;
      return true;
    } else {
      console.log('invalid type');
      return false;
    }
  }
}

module.exports = Tile;