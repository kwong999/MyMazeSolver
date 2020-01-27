import React from 'react';

class BuildBoard extends React.Component {
  render() {
    return(
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
    )
  }
}

export default BuildBoard;