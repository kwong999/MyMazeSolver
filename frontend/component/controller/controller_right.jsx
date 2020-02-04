import React from 'react';
import MovementOption from './movement_option';
import TileDisplayOption from './tile_display_option';
import SolverOption from './solver_option';

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
        <div className='maze-action'>
          <label>
            <p>Label:</p>
            <dl>
              <dt className='solution'></dt>
              <dd>: Solution path</dd>
              <dt className='used'></dt>
              <dd>: Searched Tile</dd>
            </dl>
          </label>
        </div>
      </div>
    )
  }
}
export default ControllerRight;