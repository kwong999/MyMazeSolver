import React from 'react';
import ControllerLeft from './component/controller/controller_left';
import ControllerRight from './component/controller/controller_right';

class Controller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dimensionRow: this.props.maze.dimension[0],
      dimensionCol: this.props.maze.dimension[1],
      movement: 'All Direction',
      solver: 'A* Star',
      state: 'state'
    }
    this.handleChange = this.handleChange.bind(this);
    this.fullReset = this.fullReset.bind(this);
    this.softReset = this.softReset.bind(this);
    this.handleBuildBoard = this.handleBuildBoard.bind(this);
    this.changeMovement = this.changeMovement.bind(this);
    this.changeDisplaySearchedTile = this.changeDisplaySearchedTile.bind(this);
    this.changeSolver = this.changeSolver.bind(this);
  }

  handleChange(type) {
    return e => {
      e.preventDefault();
      let val = e.target.value;
      if (val > 20) {
        val = 20;
      } else if(val < 1) {
        val = 1
      }
      this.setState({ [type]: parseInt(val) });
    }
  }

  handleBuildBoard(e) {
    e.preventDefault();
    this.props.maze.buildBoard([this.state.dimensionRow, this.state.dimensionCol]);
    this.props.renderParent();
  }

  changeMovement(e) {
    e.preventDefault();
    const newMovement = (this.state.movement === 'All Direction') ? 'No Diagonal' : 'All Direction';
    this.setState({ movement: newMovement });
  }

  changeDisplaySearchedTile(e) {
    this.props.setMainState('displaySearchedTile', e.target.checked);
  }

  changeSolver(e) {
    this.setState({ solver: e.target.value })
  }

  fullReset(e) {
    e.preventDefault();
    this.props.maze.fullReset();
    this.props.setMainState('mazeSolved', false);
  }

  softReset(e) {
    e.preventDefault();
    this.props.maze.softReset();
    this.props.setMainState('mazeSolved', false);
  }

  render() {
    const { tileType } = this.props;
    return(
      <div className='controller'>
        <h2>Controller Panel</h2>
        <div className='controller-sub'>
          <ControllerLeft
            dimensionRow={this.state.dimensionRow}
            dimensionCol={this.state.dimensionCol}
            handleChange={this.handleChange}
            handleBuildBoard={this.handleBuildBoard}
            changeTileType={this.props.changeTileType}
            tileType={tileType}
          />
          <ControllerRight
            movement={this.state.movement}
            changeMovement={this.changeMovement}
            displaySearchedTile={this.props.displaySearchedTile}
            changeDisplaySearchedTile={this.changeDisplaySearchedTile}
            solver={this.state.solver}
            changeSolver={this.changeSolver}
            solverFull={this.props.solverFull}
            fullReset={this.fullReset}
            softReset={this.softReset}
          />
        </div>
      </div>
    )
  }
}

export default Controller;