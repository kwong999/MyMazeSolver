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
    return (e) => {
      if (!this.props.mazeSolved) {
        this.updateTileType(tile.pos);
      } else {
        alert('Please reset solver to make changes.');
      }
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
        className={`tile ${tile.type}${(tile.usedMove && this.props.displaySearchedTile) ? ' used' : ''}${(tile.possibleMove) ? ' possible' : ''}${(tile.solution) ? ' solution' : ''}`}
        onClick={this.handleTileClick(tile)}
        key={`tile-${tile.pos[0]}-${tile.pos[1]}`}
      >
        <Tile />
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