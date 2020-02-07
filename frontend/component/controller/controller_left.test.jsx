import React from 'react';
import renderer from 'react-test-renderer';
import ControllerLeft from './controller_left';
jest.mock('./build_board', () => 'BuildBoard');
jest.mock('./tile_option', () => 'TileOption');


describe('controller_left', () => {
  const component = renderer.create(
    <ControllerLeft
      dimensionRow={'dimensionRow'}
      dimensionCol={'dimensionCol'}
      handleChange={'handleChange'}
      handleBuildBoard={'handleBuildBoard'}
      changeTileType={'changeTileType'}
      tileType={'tileType'}
    />
  )
  test('test should render without error', () => {
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })

  test('child component BuildBoard has props', () => {
    let componentInstance = component.root;
    let buildBoardProps = componentInstance.findByType('BuildBoard').props;
    expect(buildBoardProps.dimensionRow).toMatch('dimensionRow');
    expect(buildBoardProps.dimensionCol).toMatch('dimensionCol');
    expect(buildBoardProps.handleChange).toMatch('handleChange');
    expect(buildBoardProps.handleBuildBoard).toMatch('handleBuildBoard');
  })

  test('child component TileOption has props', () => {
    let componentInstance = component.root;
    let tileOptionProps = componentInstance.findByType('TileOption').props;
    expect(tileOptionProps.tileType).toMatch('tileType');
    expect(tileOptionProps.changeTileType).toMatch('changeTileType');
  })
})