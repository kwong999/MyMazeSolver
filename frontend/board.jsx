import React from 'react';
import Tile from './tile';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state: 'state'
    };
    this.handleTileClick = this.handleTileClick.bind(this);
  }
  
  handleTileClick(tile) {
    console.log('handleTileClick');
    return (e) => {
      this.updateTileType(tile.pos);
    }
  }

  updateTileType(pos) {
    const { maze } = this.props;
    maze.changeTileType(pos, this.props.tileType);
    this.setState({state: 'state'});
  }

  renderBoard() {
    const { maze } = this.props;
    return maze.board.map( (row, idx) => (
      <li className='row' key={`row-${idx}`}>
        {this.renderRow(row)}
      </li>
    ))
  }

  renderRow(row) {
    return row.map( tile => (
      <div 
        className={`tile ${tile.type}${(tile.usedMove) ? ' used' : ''}${(tile.possibleMove) ? ' possible' : ''}`}
        onClick={this.handleTileClick(tile)}
        key={`tile-${tile.pos[0]}-${tile.pos[1]}`}
      >
        <Tile tile={tile} />
      </div>
    ))
  }

  render() {
    return(
      <>
        <ul className='board'>
          {this.renderBoard()}
        </ul>
      </>
    )
  }
}

export default Board;