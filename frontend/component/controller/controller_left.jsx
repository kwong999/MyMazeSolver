import React from 'react';

class ControllerLeft extends React.Component {
  render() {
    return(
      <div className='controller-left'>
        <form className='build-board'>
          <p>Dimension</p>
          <dl>
            <dt>Row:</dt>
            <dd><input
              type='number'
              value={this.props.dimensionRow}
              min='1'
              max='20'
              onChange={this.props.handleChange('dimensionRow')}
            /></dd>
            <dt>Column:</dt>
            <dd><input
              type='number'
              value={this.props.dimensionCol}
              min='1'
              max='20'
              onChange={this.props.handleChange('dimensionCol')}
            /></dd>
          </dl>
          <button type='submit' onClick={this.props.handleBuildBoard}>Build Board</button>
        </form>
        <div className='tile-option'>
          <div>
            <p>Current Tile Type: <span>{this.props.currentTileType}</span></p>
            <div className={this.props.tileType}></div>
          </div>
          {this.props.optionList()}
          <p>Left click to update tile.</p>
        </div>
      </div>
    )
  }
}

export default ControllerLeft;