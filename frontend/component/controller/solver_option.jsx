import React from 'react';

const SOLVER = [
  'A* Star',
  'Breadth First Search'
]

class SolverOption extends React.Component {
  render() {
    return(
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
    )
  }
}

export default SolverOption;