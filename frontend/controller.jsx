import React from 'react';

const TYPE = [
  'blank',
  'wall',
  'start',
  'end'
]

const SOLVER = [
  'A* Star',
  'Breadth First Search'
]

class Controller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dimensionRow: this.props.maze.dimension[0],
      dimensionCol: this.props.maze.dimension[1],
      movement: 'All Direction',
      solver: 'Breadth First Search',
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
    console.log('fullReset');
    e.preventDefault();
    this.props.maze.fullReset();
    this.props.setMainState('mazeSolved', false);
  }

  softReset(e) {
    console.log('softReset');
    e.preventDefault();
    this.props.maze.softReset();
    this.props.setMainState('mazeSolved', false);
  }

  optionList() {
    return(
      TYPE.map(option => (
        <button onClick={this.props.changeTileType(option)} key={option}>
          <div>
            <p>{this.capitalize(option)}</p>
            <div className={option}></div>
          </div>
        </button>
      ))
    )
  }

  capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  render() {
    console.log(this.constructor.name);
    console.log(this.state);
    const { solverFull, tileType, changeTileType } = this.props;
    const currentTileType = this.capitalize(tileType)
    return(
      <div className='controller'>
        <h2>Controller Panel</h2>
        <div className='controller-sub'>
          <div className='controller-left'>
            <form className='build-board'>
              <p>Dimension</p>
              <dl>
                <dt>Row:</dt>
                <dd><input
                  type='number'
                  value={this.state.dimensionRow}
                  min='1'
                  max='20'
                  onChange={this.handleChange('dimensionRow')}
                /></dd>
                <dt>Column:</dt>
                <dd><input
                  type='number'
                  value={this.state.dimensionCol}
                  min='1'
                  max='20'
                  onChange={this.handleChange('dimensionCol')}
                /></dd>
              </dl>
              <button type='submit' onClick={this.handleBuildBoard}>Build Board</button>
            </form>
            <div className='tile-option'>
              <div>
                <p>Current Tile Type: <span>{currentTileType}</span></p>
                <div className={tileType}></div>
              </div>
              {this.optionList()}
              <p>Left click to update tile.</p>
            </div>
          </div>
          <div className='controller-right'>
            <div className='maze-action'>
              <div>
                <p>Movement: </p>
                <button 
                  className={`${(this.state.movement === 'All Direction') ? 'all-direction' : ''}`}
                  onClick={this.changeMovement}>
                  {this.state.movement}
                </button>
              </div>
              <div>
                <p>Display Searched Tile: </p>
                <input
                  className='checkbox'
                  type='checkbox'
                  checked={this.props.displaySearchedTile}
                  onChange={this.changeDisplaySearchedTile}
                />
              </div>
              <div>
                <p>Solver: </p>
                <select value={this.state.solver} onChange={this.changeSolver}>
                  {SOLVER.map( (solver, idx) => (
                    <option value={solver} key={idx}>{solver}</option>
                  ))}
                </select>
              </div>
              <button onClick={() => solverFull(this.state.movement, this.state.solver)}>Solve It!</button>
              <button onClick={this.fullReset}>Full Reset</button>
              <button onClick={this.softReset}>Soft Reset</button>
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
        </div>
      </div>
    )
  }
}

export default Controller;