import React from 'react';
import Maze from './maze/board';
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
      maze: new Maze([4, 4]),
      tileType: 'wall',
      disableUpdateTileType: false,
      solverStep: 'start'
    }
    this.solve = this.solve.bind(this);
    this.changeTileType = this.changeTileType.bind(this);
    this.renderParent = this.renderParent.bind(this);
  }

  // methods pass to Controller START
  solve() {
    this.setState( {disableUpdateTileType: true}, () => {
      if (typeof this.state.maze.start !== 'number') return alert('Missing Starting Point!');
      if (typeof this.state.maze.end !== 'number') return alert('Missing Ending Point!');
      this.state.maze.run(this.state.solverStep);
      this.setState({ solverStep: 2, disableUpdateTileType: false });
    })
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

  renderParent() {
    this.setState({state: 'state'});
  }
  // methods pass to Controller END

  render() {
    console.log(this.constructor.name);
    console.log(this.state);
    return(
      <>
        <nav className='nav-bar'>
          <Controller
            maze={this.state.maze}
            tileType={this.state.tileType}
            solve={this.solve}
            changeTileType={this.changeTileType}
            renderParent={this.renderParent}
          />
        </nav>
        <div className='maze'>
          <Board
            maze={this.state.maze}
            tileType={this.state.tileType}
            disableUpdateTileType={this.state.disableUpdateTileType}
          />
        </div>
      </>
    )
  }
}

export default Main;