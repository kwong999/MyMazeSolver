import React from 'react';

class TileDisplayOption extends React.Component {
  render() {
    return(
      <div className='tile-display-option maze-action'>
        <div>
          <p>Display Searched Tile: </p>
          <input
            className='checkbox'
            type='checkbox'
            checked={this.props.displaySearchedTile}
            onChange={this.props.changeDisplaySearchedTile}
          />
        </div>
      </div>
    )
  }
}

export default TileDisplayOption;