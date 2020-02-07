import React from 'react'
import renderer from 'react-test-renderer';
import ControllerRight from './controller_right';
jest.mock('./movement_option', () => 'MovementOption');
jest.mock('./tile_display_option', () => 'TileDisplayOption');
jest.mock('./solver_option', () => 'SolverOption');
jest.mock('./tile_label', () => 'TileLabel');

describe('ControllerRight', () => {
  const component = renderer.create(
    <ControllerRight
      movement={'movement'}
      changeMovement={'changeMovement'}
      displaySearchedTile={'displaySearchedTile'}
      changeDisplaySearchedTile={'changeDisplaySearchedTile'}
      solver={'solver'}
      changeSolver={'changeSolver'}
      solverFull={'solverFull'}
      fullReset={'fullReset'}
      softReset={'softReset'}
    />
  );

  test('test should render without error', () => {
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('child component MovementOption has props', () => {
    let componentInstance = component.root;
    let movementOptionProps = componentInstance.findByType('MovementOption').props;
    expect(movementOptionProps.movement).toMatch('movement');
    expect(movementOptionProps.changeMovement).toMatch('changeMovement');
  });

  test('child component TileDisplayOption has props', () => {
    let componentInstance = component.root;
    let tileDisplayOptionProps = componentInstance.findByType('TileDisplayOption').props;
    expect(tileDisplayOptionProps.displaySearchedTile).toMatch('displaySearchedTile');
    expect(tileDisplayOptionProps.changeDisplaySearchedTile).toMatch('changeDisplaySearchedTile');
  });

  test('child component SolverOption has props', () => {
    let componentInstance = component.root;
    let solverOptionProps = componentInstance.findByType('SolverOption').props;
    expect(solverOptionProps.movement).toMatch('movement');
    expect(solverOptionProps.solver).toMatch('solver');
    expect(solverOptionProps.changeSolver).toMatch('changeSolver');
    expect(solverOptionProps.solverFull).toMatch('solverFull');
    expect(solverOptionProps.fullReset).toMatch('fullReset');
    expect(solverOptionProps.softReset).toMatch('softReset');
  });

  test('child component TileLabel has not props', () => {
    let componentInstance = component.root;
    let tileLabelProps = componentInstance.findByType('TileLabel').props;
    expect(tileLabelProps.length).toBeUndefined();
  });
});



