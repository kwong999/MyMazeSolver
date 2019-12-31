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
      maze: new Maze([9, 9]),
      tileType: 'wall',
      disableUpdateTileType: false
    }
    this.solverFull = this.solverFull.bind(this);
    this.changeTileType = this.changeTileType.bind(this);
    this.renderParent = this.renderParent.bind(this);
  }

  // methods pass to Controller START
  solverFull() {
    this.setState({ disableUpdateTileType: true }, () => {
      if (typeof this.state.maze.start !== 'number') return alert('Missing Starting Point!');
      if (typeof this.state.maze.end !== 'number') return alert('Missing Ending Point!');
      this.state.maze.solverFull();
      this.setState({ disableUpdateTileType: false });
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
            solverFull={this.solverFull}
            solverStep={this.solverStep}
            changeTileType={this.changeTileType}
            renderParent={this.renderParent}
          />
        </nav>
        <div className='middleline'/>
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