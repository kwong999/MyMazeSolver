import React from 'react';
import MovementOption from './movement_option';
import TileDisplayOption from './tile_display_option';
import SolverOption from './solver_option';
import TileLabel from './tile_label';

class ControllerRight extends React.Component {
  render() {
    return(
      <div className='controller-right'>
        <MovementOption
          movement={this.props.movement}
          changeMovement={this.props.changeMovement}
        />
        <TileDisplayOption
          displaySearchedTile={this.props.displaySearchedTile}
          changeDisplaySearchedTile={this.props.changeDisplaySearchedTile}
        />
        <SolverOption
          movement={this.props.movement}
          solver={this.props.solver}
          changeSolver={this.props.changeSolver}
          solverFull={this.props.solverFull}
          fullReset={this.props.fullReset}
          softReset={this.props.softReset}
        />
        <TileLabel />
      </div>
    )
  }
}
export default ControllerRight;