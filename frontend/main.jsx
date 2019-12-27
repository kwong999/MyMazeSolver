import React from 'react';
import Maze from './maze/board'
import Board from './board';
import Controller from './controller';

const TYPE = [
  'blank',
  'wall',
  'start',
  'end'
]

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maze: new Maze([3, 3]),
      tileType: 'wall'
    }
    this.state.maze.changeTileType([0,0], 'start');
    this.state.maze.changeTileType([2,2], 'end');

    this.solve = this.solve.bind(this);
  }

  solve() {
    this.state.maze.run();
    this.setState({state: 'state'});
  }

  changeTileType(type) {
    return (e) => {
      if (TYPE.includes(type)) {
        this.setState({ tileType: type });
      } else {
        console.log('invalid type');
      }
    }
  }

  render() {
    console.log(this.constructor.name);
    console.log(this.state);
    return(
      <>
        <nav className='nav-bar'>
          Nav-bar
          <Controller 
            solve={this.solve}
            tileType={this.state.tileType}
            changeTileType={this.changeTileType.bind(this)}
          />
        </nav>
        <div className='maze'>
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