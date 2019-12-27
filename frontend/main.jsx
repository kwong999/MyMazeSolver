import React from 'react';
import Maze from './maze/board'
import Board from './board';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maze: new Maze([3, 3]),
      tileType: 'wall'
    }
    this.state.maze.changeTileType([0,0], 'start');
    this.state.maze.changeTileType([0,2], 'end');

    this.solve = this.solve.bind(this);
  }

  solve() {
    console.log(this.state.maze.board);
    this.state.maze.run();
  }

  render() {
    console.log(this.constructor.name);
    return(
      <>
        <nav className='nav-bar'>
          Nav-bar
          <button onClick={this.solve}>Solve</button>
        </nav>
        <div className='maze'>
          Main-board
          <Board 
            maze={this.state.maze}
            tileType={this.state.tileType}
          />
        </div>
      </>
    )
  }
}

export default Main;