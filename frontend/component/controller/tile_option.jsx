import React from 'react';

const TYPE = [
  'blank',
  'wall',
  'start',
  'end'
]

class TileOption extends React.Component {
  optionList() {
    return (
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
    return (
      <div className='tile-option'>
        <div>
          <p>Current Tile Type: <span>{this.capitalize(this.props.tileType)}</span></p>
          <div className={this.props.tileType}></div>
        </div>
        {this.optionList()}
        <p>Left click to update tile.</p>
      </div>
    )
  }
}

export default TileOption;