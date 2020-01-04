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
      mazeSolved: false,
      displaySearchedTile: true
    }
    this.solverFull = this.solverFull.bind(this);
    this.changeTileType = this.changeTileType.bind(this);
    this.renderParent = this.renderParent.bind(this);
    this.setMainState = this.setMainState.bind(this);
  }

  // methods pass to Controller START
  solverFull(movement, solver) {
    if (!this.state.mazeSolved) {
      this.setState({ disableUpdateTileType: true, mazeSolved: true }, () => {
        if (typeof this.state.maze.start !== 'number') return alert('Missing Starting Point!');
        if (typeof this.state.maze.end !== 'number') return alert('Missing Ending Point!');
        this.state.maze.solverFull(movement, solver);
        this.setState({ mazeSolved: true });
      })
    } else {
      alert('Maze already solved!');
    }
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
  
  setMainState(key, value) {
    this.setState({ [key]: value })
    console.log(this.state);
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
            displaySearchedTile={this.state.displaySearchedTile}
            solverFull={this.solverFull}
            solverStep={this.solverStep}
            changeTileType={this.changeTileType}
            setMainState={this.setMainState}
            renderParent={this.renderParent}
          />
        </nav>
        <div className='maze'>
          <Board
            maze={this.state.maze}
            tileType={this.state.tileType}
            disableUpdateTileType={this.state.disableUpdateTileType}
            displaySearchedTile={this.state.displaySearchedTile}
            mazeSolved={this.state.mazeSolved}
          />
        </div>
      </>
    )
  }
}

export default Main;