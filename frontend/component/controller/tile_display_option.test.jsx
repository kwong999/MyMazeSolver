import React from 'react';
import TileDisplayOption from './tile_display_option';
import renderer from 'react-test-renderer';

test('TileDisplayOption with checkbox to activate "Searched Tiles"', () => {
  const component = renderer.create(
    <TileDisplayOption
      displaySearchedTile={() => { }}
      changeDisplaySearchedTile={() => { }}
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})