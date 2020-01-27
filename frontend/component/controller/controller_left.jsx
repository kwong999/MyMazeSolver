import React from 'react';
import BuildBoard from './build_board';
import TileOption from './tile_option';

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
        <TileOption
          currentTileType={this.props.currentTileType}
          tileType={this.props.tileType}
          optionList={this.props.optionList}
        />
      </div>
    )
  }
}

export default ControllerLeft;