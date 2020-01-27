import React from 'react';
import MovementOption from './movement_option';
import TileDisplayOption from './tile_display_option';

const SOLVER = [
  'A* Star',
  'Breadth First Search'
]

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
        <div className='maze-action'>
          <div>
            <p>Solver: </p>
            <select value={this.props.solver} onChange={this.props.changeSolver}>
              {SOLVER.map((solver, idx) => (
                <option value={solver} key={idx}>{solver}</option>
              ))}
            </select>
          </div>
          <button onClick={() => this.props.solverFull(this.props.movement, this.props.solver)}>Solve It!</button>
          <button onClick={this.props.fullReset}>Full Reset</button>
          <button onClick={this.props.softReset}>Soft Reset</button>
        </div>
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