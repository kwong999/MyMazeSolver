import React from 'react';
import { shallow } from 'enzyme';
import Controller from './controller';
import MazeBoard from './maze/board';
jest.mock('./maze/board', () => {
  return class MazeBoard {
    constructor() {
      this.dimension = [3, 4];
    }
    buildBoard() { return null };
    fullReset() { return null };
    softReset() { return null };
  }
});
jest.mock('./component/controller/controller_left', () => 'ControllerLeft');
jest.mock('./component/controller/controller_right', () => 'ControllerRight');
const maze = new MazeBoard();
const mRenderParent = jest.fn();
const mSetMainState = jest.fn();

describe('<Controller />', () => {
  const buildController = () => {
    return (
      shallow(
        <Controller
          maze={maze}
          tileType={''}
          displaySearchedTile={jest.fn()}
          solverFull={jest.fn()}
          solverStep={jest.fn()}
          changeTileType={jest.fn()}
          setMainState={jest.fn(() => mSetMainState())}
          renderParent={jest.fn(() => mRenderParent())}
        />
      )
    )
  }

  test('should render without error', () => {
    const wrapper = buildController();
    expect(wrapper.find('.controller').length).toEqual(1);
    expect(wrapper.find('h2').length).toEqual(1);
    expect(wrapper.find('.controller-sub').length).toEqual(1);
    expect(wrapper.find('ControllerLeft').length).toEqual(1);
    expect(wrapper.find('ControllerRight').length).toEqual(1);
  });

  describe('method', () => {
    describe('handleChange', () => {
      const wrapper = buildController();
      const instance = wrapper.instance();
      test('can change dimensionRow', () => {
        expect(wrapper.state().dimensionRow).toEqual(3);
        instance.handleChange('dimensionRow')({ preventDefault: jest.fn(), target: { value: -1 } });
        expect(wrapper.state().dimensionRow).toEqual(1);
        instance.handleChange('dimensionRow')({ preventDefault: jest.fn() ,target: { value: 5 } });
        expect(wrapper.state().dimensionRow).toEqual(5);
        instance.handleChange('dimensionRow')({ preventDefault: jest.fn(), target: { value: 25 } });
        expect(wrapper.state().dimensionRow).toEqual(20);
      });

      test('can change dimensionCol', () => {
        expect(wrapper.state().dimensionCol).toEqual(4);
        instance.handleChange('dimensionCol')({ preventDefault: jest.fn(), target: { value: -1 } });
        expect(wrapper.state().dimensionCol).toEqual(1);
        instance.handleChange('dimensionCol')({ preventDefault: jest.fn(), target: { value: 5 } });
        expect(wrapper.state().dimensionCol).toEqual(5);
        instance.handleChange('dimensionCol')({ preventDefault: jest.fn(), target: { value: 25 } });
        expect(wrapper.state().dimensionCol).toEqual(20);
      });
    });

    describe('handleBuildBoard', () => {
      const wrapper = buildController();
      const instance = wrapper.instance();
      const mBuildBoard = jest.spyOn(maze, 'buildBoard');
      instance.handleBuildBoard({ preventDefault: jest.fn() });
      test('call buildBoard once', () => {
        expect(mBuildBoard).toHaveBeenCalledTimes(1);
      });

      test('call renderParent once', () => {
        expect(mRenderParent).toHaveBeenCalledTimes(1);
      });
    });

    describe('changeMovement', () => {
      const wrapper = buildController();
      const instance = wrapper.instance();
      test('can change movement', () => {
        expect(wrapper.state().movement).toMatch(/All Direction/);
        instance.changeMovement({ preventDefault: jest.fn() });
        expect(wrapper.state().movement).toMatch(/No Diagonal/);
      });
    });

    describe('changeDisplaySearchedTile', () => {
      const wrapper = buildController();
      const instance = wrapper.instance();
      test('call setMainState once', () => {
        instance.changeDisplaySearchedTile({ target: { checked : -1 } });
        expect(mSetMainState).toHaveBeenCalled();
      });
    });

    describe('changeSolver', () => {
      const wrapper = buildController();
      const instance = wrapper.instance();
      test('can change solver', () => {
        expect(wrapper.state().solver).toMatch(/A* Star/);
        instance.changeSolver({ target: { value: 'test' } });
        expect(wrapper.state().solver).toMatch(/test/);
      });
    });

    describe('fullReset', () => {
      const wrapper = buildController();
      const instance = wrapper.instance();
      const mFullReset = jest.spyOn(maze, 'fullReset');
      instance.fullReset({ preventDefault: jest.fn() });
      test('call fullReset once', () => {
        expect(mFullReset).toHaveBeenCalledTimes(1);
      });

      test('call setMainState once', () => {
        expect(mSetMainState).toHaveBeenCalled();
      });
    });

    describe('softReset', () => {
      const wrapper = buildController();
      const instance = wrapper.instance();
      const mSoftReset = jest.spyOn(maze, 'softReset');
      instance.softReset({ preventDefault: jest.fn() });
      test('call softReset once', () => {
        expect(mSoftReset).toHaveBeenCalledTimes(1);
      });

      test('call setMainState once', () => {
        expect(mSetMainState).toHaveBeenCalled();
      });
    });
  });
});