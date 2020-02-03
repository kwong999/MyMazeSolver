import React from 'react';
import TileOption from './tile_option';
import renderer from 'react-test-renderer';

test('TileOption with option "TEST"', () => {
  const component = renderer.create(
    <TileOption
      currentTileType={"TEST"}
      tileType={"TEST"}
      changeTileType={() => { }}
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})