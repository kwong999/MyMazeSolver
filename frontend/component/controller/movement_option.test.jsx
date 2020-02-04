import React from 'react';
import MovementOption from './movement_option';
import renderer from 'react-test-renderer';

const createComponent = str => {
  return renderer.create(
    <MovementOption
      movement={str}
      changeMovement={() => { }}
    />
  );
}

describe('MovementOption', () => {
  test('have class name "all-direction"', () => {
    const component = createComponent("All Direction");
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })

  test('not have class name "all-direction"', () => {
    const component = createComponent("No Diagonal");
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
});