import React from 'react';
import { shallow } from 'enzyme';
import Main from './main';
import MazeBoard from './maze/board';
jest.mock('./controller', () => 'Controller');
jest.mock('./board', () => 'Board');
jest.mock('./maze/board', () => {
  return class MazeBoard {
    constructor(arr, start = false, end = false) {
      this.start = start;
      this.end = end;
    }
    solverFull() { return null };
  }
});

describe('<Main />', () => {
  const buildMain = () => {
    return(
      shallow(<Main />)
    )
  };
  test('should render without error', () => {
    const wrapper = buildMain();
    expect(wrapper.find('nav').length).toEqual(1);
    expect(wrapper.find('Controller').length).toEqual(1);
    expect(wrapper.find('.maze').length).toEqual(1);
    expect(wrapper.find('Board').length).toEqual(1);
  });

  describe('method', () => {
    describe('solverFull', () => {
      describe('mazeSolved equals false', () => {
        describe('maze.start and maze.end are numbers', () => {
          test('call MazeBoard.solverFull once', () => {
            const wrapper = buildMain();
            const instance = wrapper.instance();
            wrapper.setState({ maze: new MazeBoard(null, 1, 2) });
            expect(wrapper.state().mazeSolved).toBeFalsy();
            instance.solverFull();
            expect(wrapper.state().mazeSolved).toBeTruthy();
          });
        });
        describe('maze.start or maze.end is not number', () => {
          test('response an alert', () => {
            const jsdomAlert = window.alert;
            window.alert = () => { };
            const wrapper = buildMain();
            const instance = wrapper.instance();
            const mAlert = jest.spyOn(window, 'alert');
            wrapper.setState({ mazeSolved: false });
            wrapper.setState({ maze: new MazeBoard(null) });
            instance.solverFull();
            expect(wrapper.state().mazeSolved).toBeFalsy();
            wrapper.setState({ maze: new MazeBoard(null, 1) });
            instance.solverFull();
            expect(wrapper.state().mazeSolved).toBeFalsy();
            wrapper.setState({ maze: new MazeBoard(null, false, 2) });
            instance.solverFull();
            expect(wrapper.state().mazeSolved).toBeFalsy();
            expect(mAlert).toHaveBeenCalledTimes(3);
            window.alert = jsdomAlert;
          });
        });
      });
      describe('mazeSolved equals true', () => {
        const jsdomAlert = window.alert;
        window.alert = () => { };
        const wrapper = buildMain();
        const instance = wrapper.instance();
        const mAlert = jest.spyOn(window, 'alert');
        wrapper.setState({ mazeSolved: true });
        instance.solverFull();
        expect(wrapper.state().mazeSolved).toBeTruthy();
        expect(mAlert).toHaveBeenCalledTimes(1);
        window.alert = jsdomAlert;
      });
    });

    describe('changeTileType', () => {
      const wrapper = buildMain();
      const instance = wrapper.instance();
      test('change tileType value to valid type', () =>{
        expect(wrapper.state().tileType).toMatch(/wall/);
        instance.changeTileType('blank')();
        expect(wrapper.state().tileType).toMatch(/blank/);
        instance.changeTileType('start')();
        expect(wrapper.state().tileType).toMatch(/start/);
        instance.changeTileType('end')();
        expect(wrapper.state().tileType).toMatch(/end/);
        instance.changeTileType('wall')();
        expect(wrapper.state().tileType).toMatch(/wall/);
      });

      test('not change tileType value to invalid type', () => {
        expect(wrapper.state().tileType).toMatch(/wall/);
        instance.changeTileType('test')();
        expect(wrapper.state().tileType).toMatch(/wall/);
      });
    });

    describe('setMainState', () => {
      test('set state value with given key and value', () => {
        const wrapper = buildMain();
        const instance = wrapper.instance();
        expect(wrapper.state().null).toBeUndefined();
        instance.setMainState('null', 1);
        expect(wrapper.state().null).toEqual(1);
        instance.setMainState('null', 'test');
        expect(wrapper.state().null).toMatch(/test/);
      })
    });

    describe('renderParent', () => {
      test('set state value to "state"', () => {
        const wrapper = buildMain();
        const instance = wrapper.instance();
        instance.renderParent();
        expect(wrapper.state().state).toMatch(/state/);
      })
    });
  });
});