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
      this.setState({ [type]: parseInt(e.target.value) });
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
    this.props.renderParent();
  }

  softReset(e) {
    console.log('softReset');
    e.preventDefault();
    this.props.maze.softReset();
    this.props.renderParent();
  }

  optionList() {
    return(
      TYPE.map(option => (
        <button onClick={this.props.changeTileType(option)} key={option}>{this.capitalize(option)}</button>
      ))
    )
  }

  capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  render() {
    console.log(this.constructor.name);
    console.log(this.state);
    const { solve, tileType, changeTileType } = this.props;
    const currentTileType = this.capitalize(tileType)
    return(
      <>
        <form className='build-board'>
          <p>Dimension:</p>
          <label>
            <p>Row</p>
            <input
              type='number'
              value={this.state.dimensionRow}
              onChange={this.handleChange('dimensionRow')}
            />
          </label>
          <label>
            <p>Column </p>
            <input
              type='number'
              value={this.state.dimensionCol}
              onChange={this.handleChange('dimensionCol')}
            />
          </label>
          <button type='submit' onClick={this.handleBuildBoard}>Build Board</button>
        </form>
        <button onClick={solve}>Solve</button>
        <button onClick={this.fullReset}>Full Reset</button>
        <button onClick={this.softReset}>Soft Reset</button>
        <p>Current Tile Type: <span>{currentTileType}</span></p>
        {this.optionList()}
      </>
    )
  }
}

export default Controller;