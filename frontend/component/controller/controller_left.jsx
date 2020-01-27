import React from 'react';
import BuildBoard from './build_board';

class ControllerLeft extends React.Component {
  render() {
    return(
      <div className='controller-left'>
        <BuildBoard
          dimensionRow={this.props.dimensionRow}
          dimensionCol={this.props.dimensionCol}
          handleChange={this.props.handleChange}
          handleBuildBoard={this.props.handleBuildBoard}
        />
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