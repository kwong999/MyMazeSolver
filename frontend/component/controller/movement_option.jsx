import React from 'react';

class MovementOption extends React.Component {
  render() {
    return(
      <div className='movement-option maze-action'>
        <div>
          <p>Movement: </p>
          <button
            className={`${(this.props.movement === 'All Direction') ? 'all-direction' : ''}`}
            onClick={this.props.changeMovement}>
            {this.props.movement}
          </button>
        </div>
      </div>
    )
  }
}

export default MovementOption;