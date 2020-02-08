import React from 'react';
import { shallow } from 'enzyme';
import Board from './board';
import MazeBoard from './maze/board';
jest.mock('./maze/board', () => {
  return class MazeBoard {
    constructor() {
      this.board = [
        [
          { pos: [0, 0], type: "start" },
          { pos: [0, 1], type: "wall" },
          { pos: [0, 2], type: "end" }
        ]
      ];
    }
    changeTileType() {
      return null;
    }
  }
});
jest.mock('./tile', () => 'Tile');
const maze = new MazeBoard();
describe('<Board />', () => {
  const buildWrapper = (mazeSolved) => {
    return (
      shallow(
        <Board
          maze={maze}
          tileType={'wall'}
          disableUpdateTileType={true}
          displaySearchedTile={false}
          mazeSolved={mazeSolved}
        />
      )
  )};

  test('should render without error', () => {
    const wrapper = buildWrapper(false);
    expect(wrapper.find('ul').length).toEqual(1);
    expect(wrapper.find('li').length).toEqual(1);
    expect(wrapper.find('div').length).toEqual(3);
    expect(wrapper.find('Tile').length).toEqual(3);
  });
  
  test('tile click should response without alert', () => {
    const wrapper = buildWrapper(false);
    const instance = wrapper.instance();
    const mHandleTileClick = jest.spyOn(instance, 'handleTileClick');
    const mUpdateTileType = jest.spyOn(instance, 'updateTileType');
    const mChangeTileType = jest.spyOn(maze, 'changeTileType');
    wrapper.find('div').at(0).simulate('click');
    expect(mHandleTileClick).toHaveBeenCalledTimes(3);
    expect(mUpdateTileType).toHaveBeenCalledTimes(1);
    expect(mChangeTileType).toHaveBeenCalledTimes(1);
    expect(mChangeTileType.mock.calls[0][0][0]).toEqual(0);
    expect(mChangeTileType.mock.calls[0][0][1]).toEqual(0);
    expect(mChangeTileType.mock.calls[0][1]).toMatch(/wall/);
  });

  test('tile click should response alert', () => {
    const jsdomAlert = window.alert;
    window.alert = () => { };
    const wrapper = buildWrapper(true);
    const instance = wrapper.instance();
    const mAlert = jest.spyOn(window, 'alert');
    wrapper.find('div').at(0).simulate('click');
    wrapper.find('div').at(1).simulate('click');
    wrapper.find('div').at(2).simulate('click');
    expect(mAlert).toHaveBeenCalledTimes(3);
    window.alert = jsdomAlert;
  });
});