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
      tileType: this.props.tileType
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ tileType: e.target.value });
  }

  optionList() {
    return(
      TYPE.map(option => (
        <option value={option} key={option}>{this.capitalize(option)}</option>
      ))
    )
  }

  capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  render() {
    const { solve, tileType, changeTileType } = this.props;
    const currentTileType = this.capitalize(tileType)
    return(
      <>
        <button onClick={solve}>Solve</button>
        <p>Current Tile Type: {currentTileType}</p>
        <select onChange={this.handleChange} value={this.state.tileType}>
          {this.optionList()}
        </select>
        <button onClick={changeTileType(this.state.tileType)}>Change Tile Type</button>
      </>
    )
  }
}

export default Controller;