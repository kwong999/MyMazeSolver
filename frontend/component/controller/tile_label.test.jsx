import React from 'react';
import renderer from 'react-test-renderer';
import TileLabel from './tile_label';

test('TileLabel should render without error', () => {
  const component = renderer.create(
    <TileLabel />
  )
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})