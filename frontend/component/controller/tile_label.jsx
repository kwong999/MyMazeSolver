import React from 'react';

class TileLabel extends React.Component {
  render() {
    return(
      <div className='maze-action'>
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
    )
  }
}

export default TileLabel;