import React from 'react';

const TYPE = [
  'blank',
  'wall',
  'start',
  'end'
]

class Controller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tileType: this.props.tileType,
      dimensionRow: this.props.maze.dimension[0],
      dimensionCol: this.props.maze.dimension[1],
      state: 'state'
    }
    this.handleChange = this.handleChange.bind(this);
    this.fullReset = this.fullReset.bind(this);
    this.softReset = this.softReset.bind(this);
    this.handleBuildBoard = this.handleBuildBoard.bind(this);
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

  fullReset(e) {
    console.log('fullReset');
    e.preventDefault();
    this.props.maze.fullReset();
    this.props.resetSolverState();
  }

  softReset(e) {
    console.log('softReset');
    e.preventDefault();
    this.props.maze.softReset();
    this.props.resetSolverState();
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
              <button onClick={solverFull}>Solve It!</button>
              <button onClick={this.fullReset}>Full Reset</button>
              <button onClick={this.softReset}>Soft Reset</button>
              <label>
                <p>Label:</p> 
                <div>
                  <div className='solution'></div>
                  <p>: Solution path</p>
                </div>
                <div>
                  <div className='used'></div>
                  <p>: Searched Tile</p>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Controller;