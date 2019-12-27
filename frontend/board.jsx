import React from 'react';
import Tile from './tile';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.handleTileClick = this.handleTileClick.bind(this);
  }
  
  handleTileClick(tile) {
    return (e) => {
      console.log('clicked');
      this.updateTileType(tile.pos);
    }
  }

  updateTileType(pos) {
    const { maze } = this.props;
    maze.changeTileType(pos, this.props.tileType);
    this.setState({state: this.state});
  }

  renderBoard() {
    console.log('renderBoard');
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
        className='tile'
        onClick={this.handleTileClick(tile)}
        key={`tile-${tile.pos[0]}-${tile.pos[1]}`}
      >
        <Tile tile={tile} />
      </div>
    ))
  }

  render() {
    console.log(this.constructor.name);
    console.log(this.props.maze);
    return(
      <>
        <h1>Board</h1>
        <ul className='Board'>
          {this.renderBoard()}
        </ul>
      </>
    )
  }
}

export default Board;