import React from 'react';

class Tile extends React.Component {
  render() {
    const { tile } = this.props;
    return (
      <p>{tile.type}</p>
    )
  }
}

export default Tile;