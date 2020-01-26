import React from 'react';

const SOLVER = [
  'A* Star',
  'Breadth First Search'
]

class ControllerRight extends React.Component {
  render() {
    return(
      <div className='controller-right'>
        <div className='maze-action'>
          <div>
            <p>Movement: </p>
            <button
              className={`${(this.props.movement === 'All Direction') ? 'all-direction' : ''}`}
              onClick={this.props.changeMovement}>
              {this.props.movement}
            </button>
          </div>
          <div>
            <p>Display Searched Tile: </p>
            <input
              className='checkbox'
              type='checkbox'
              checked={this.props.displaySearchedTile}
              onChange={this.props.changeDisplaySearchedTile}
            />
          </div>
          <div>
            <p>Solver: </p>
            <select value={this.props.solver} onChange={this.props.changeSolver}>
              {SOLVER.map((solver, idx) => (
                <option value={solver} key={idx}>{solver}</option>
              ))}
            </select>
          </div>
          <button onClick={() => solverFull(this.props.movement, this.props.solver)}>Solve It!</button>
          <button onClick={this.props.fullReset}>Full Reset</button>
          <button onClick={this.props.softReset}>Soft Reset</button>
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