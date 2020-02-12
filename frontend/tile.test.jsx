import React from 'react';
import renderer from 'react-test-renderer';
import Tile from './tile';

describe('<Tile />', () => {
  const component = renderer.create(
    <Tile />
  )
  test('should render without error', () => {
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})